import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Reveal from '@/components/Reveal'
import { AnimatedText } from '@/components/AnimatedText'

// ---- procedural CAD parts ------------------------------------------------
function buildMicroscope() {
  const g = new THREE.Group()
  const steel = new THREE.MeshStandardMaterial({ color: 0xb6bcc4, metalness: 0.85, roughness: 0.32 })
  const dark  = new THREE.MeshStandardMaterial({ color: 0x1a1d22, metalness: 0.6,  roughness: 0.5 })
  const ochre = new THREE.MeshStandardMaterial({ color: 0xeaa44b, metalness: 0.7,  roughness: 0.3 })
  const glass = new THREE.MeshStandardMaterial({ color: 0x6799a3, metalness: 0.9,  roughness: 0.05, transparent: true, opacity: 0.55 })

  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.7, 0.28, 56), dark);  base.position.y = 0.14; g.add(base)
  const baseLip = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.04, 12, 56), steel); baseLip.position.y = 0.27; baseLip.rotation.x = Math.PI/2; g.add(baseLip)

  // stage
  const stage = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.08, 1.05), steel); stage.position.y = 0.95; g.add(stage)
  const slide = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.02, 0.32), glass); slide.position.set(0.05, 1.0, 0); g.add(slide)
  const stageClip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.10, 0.28), ochre); stageClip.position.set(0.45, 1.04, 0); g.add(stageClip)

  // column
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 2.6, 32), steel); col.position.set(-0.78, 1.5, 0); g.add(col)
  // arm
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.24, 0.42), steel); arm.position.set(0.05, 2.65, 0); g.add(arm)
  // rev nut
  const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.10, 16), ochre); nut.position.set(-0.78, 2.78, 0); g.add(nut)
  // tube
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 1.05, 28), steel); tube.position.set(0.6, 2.10, 0); g.add(tube)
  // ocular
  const ocu = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.20, 0.36, 24), dark); ocu.position.set(0.6, 2.85, 0); ocu.rotation.x = -0.32; g.add(ocu)
  const ocuRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 8, 24), ochre); ocuRing.position.set(0.6, 3.02, 0); ocuRing.rotation.x = Math.PI/2 - 0.32; g.add(ocuRing)
  // turret
  const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.30, 0.20, 28), ochre); turret.position.set(0.6, 1.42, 0); g.add(turret)
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    const obj = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.22, 18), dark)
    obj.position.set(0.6 + Math.cos(a) * 0.20, 1.24, Math.sin(a) * 0.20)
    g.add(obj)
  }
  // focus knob
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.14, 28), ochre)
  knob.rotation.z = Math.PI / 2; knob.position.set(-0.96, 1.10, 0); g.add(knob)
  // condenser (dark field)
  const cond = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.10, 0.34, 24), glass); cond.position.set(0.05, 0.74, 0); g.add(cond)

  return g
}

function buildNMES() {
  const g = new THREE.Group()
  const fabric = new THREE.MeshStandardMaterial({ color: 0x6799a3, metalness: 0.05, roughness: 0.9 })
  const trace  = new THREE.MeshStandardMaterial({ color: 0xeaa44b, emissive: 0x9a6622, emissiveIntensity: 0.3, metalness: 0.6, roughness: 0.3 })
  const dark   = new THREE.MeshStandardMaterial({ color: 0x222428, metalness: 0.4, roughness: 0.7 })

  const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 1.5, 36, 1, true), fabric); sleeve.rotation.z = Math.PI/2; g.add(sleeve)
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24), trace)
    pad.position.set(0, Math.cos(a) * 1.0, Math.sin(a) * 1.0)
    pad.lookAt(0, Math.cos(a) * 2, Math.sin(a) * 2)
    g.add(pad)
  }
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.55, 0.32), dark); box.position.set(0.95, 0, 0); g.add(box)
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), new THREE.MeshStandardMaterial({ color: 0xeaa44b, emissive: 0xeaa44b, emissiveIntensity: 1.4 }))
  led.position.set(0.95, 0.20, 0.18); g.add(led)
  return g
}

