import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Reveal from '@/components/Reveal'
import { AnimatedText } from '@/components/AnimatedText'

// ---- procedural microscope (teal + steel) -----------------------------
function buildMicroscope() {
  const g = new THREE.Group()
  const steel  = new THREE.MeshStandardMaterial({ color: 0xb6bcc4, metalness: 0.85, roughness: 0.32 })
  const dark   = new THREE.MeshStandardMaterial({ color: 0x111418, metalness: 0.6,  roughness: 0.5 })
  const teal = new THREE.MeshStandardMaterial({ color: 0x0047AB, metalness: 0.5,  roughness: 0.35, emissive: 0x0a1840, emissiveIntensity: 0.25 })
  const glass  = new THREE.MeshStandardMaterial({ color: 0x1F4FFF, metalness: 0.9,  roughness: 0.05, transparent: true, opacity: 0.55 })

  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.7, 0.28, 56), dark);  base.position.y = 0.14; g.add(base)
  const baseLip = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.04, 12, 56), steel); baseLip.position.y = 0.27; baseLip.rotation.x = Math.PI/2; g.add(baseLip)

  const stage = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.08, 1.05), steel); stage.position.y = 0.95; g.add(stage)
  const slide = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.02, 0.32), glass); slide.position.set(0.05, 1.0, 0); g.add(slide)
  const stageClip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.10, 0.28), teal); stageClip.position.set(0.45, 1.04, 0); g.add(stageClip)

  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 2.6, 32), steel); col.position.set(-0.78, 1.5, 0); g.add(col)
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.24, 0.42), steel); arm.position.set(0.05, 2.65, 0); g.add(arm)
  const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.10, 16), teal); nut.position.set(-0.78, 2.78, 0); g.add(nut)
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 1.05, 28), steel); tube.position.set(0.6, 2.10, 0); g.add(tube)
  const ocu = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.20, 0.36, 24), dark); ocu.position.set(0.6, 2.85, 0); ocu.rotation.x = -0.32; g.add(ocu)
  const ocuRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 8, 24), teal); ocuRing.position.set(0.6, 3.02, 0); ocuRing.rotation.x = Math.PI/2 - 0.32; g.add(ocuRing)
  const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.30, 0.20, 28), teal); turret.position.set(0.6, 1.42, 0); g.add(turret)
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    const obj = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.22, 18), dark)
    obj.position.set(0.6 + Math.cos(a) * 0.20, 1.24, Math.sin(a) * 0.20); g.add(obj)
  }
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.14, 28), teal)
  knob.rotation.z = Math.PI / 2; knob.position.set(-0.96, 1.10, 0); g.add(knob)
  const cond = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.10, 0.34, 24), glass); cond.position.set(0.05, 0.74, 0); g.add(cond)

  return g
}

function buildNMES() {
  const g = new THREE.Group()
  const fabric = new THREE.MeshStandardMaterial({ color: 0x0a1430, metalness: 0.05, roughness: 0.9 })
  const trace  = new THREE.MeshStandardMaterial({ color: 0x1F4FFF, emissive: 0x0a1840, emissiveIntensity: 0.4, metalness: 0.6, roughness: 0.3 })
  const dark   = new THREE.MeshStandardMaterial({ color: 0x111418, metalness: 0.4, roughness: 0.7 })

  const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 1.5, 36, 1, true), fabric); sleeve.rotation.z = Math.PI/2; g.add(sleeve)
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24), trace)
    pad.position.set(0, Math.cos(a) * 1.0, Math.sin(a) * 1.0)
    pad.lookAt(0, Math.cos(a) * 2, Math.sin(a) * 2); g.add(pad)
  }
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.55, 0.32), dark); box.position.set(0.95, 0, 0); g.add(box)
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), new THREE.MeshStandardMaterial({ color: 0x1F4FFF, emissive: 0x1F4FFF, emissiveIntensity: 1.6 }))
  led.position.set(0.95, 0.20, 0.18); g.add(led)
  return g
}

const FEATURE_TREE = [
  { name: 'Assembly1', kind: 'asm', open: true, children: [
    { name: 'Annotations', kind: 'folder' },
    { name: 'Front Plane', kind: 'plane' },
    { name: 'Top Plane', kind: 'plane' },
    { name: 'Right Plane', kind: 'plane' },
    { name: 'Origin', kind: 'origin' },
    { name: 'Microscope<1>', kind: 'part', open: true, children: [
      { name: 'Base', kind: 'feat' }, { name: 'Stage', kind: 'feat' },
      { name: 'Optical Tube', kind: 'feat' }, { name: 'Objective Turret', kind: 'feat' },
      { name: 'Focus Knob', kind: 'feat' }, { name: 'Dark-Field Condenser', kind: 'feat' },
    ]},
    { name: 'NMES_Sleeve<1>', kind: 'part', open: true, children: [
      { name: 'Fabric Loft', kind: 'feat' }, { name: 'Electrode Pads', kind: 'feat' }, { name: 'Driver Enclosure', kind: 'feat' },
    ]},
    { name: 'Mates', kind: 'folder', open: true, children: [
      { name: 'Concentric1 (Microscope, Origin)', kind: 'mate' },
      { name: 'Coincident1 (Stage, Top Plane)', kind: 'mate' },
    ]},
  ]}
]

