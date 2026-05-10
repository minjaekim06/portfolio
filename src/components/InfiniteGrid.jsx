import { useState, useEffect, useMemo, useCallback, useRef, memo } from 'react'
import { useImagePreloader } from '@/hooks/useImagePreloader'

// Pull all photos from src/assets so Vite hashes them and serves under base path
const images = import.meta.glob('/src/photos/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' })
const IMAGE_URLS = Object.values(images)

const LERP_FACTOR = 0.12
const SCALE_LERP = 0.15
const HOVER_SCALE_AMOUNT = 0.12
const DRAG_DAMPEN = 0.5
const MAX_DRAG_DELTA = 20
const TIER1_COUNT = 40

function getGridMetrics(containerSize) {
  const shortSide = Math.min(containerSize.width, containerSize.height)
  const cellSize = Math.round(Math.min(320, Math.max(140, shortSide * 0.22)))
  const gap = Math.max(12, Math.round(cellSize * 0.09))
  const totalCell = cellSize + gap
  const hoverRadius = cellSize * 1.25
  return { cellSize, gap, totalCell, hoverRadius }
}

const mod = (n, m) => ((n % m) + m) % m

const shuffleArray = (array) => {
  const s = [...array]
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]]
  }
  return s
}

const InfiniteGrid = ({ theme = 'dark' }) => {
  const [containerSize, setContainerSize] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 1280, height: typeof window !== 'undefined' ? window.innerHeight : 800 })
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef(null)
  const itemRefs = useRef({})
  const rafId = useRef(null)

  const panTarget = useRef({ x: 0, y: 0 })
  const panCurrent = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const lastPanDelta = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const mousePos = useRef({ x: -9999, y: -9999 })
  const itemScales = useRef({})

  const shuffledImages = useMemo(() => shuffleArray(IMAGE_URLS), [])
  useImagePreloader(shuffledImages, TIER1_COUNT)

  useEffect(() => {
    const onResize = () => setContainerSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const metrics = useMemo(() => getGridMetrics(containerSize), [containerSize])

  const gridConfig = useMemo(() => {
    const { totalCell } = metrics
    const cols = Math.ceil(containerSize.width / totalCell) + 4
    const rows = Math.ceil(containerSize.height / totalCell) + 4
    const items = []
    const grid = Array.from({ length: rows }, () => new Array(cols).fill(null))
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const forbidden = new Set()
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            if (dr === 0 && dc === 0) continue
            const nr = (r + dr + rows) % rows, nc = (c + dc + cols) % cols
            if (grid[nr][nc] !== null) forbidden.add(grid[nr][nc])
          }
        }
        const candidates = shuffledImages.filter(img => !forbidden.has(img))
        const pool = candidates.length > 0 ? candidates : shuffledImages
        grid[r][c] = pool[Math.floor(Math.random() * pool.length)] || ''
      }
    }
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      items.push({ id: `${r}-${c}`, relX: c - 1, relY: r - 1, imgUrl: grid[r][c] })
    }
    return { items, cols, rows, ...metrics }
  }, [containerSize, shuffledImages, metrics])

  useEffect(() => {
    const { items, cols, rows, totalCell, cellSize, hoverRadius } = gridConfig
    const gridWidth = cols * totalCell, gridHeight = rows * totalCell
    const hoverRadiusSq = hoverRadius * hoverRadius
    const tick = () => {
      if (!isDraggingRef.current) {
        panTarget.current.x += velocity.current.x; panTarget.current.y += velocity.current.y
        velocity.current.x *= 0.95; velocity.current.y *= 0.95
        if (Math.abs(velocity.current.x) < 0.1) velocity.current.x = 0
        if (Math.abs(velocity.current.y) < 0.1) velocity.current.y = 0
      }
      panCurrent.current.x += (panTarget.current.x - panCurrent.current.x) * LERP_FACTOR
      panCurrent.current.y += (panTarget.current.y - panCurrent.current.y) * LERP_FACTOR
      const cx = panCurrent.current.x, cy = panCurrent.current.y
      const mx = mousePos.current.x, my = mousePos.current.y
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const el = itemRefs.current[item.id]
        if (!el) continue
        const px = mod((item.relX * totalCell) + cx + totalCell, gridWidth) - totalCell
        const py = mod((item.relY * totalCell) + cy + totalCell, gridHeight) - totalCell
        let targetScale = 1
        const centerX = px + cellSize / 2, centerY = py + cellSize / 2
        const distSq = (mx - centerX) ** 2 + (my - centerY) ** 2
        if (distSq < hoverRadiusSq) {
          const dist = Math.sqrt(distSq)
          targetScale = 1 + (1 - dist / hoverRadius) * HOVER_SCALE_AMOUNT
        }
        const prev = itemScales.current[item.id] ?? 1
        const ns = prev + (targetScale - prev) * SCALE_LERP
        itemScales.current[item.id] = ns
        el.style.transform = `translate3d(${px}px, ${py}px, 0) scale(${ns})`
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current) }
  }, [gridConfig])

  const pointerStart = useRef({ x: 0, y: 0 })
  const handlePointerDown = useCallback((e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const y = e.touches ? e.touches[0].clientY : e.clientY
    pointerStart.current = { x, y }
    isDraggingRef.current = true
    velocity.current = { x: 0, y: 0 }
    setIsDragging(true)
  }, [])
  const handlePointerMove = useCallback((e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const y = e.touches ? e.touches[0].clientY : e.clientY
    mousePos.current = { x, y }
    if (!isDraggingRef.current) return
    const rdx = x - pointerStart.current.x, rdy = y - pointerStart.current.y
    pointerStart.current = { x, y }
    const cd = (d) => { const dd = d * DRAG_DAMPEN; return Math.sign(dd) * Math.min(Math.abs(dd), MAX_DRAG_DELTA) }
    const dx = cd(rdx), dy = cd(rdy)
    panTarget.current.x += dx; panTarget.current.y += dy
    lastPanDelta.current = { x: dx, y: dy }
  }, [])
  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false; setIsDragging(false)
    velocity.current = { x: lastPanDelta.current.x * 0.5, y: lastPanDelta.current.y * 0.5 }
    lastPanDelta.current = { x: 0, y: 0 }
  }, [])
  const setItemRef = useCallback((id, el) => { if (el) itemRefs.current[id] = el }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      className={`fixed inset-0 overflow-hidden select-none transition-colors duration-500 ${theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white'}`}
      style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
    >
      {gridConfig.items.map((item) => (
        <GridItem key={item.id} item={item} cellSize={gridConfig.cellSize} setItemRef={setItemRef} />
      ))}
    </div>
  )
}

const GridItem = memo(({ item, cellSize, setItemRef }) => {
  const [loaded, setLoaded] = useState(false)
  const refCb = useCallback((el) => setItemRef(item.id, el), [item.id, setItemRef])
  return (
    <div
      ref={refCb}
      style={{ position: 'absolute', width: cellSize, height: cellSize, willChange: 'transform', transform: 'translate3d(0,0,0) scale(1)' }}
      className="pointer-events-none"
    >
      <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative bg-neutral-800">
        <img
          src={item.imgUrl}
          alt=""
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          fetchpriority="high"
          decoding="async"
          draggable={false}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  )
}, (a, b) => a.item.id === b.item.id && a.cellSize === b.cellSize)

export default InfiniteGrid