function buildBracket() {
  const g = new THREE.Group()
  const mat = new THREE.MeshStandardMaterial({ color: 0xc9ced3, metalness: 0.9, roughness: 0.25 })
  const plate = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 1.0), mat); g.add(plate)
  const wall  = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.0, 1.0), mat); wall.position.set(-0.74, 0.56, 0); g.add(wall)
  for (let i = -1; i <= 1; i++) {
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.2, 18), new THREE.MeshStandardMaterial({ color: 0x0a0a0a }))
    hole.position.set(0.5, 0.07, i * 0.3); g.add(hole)
  }
  return g
}

function buildGear() {
  const g = new THREE.Group()
  const mat = new THREE.MeshStandardMaterial({ color: 0xdae3bb, metalness: 0.7, roughness: 0.4 })
  const teeth = 18, inner = 0.55, outer = 0.78
  const shape = new THREE.Shape()
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2
    const r = i % 2 === 0 ? outer : inner
    const x = Math.cos(a) * r, y = Math.sin(a) * r
    if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y)
  }
  const hole = new THREE.Path()
  hole.absellipse(0, 0, 0.18, 0.18, 0, Math.PI * 2)
  shape.holes.push(hole)
  const geom = new THREE.ExtrudeGeometry(shape, { depth: 0.18, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2, steps: 1 })
  const m = new THREE.Mesh(geom, mat); m.rotation.x = -Math.PI / 2
  g.add(m)
  return g
}

function buildShaft() {
  const mat = new THREE.MeshStandardMaterial({ color: 0xa8b0ba, metalness: 0.95, roughness: 0.18 })
  const g = new THREE.Group()
  const s = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 1.6, 24), mat); s.rotation.z = Math.PI/2; g.add(s)
  for (let i = -1; i <= 1; i += 2) {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24), mat); c.rotation.z = Math.PI/2; c.position.x = i * 0.6; g.add(c)
  }
  return g
}

// ---- the SolidWorks-style page -----------------------------------------------
const FEATURE_TREE = [
  { name: 'Assembly1', kind: 'asm', open: true, children: [
    { name: 'Annotations', kind: 'folder' },
    { name: 'Front Plane', kind: 'plane' },
    { name: 'Top Plane', kind: 'plane' },
    { name: 'Right Plane', kind: 'plane' },
    { name: 'Origin', kind: 'origin' },
    { name: 'Microscope<1>', kind: 'part', open: true, children: [
      { name: 'Base', kind: 'feat' },
      { name: 'Stage', kind: 'feat' },
      { name: 'Optical Tube', kind: 'feat' },
      { name: 'Objective Turret', kind: 'feat' },
      { name: 'Focus Knob', kind: 'feat' },
      { name: 'Dark-Field Condenser', kind: 'feat' },
    ]},
    { name: 'NMES_Sleeve<1>', kind: 'part', open: true, children: [
      { name: 'Fabric Loft', kind: 'feat' },
      { name: 'Electrode Pads', kind: 'feat' },
      { name: 'Driver Enclosure', kind: 'feat' },
    ]},
    { name: 'Bracket<1>', kind: 'part' },
    { name: 'Gear_18T<1>', kind: 'part' },
    { name: 'Shaft_Ø10<1>', kind: 'part' },
    { name: 'Mates', kind: 'folder', open: true, children: [
      { name: 'Concentric1 (Microscope, Origin)', kind: 'mate' },
      { name: 'Coincident1 (Stage, Top Plane)', kind: 'mate' },
      { name: 'Distance1 (Bracket, Gear)', kind: 'mate' },
    ]},
  ]}
]