function TreeIcon({ kind }) {
  const cls = "w-3.5 h-3.5 shrink-0"
  if (kind === 'asm')   return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="#1F4FFF" strokeWidth="1.6"><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg>
  if (kind === 'part')  return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="1.5"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5z"/></svg>
  if (kind === 'plane') return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="#1F4FFF" strokeWidth="1.4"><path d="M3 8l9-4 9 4-9 4-9-4z"/></svg>
  if (kind === 'origin')return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="1.4"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>
  if (kind === 'mate')  return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="#1F4FFF" strokeWidth="1.4"><path d="M9 8a4 4 0 0 1 0 8"/><path d="M15 8a4 4 0 0 0 0 8"/></svg>
  if (kind === 'feat')  return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="1.4"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M9 4v16"/></svg>
  return <svg className={cls} viewBox="0 0 24 24" fill="#0a1430" stroke="#1F4FFF" strokeWidth="1.2"><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
}

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(!!node.open)
  const has = node.children && node.children.length
  return (
    <div>
      <div
        className="flex items-center gap-1.5 px-2 py-[3px] hover:bg-teal/15 rounded-sm cursor-pointer text-[12.5px] leading-tight"
        onClick={() => has && setOpen(!open)}
        style={{ paddingLeft: 6 + depth * 12 }}
      >
        {has ? (
          <svg className={`w-3 h-3 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
        ) : <span className="w-3" />}
        <TreeIcon kind={node.kind} />
        <span className="text-neutral-200 truncate">{node.name}</span>
      </div>
      {open && has && <div>{node.children.map((c, i) => <TreeNode key={c.name + i} node={c} depth={depth + 1}/>)}</div>}
    </div>
  )
}

const TOP_MENUS = ['File', 'Edit', 'View', 'Insert', 'Tools', 'Window', 'Help']
const TOOLBAR = [
  { t: 'New', p: 'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z M14 3v6h6' },
  { t: 'Open', p: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { t: 'Save', p: 'M5 4h11l4 4v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z M7 4v5h9V4 M7 14h10v6H7z' },
  null,
  { t: 'Sketch', p: 'M3 17l4-4 4 4 4-7 6 8' },
  { t: 'Extrude', p: 'M3 8l9-4 9 4-9 4-9-4z M3 16l9 4 9-4 M3 12l9 4 9-4' },
  { t: 'Revolve', p: 'M12 3a9 9 0 1 1 0 18 M12 3v18' },
  { t: 'Fillet', p: 'M4 20V8a4 4 0 0 1 4-4h12' },
  null,
  { t: 'Mate', p: 'M9 8a4 4 0 0 1 0 8 M15 8a4 4 0 0 0 0 8' },
  { t: 'Pattern', p: 'M5 5h4v4H5z M15 5h4v4h-4z M5 15h4v4H5z M15 15h4v4h-4z' },
  null,
  { t: 'Render', p: 'M12 3a9 9 0 1 0 9 9 M12 12l5-5' },
  { t: 'Section', p: 'M3 12h18 M9 3v18 M15 3v18' },
]
const VIEW_TABS = ['Sketch', 'Features', 'Surfaces', 'Sheet Metal', 'Assembly', 'Evaluate', 'DimXpert', 'Render Tools', 'SOLIDWORKS Add-Ins']

export default function Experience() {
  const mountRef = useRef(null)
  const [view, setView] = useState('Isometric')
  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const w = mount.clientWidth, h = mount.clientHeight
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    scene.fog = new THREE.Fog(0x000000, 14, 36)

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    const target = new THREE.Vector3(0, 1, 0)
    let radius = 10, theta = Math.PI / 4, phi = Math.PI / 3
    const sync = () => {
      const sp = Math.max(0.18, Math.min(Math.PI - 0.18, phi))
      camera.position.x = target.x + radius * Math.sin(sp) * Math.sin(theta)
      camera.position.z = target.z + radius * Math.sin(sp) * Math.cos(theta)
      camera.position.y = target.y + radius * Math.cos(sp)
      camera.lookAt(target)
    }
    sync()

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight(0x6f8fff, 0x000000, 0.45))
    const key = new THREE.DirectionalLight(0xffffff, 1.6)
    key.position.set(5, 9, 6); key.castShadow = true
    key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -0.0005
    key.shadow.camera.left = -12; key.shadow.camera.right = 12
    key.shadow.camera.top = 12; key.shadow.camera.bottom = -12
    scene.add(key)
    const fill = new THREE.DirectionalLight(0x0047AB, 0.55); fill.position.set(-6, 3, -4); scene.add(fill)
    const rim  = new THREE.DirectionalLight(0x1F4FFF, 0.40); rim.position.set(0, 4, -8); scene.add(rim)

    const grid = new THREE.GridHelper(60, 60, 0x0a1430, 0x05081a)
    grid.material.opacity = 0.7; grid.material.transparent = true; scene.add(grid)
    const subgrid = new THREE.GridHelper(60, 240, 0x05081a, 0x05081a)
    subgrid.position.y = -0.001; subgrid.material.opacity = 0.4; subgrid.material.transparent = true; scene.add(subgrid)

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: 0x000000, metalness: 0.2, roughness: 0.95 }))
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor)

    // origin triad (red/green/blue is universal CAD; lets keep it readable)
    const triad = new THREE.Group()
    const ax = (color, axis) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.4, 8), new THREE.MeshBasicMaterial({ color }))
      if (axis === 'x') { m.rotation.z = -Math.PI / 2; m.position.x = 0.7 }
      if (axis === 'y') { m.position.y = 0.7 }
      if (axis === 'z') { m.rotation.x = Math.PI / 2; m.position.z = 0.7 }
      return m
    }
    triad.add(ax(0xff5f5f, 'x')); triad.add(ax(0x5fff5f, 'y')); triad.add(ax(0x1F4FFF, 'z'))
    triad.position.set(-7, 0.01, -7); scene.add(triad)

    const microscope = buildMicroscope(); microscope.position.set(-1.5, 0, 0); scene.add(microscope)
    const nmes = buildNMES();              nmes.position.set(2.6, 1.2, 0.6); scene.add(nmes)
    ;[microscope, nmes].forEach(grp => grp.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } }))

    let isDown = false, mid = false, sx = 0, sy = 0
    const dom = renderer.domElement
    const onDown = (e) => { e.preventDefault(); isDown = true; mid = e.button === 1 || e.button === 2; sx = e.clientX; sy = e.clientY }
    const onUp = () => { isDown = false; mid = false }
    const onMove = (e) => {
      if (!isDown) return
      const dx = e.clientX - sx, dy = e.clientY - sy
      sx = e.clientX; sy = e.clientY
      if (mid) { target.x -= dx * 0.01; target.y += dy * 0.01 }
      else { theta -= dx * 0.005; phi -= dy * 0.005 }
      sync()
    }
    const onWheel = (e) => { e.preventDefault(); radius = Math.max(4, Math.min(28, radius + e.deltaY * 0.012)); sync() }
    dom.addEventListener('mousedown', onDown)
    dom.addEventListener('contextmenu', (e) => e.preventDefault())
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mousemove', onMove)
    dom.addEventListener('wheel', onWheel, { passive: false })

    let raf
    const tick = () => {
      if (!isDown) { theta += 0.0007; sync() }
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()
    const onResize = () => { const W = mount.clientWidth, H = mount.clientHeight; camera.aspect = W / H; camera.updateProjectionMatrix(); renderer.setSize(W, H) }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mousemove', onMove)
      dom.removeEventListener('mousedown', onDown)
      dom.removeEventListener('wheel', onWheel)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <section className="px-[clamp(16px,4vw,72px)] pt-12 pb-32 max-w-[1500px] mx-auto">
      <header className="mb-10 max-w-2xl">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ochre mb-4 inline-flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-ochre">Workspace · 3D</p>
          <AnimatedText
            text="Experience."
            textClassName="font-display text-[clamp(56px,9vw,120px)] !text-left font-light tracking-tight !text-white"
            underlineClassName="text-ochre"
          />
        </Reveal>
      </header>

      <Reveal>
        <div className="rounded-md border border-[#0a1430] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.7)] bg-[#05070d] font-[Segoe_UI,Inter,system-ui]">
          <div className="h-7 px-3 flex items-center justify-between text-[11.5px] text-neutral-300 bg-gradient-to-b from-[#0a1430] to-[#05080f] border-b border-black">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="#1F4FFF"><path d="M2 7l10-5 10 5v10l-10 5L2 17V7z"/></svg>
              <span className="text-neutral-200">SOLIDWORKS</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400">Assembly1.SLDASM *</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#0a1430] rounded-sm" />
              <span className="w-3 h-3 inline-block bg-[#0a1430] rounded-sm" />
              <span className="w-3 h-3 inline-block bg-[#600] rounded-sm" />
            </div>
          </div>
          <div className="h-7 px-3 flex items-center gap-4 text-[12px] text-neutral-300 bg-[#08101e] border-b border-black">
            {TOP_MENUS.map(m => <span key={m} className="hover:text-ochre cursor-default">{m}</span>)}
          </div>
          <div className="h-12 px-3 flex items-center gap-2 bg-[#0a1322] border-b border-black">
            {TOOLBAR.map((b, i) => b ? (
              <button key={i} title={b.t} className="w-8 h-8 grid place-items-center rounded hover:bg-teal/20 text-neutral-300 hover:text-ochre">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={b.p} /></svg>
              </button>
            ) : <span key={i} className="w-px h-6 bg-[#0a1430] mx-1"/> )}
            <div className="ml-auto flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
              <span>view:</span>
              <select value={view} onChange={e => setView(e.target.value)} className="bg-black border border-[#0a1430] text-neutral-300 rounded px-1.5 py-0.5">
                {['Isometric','Front','Top','Right','Trimetric','Dimetric'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div className="h-8 px-2 flex items-end gap-0 bg-[#05070d] border-b border-black">
            {VIEW_TABS.map((t, i) => (
              <span key={t} className={`px-3 h-7 leading-7 text-[11.5px] rounded-t-sm border-l border-r ${i === 0 ? 'bg-[#0a1322] text-white border-black' : 'text-neutral-500 border-transparent hover:bg-teal/10'}`}>{t}</span>
            ))}
          </div>
          <div className="grid grid-cols-[280px_1fr] min-h-[560px]">
            <aside className="bg-[#05070d] border-r border-black py-2 overflow-auto" style={{ maxHeight: 720 }}>
              <div className="px-3 py-2 text-[11px] text-neutral-500 font-mono uppercase tracking-wider border-b border-[#0a1430] mb-1">Feature Manager</div>
              {FEATURE_TREE.map((n, i) => <TreeNode key={n.name + i} node={n}/>)}
            </aside>
            <div className="relative">
              <div ref={mountRef} className="w-full h-full min-h-[560px] cursor-grab active:cursor-grabbing"/>
              <div className="absolute top-3 right-3 w-[88px] h-[88px] perspective-[400px] pointer-events-none">
                <ViewCube/>
              </div>
              <div className="absolute bottom-3 left-3 font-mono text-[10px] text-neutral-500 select-none flex gap-3">
                <span style={{color:'#ff8585'}}>X</span>
                <span style={{color:'#85ff85'}}>Y</span>
                <span style={{color:'#1F4FFF'}}>Z</span>
              </div>
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/60 border border-teal/30 backdrop-blur text-[11px] text-neutral-300 font-mono">
                <span className="text-ochre">●</span> Live render — Three.js
              </div>
            </div>
          </div>
          <div className="h-6 px-3 flex items-center justify-between text-[11px] bg-black border-t border-[#0a1430] text-neutral-500 font-mono">
            <div className="flex gap-4">
              <span>Editing Assembly</span>
              <span>Fully Defined</span>
              <span>Units: <span className="text-neutral-300">MMGS</span></span>
            </div>
            <div className="flex gap-4">
              <span>Drag · Orbit  |  Scroll · Zoom  |  RMB · Pan</span>
              <span className="text-ochre">●</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function ViewCube() {
  const face = "absolute inset-0 grid place-items-center text-[10px] font-mono tracking-wider text-neutral-200 bg-teal/40 border border-ochre/40"
  return (
    <div className="w-full h-full" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-22deg) rotateY(36deg)', animation: 'cube-rot 18s linear infinite' }}>
      <style>{`@keyframes cube-rot { from { transform: rotateX(-22deg) rotateY(0deg); } to { transform: rotateX(-22deg) rotateY(360deg); } }`}</style>
      <div className={face} style={{ transform: 'translateZ(44px)' }}>FRONT</div>
      <div className={face} style={{ transform: 'rotateY(180deg) translateZ(44px)' }}>BACK</div>
      <div className={face} style={{ transform: 'rotateY(90deg) translateZ(44px)' }}>RIGHT</div>
      <div className={face} style={{ transform: 'rotateY(-90deg) translateZ(44px)' }}>LEFT</div>
      <div className={face} style={{ transform: 'rotateX(90deg) translateZ(44px)' }}>TOP</div>
      <div className={face} style={{ transform: 'rotateX(-90deg) translateZ(44px)' }}>BOT</div>
    </div>
  )
}