function TreeIcon({ kind }) {
  const cls = "w-3.5 h-3.5 shrink-0"
  const col = kind === 'plane' ? '#eaa44b' : kind === 'mate' ? '#6799a3' : kind === 'origin' ? '#dae3bb' : '#9aa0a6'
  if (kind === 'asm')   return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="#eaa44b" strokeWidth="1.6"><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg>
  if (kind === 'part')  return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="#dae3bb" strokeWidth="1.5"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5z"/></svg>
  if (kind === 'plane') return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.4"><path d="M3 8l9-4 9 4-9 4-9-4z"/></svg>
  if (kind === 'origin')return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.4"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>
  if (kind === 'mate')  return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.4"><path d="M9 8a4 4 0 0 1 0 8"/><path d="M15 8a4 4 0 0 0 0 8"/></svg>
  if (kind === 'feat')  return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.4"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M9 4v16"/></svg>
  return <svg className={cls} viewBox="0 0 24 24" fill="#3a5173" stroke="#6799a3" strokeWidth="1.2"><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
}

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(!!node.open)
  const has = node.children && node.children.length
  return (
    <div>
      <div
        className="flex items-center gap-1.5 px-2 py-[3px] hover:bg-[#1d3245] rounded-sm cursor-pointer text-[12.5px] leading-tight"
        onClick={() => has && setOpen(!open)}
        style={{ paddingLeft: 6 + depth * 12 }}
      >
        {has ? (
          <svg className={`w-3 h-3 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
        ) : (
          <span className="w-3" />
        )}
        <TreeIcon kind={node.kind} />
        <span className="text-neutral-200 truncate">{node.name}</span>
      </div>
      {open && has && (
        <div>{node.children.map((c, i) => <TreeNode key={c.name + i} node={c} depth={depth + 1}/>)}</div>
      )}
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
  const triadRef = useRef({ theta: 0, phi: 0 })
  const [view, setView] = useState('Isometric')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth, h = mount.clientHeight
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0d0d0d)
    scene.fog = new THREE.Fog(0x0d0d0d, 14, 36)

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    const target = new THREE.Vector3(0, 1, 0)
    let radius = 10
    let theta = Math.PI / 4   // azimuth
    let phi = Math.PI / 3     // elevation
    const sync = () => {
      const sp = Math.max(0.18, Math.min(Math.PI - 0.18, phi))
      camera.position.x = target.x + radius * Math.sin(sp) * Math.sin(theta)
      camera.position.z = target.z + radius * Math.sin(sp) * Math.cos(theta)
      camera.position.y = target.y + radius * Math.cos(sp)
      camera.lookAt(target)
      triadRef.current = { theta, phi }
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

    // lighting
    const hemi = new THREE.HemisphereLight(0x9fb6c4, 0x1a1410, 0.55); scene.add(hemi)
    const key = new THREE.DirectionalLight(0xffffff, 1.6)
    key.position.set(5, 9, 6); key.castShadow = true
    key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -0.0005
    key.shadow.camera.near = 0.5; key.shadow.camera.far = 30
    key.shadow.camera.left = -12; key.shadow.camera.right = 12
    key.shadow.camera.top = 12; key.shadow.camera.bottom = -12
    scene.add(key)
    scene.add(new THREE.DirectionalLight(0x6799a3, 0.45).copy(new THREE.DirectionalLight(0x6799a3, 0.45).position.set(-6, 3, -4)))
    const fill = new THREE.DirectionalLight(0x6799a3, 0.45); fill.position.set(-6, 3, -4); scene.add(fill)
    const rim = new THREE.DirectionalLight(0xeaa44b, 0.35); rim.position.set(0, 4, -8); scene.add(rim)

    // SolidWorks-style grid
    const grid = new THREE.GridHelper(60, 60, 0x2c3a45, 0x1a2128)
    grid.material.opacity = 0.6; grid.material.transparent = true
    scene.add(grid)
    const subgrid = new THREE.GridHelper(60, 240, 0x182026, 0x182026)
    subgrid.position.y = -0.001; subgrid.material.opacity = 0.35; subgrid.material.transparent = true
    scene.add(subgrid)

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: 0x0a0d10, metalness: 0.2, roughness: 0.95 }))
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor)

    // origin triad
    const triad = new THREE.Group()
    const ax = (color, axis) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.4, 8), new THREE.MeshBasicMaterial({ color }))
      if (axis === 'x') { m.rotation.z = -Math.PI / 2; m.position.x = 0.7 }
      if (axis === 'y') { m.position.y = 0.7 }
      if (axis === 'z') { m.rotation.x = Math.PI / 2; m.position.z = 0.7 }
      return m
    }
    triad.add(ax(0xff5f5f, 'x')); triad.add(ax(0x5fff5f, 'y')); triad.add(ax(0x5f9fff, 'z'))
    triad.position.set(-7, 0.01, -7); scene.add(triad)

    // Place parts
    const microscope = buildMicroscope(); microscope.position.set(-2.6, 0, -0.3); scene.add(microscope)
    const nmes = buildNMES();              nmes.position.set(2.6, 1.2, 0.6);     scene.add(nmes)
    const bracket = buildBracket();        bracket.position.set(0.4, 0, 2.6);    scene.add(bracket)
    const gear = buildGear();              gear.position.set(-2.0, 0.1, 2.6);    scene.add(gear)
    const shaft = buildShaft();            shaft.position.set(2.6, 0.5, -2.0);   scene.add(shaft)

    ;[microscope, nmes, bracket, gear, shaft].forEach(grp => {
      grp.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
    })

    // orbit controls (lightweight)
    let isDown = false, mid = false, sx = 0, sy = 0
    const dom = renderer.domElement
    const onDown = (e) => {
      e.preventDefault()
      isDown = true; mid = e.button === 1 || e.button === 2
      sx = e.clientX; sy = e.clientY
    }
    const onUp = () => { isDown = false; mid = false }
    const onMove = (e) => {
      if (!isDown) return
      const dx = e.clientX - sx, dy = e.clientY - sy
      sx = e.clientX; sy = e.clientY
      if (mid) {
        // pan
        target.x -= dx * 0.01
        target.y += dy * 0.01
      } else {
        theta -= dx * 0.005
        phi -= dy * 0.005
      }
      sync()
    }
    const onWheel = (e) => {
      e.preventDefault()
      radius = Math.max(4, Math.min(28, radius + e.deltaY * 0.012))
      sync()
    }
    dom.addEventListener('mousedown', onDown)
    dom.addEventListener('contextmenu', (e) => e.preventDefault())
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mousemove', onMove)
    dom.addEventListener('wheel', onWheel, { passive: false })

    let raf
    const tick = () => {
      if (!isDown) { theta += 0.0007; sync() }
      gear.rotation.z += 0.005
      shaft.rotation.x += 0.012
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      const W = mount.clientWidth, H = mount.clientHeight
      camera.aspect = W / H; camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
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
          <p className="text-lg text-neutral-400 max-w-xl mt-8">A SolidWorks-style sandbox of things I’ve designed and built. Drag to orbit · Scroll to zoom · Right-click to pan.</p>
        </Reveal>
      </header>

      <Reveal>
        <div className="rounded-md border border-[#2a2e33] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.55)] bg-[#1f2226] font-[Segoe_UI,Inter,system-ui]">
          {/* Title bar */}
          <div className="h-7 px-3 flex items-center justify-between text-[11.5px] text-neutral-300 bg-gradient-to-b from-[#2c3034] to-[#202428] border-b border-[#0f1113]">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="#eaa44b"><path d="M2 7l10-5 10 5v10l-10 5L2 17V7z"/></svg>
              <span className="text-neutral-200">SOLIDWORKS</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">Assembly1.SLDASM *</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#3b3f44] rounded-sm" />
              <span className="w-3 h-3 inline-block bg-[#3b3f44] rounded-sm" />
              <span className="w-3 h-3 inline-block bg-[#a04141] rounded-sm" />
            </div>
          </div>

          {/* Top menus */}
          <div className="h-7 px-3 flex items-center gap-4 text-[12px] text-neutral-300 bg-[#262a2e] border-b border-[#0f1113]">
            {TOP_MENUS.map(m => <span key={m} className="hover:text-white cursor-default">{m}</span>)}
          </div>

          {/* Toolbar */}
          <div className="h-12 px-3 flex items-center gap-2 bg-[#2a2e33] border-b border-[#0f1113]">
            {TOOLBAR.map((b, i) => b ? (
              <button key={i} title={b.t} className="w-8 h-8 grid place-items-center rounded hover:bg-white/5 text-neutral-300 hover:text-ochre">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={b.p} /></svg>
              </button>
            ) : <span key={i} className="w-px h-6 bg-[#3a3f45] mx-1"/> )}
            <div className="ml-auto flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
              <span>view:</span>
              <select value={view} onChange={e => setView(e.target.value)} className="bg-[#1c1f23] border border-[#3a3f45] text-neutral-300 rounded px-1.5 py-0.5">
                {['Isometric','Front','Top','Right','Trimetric','Dimetric'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div className="h-8 px-2 flex items-end gap-0 bg-[#1f2226] border-b border-[#0f1113]">
            {VIEW_TABS.map((t, i) => (
              <span key={t} className={`px-3 h-7 leading-7 text-[11.5px] rounded-t-sm border-l border-r ${i === 0 ? 'bg-[#262a2e] text-white border-[#0f1113]' : 'text-neutral-400 border-transparent hover:bg-white/5'}`}>{t}</span>
            ))}
          </div>

          {/* Body: tree + canvas */}
          <div className="grid grid-cols-[280px_1fr] min-h-[560px]">
            {/* Feature Manager */}
            <aside className="bg-[#1c1f22] border-r border-[#0f1113] py-2 overflow-auto" style={{ maxHeight: 720 }}>
              <div className="px-3 py-2 text-[11px] text-neutral-500 font-mono uppercase tracking-wider border-b border-[#262a2e] mb-1">Feature Manager</div>
              {FEATURE_TREE.map((n, i) => <TreeNode key={n.name + i} node={n}/>)}
            </aside>

            {/* Canvas + overlays */}
            <div className="relative">
              <div ref={mountRef} className="w-full h-full min-h-[560px] cursor-grab active:cursor-grabbing"/>
              {/* View Cube */}
              <div className="absolute top-3 right-3 w-[88px] h-[88px] perspective-[400px] pointer-events-none">
                <div className="relative w-full h-full">
                  <ViewCube/>
                </div>
              </div>
              {/* Triad bottom-left */}
              <div className="absolute bottom-3 left-3 font-mono text-[10px] text-neutral-500 select-none">
                <div className="flex gap-3">
                  <span style={{color:'#ff8585'}}>X</span>
                  <span style={{color:'#85ff85'}}>Y</span>
                  <span style={{color:'#85b5ff'}}>Z</span>
                </div>
              </div>
              {/* HUD chip */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/55 border border-white/10 backdrop-blur text-[11px] text-neutral-300 font-mono">
                <span className="text-ochre">●</span> Live render — Three.js
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="h-6 px-3 flex items-center justify-between text-[11px] bg-[#1a1d20] border-t border-[#0f1113] text-neutral-500 font-mono">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {[
          ['01', 'Dark-Field Microscope', 'Low-cost optical setup for antimicrobial susceptibility testing. Custom condenser, machined stage.'],
          ['02', 'NMES Textile Device', 'Wearable neuromuscular electrical stimulation prototype, conductive textile electrodes, PCB driver.'],
          ['03', 'SolidWorks Library', 'Brackets, shafts, gears, jigs — building blocks gathered through coursework and side projects.'],
        ].map(([n, t, b], i) => (
          <Reveal key={n} delay={i * 120}>
            <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
              <div className="font-mono text-[11px] text-neutral-500 tracking-widest mb-3">{n}</div>
              <h3 className="font-display text-2xl text-white mb-2">{t}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ViewCube() {
  // simple CSS 3D cube (purely decorative)
  const face = "absolute inset-0 grid place-items-center text-[10px] font-mono tracking-wider text-neutral-200 bg-[#3a3f45]/85 border border-white/15"
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
