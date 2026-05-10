import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import Reveal from '../components/Reveal.jsx'

function buildMicroscope() {
  const g = new THREE.Group()
  const mat = new THREE.MeshStandardMaterial({ color: 0xb6bcc4, metalness: 0.85, roughness: 0.32 })
  const dark = new THREE.MeshStandardMaterial({ color: 0x1a1d22, metalness: 0.6, roughness: 0.5 })
  const ochre = new THREE.MeshStandardMaterial({ color: 0xeaa44b, metalness: 0.7, roughness: 0.3 })

  // base
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 0.25, 48), dark)
  base.position.y = 0.125; g.add(base)

  // stage
  const stage = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 1.0), mat)
  stage.position.y = 0.9; g.add(stage)

  // arm column
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 2.4, 24), mat)
  col.position.set(-0.65, 1.4, 0); g.add(col)

  // arm
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.22, 0.4), mat)
  arm.position.set(0.05, 2.45, 0); g.add(arm)

  // body tube
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.0, 24), mat)
  tube.position.set(0.55, 1.95, 0); g.add(tube)

  // ocular
  const ocu = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.35, 24), dark)
  ocu.position.set(0.55, 2.7, 0); ocu.rotation.x = -0.3; g.add(ocu)

  // objective turret
  const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.18, 24), ochre)
  turret.position.set(0.55, 1.32, 0); g.add(turret)
  for (let i = 0; i < 3; i++) {
    const o = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.18, 16), dark)
    const a = (i / 3) * Math.PI * 2
    o.position.set(0.55 + Math.cos(a) * 0.18, 1.18, Math.sin(a) * 0.18)
    g.add(o)
  }

  // focus knob
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24), ochre)
  knob.rotation.z = Math.PI / 2
  knob.position.set(-0.85, 1.0, 0); g.add(knob)

  return g
}

function buildNMES() {
  const g = new THREE.Group()
  const fabric = new THREE.MeshStandardMaterial({ color: 0x6799a3, metalness: 0.05, roughness: 0.9 })
  const trace  = new THREE.MeshStandardMaterial({ color: 0xeaa44b, emissive: 0x9a6622, emissiveIntensity: 0.3, metalness: 0.6, roughness: 0.3 })
  const dark   = new THREE.MeshStandardMaterial({ color: 0x222428, metalness: 0.4, roughness: 0.7 })

  // sleeve (cylindrical patch)
  const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 1.5, 32, 1, true), fabric)
  sleeve.rotation.z = Math.PI / 2; g.add(sleeve)

  // electrode pads
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24), trace)
    pad.position.set(0, Math.cos(a) * 1.0, Math.sin(a) * 1.0)
    pad.lookAt(0, Math.cos(a) * 2, Math.sin(a) * 2)
    g.add(pad)
  }

  // controller box
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.3), dark)
  box.position.set(0.95, 0, 0); g.add(box)
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xeaa44b, emissive: 0xeaa44b, emissiveIntensity: 1.4 }))
  led.position.set(0.95, 0.18, 0.16); g.add(led)
  return g
}

function buildBracket() {
  const g = new THREE.Group()
  const mat = new THREE.MeshStandardMaterial({ color: 0xc9ced3, metalness: 0.9, roughness: 0.25 })
  const plate = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 1.0), mat)
  g.add(plate)
  const wall  = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.0, 1.0), mat)
  wall.position.set(-0.74, 0.56, 0); g.add(wall)
  for (let i = -1; i <= 1; i++) {
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.2, 18), new THREE.MeshStandardMaterial({ color: 0x0a0a0a }))
    hole.position.set(0.5, 0.07, i * 0.3); g.add(hole)
  }
  return g
}

function buildGear() {
  const g = new THREE.Group()
  const mat = new THREE.MeshStandardMaterial({ color: 0xdae3bb, metalness: 0.7, roughness: 0.4 })
  const teeth = 16
  const inner = 0.55, outer = 0.78
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
  const m = new THREE.Mesh(geom, mat)
  m.rotation.x = -Math.PI / 2
  g.add(m)
  return g
}

function buildShaft() {
  const mat = new THREE.MeshStandardMaterial({ color: 0xa8b0ba, metalness: 0.95, roughness: 0.18 })
  const g = new THREE.Group()
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.6, 24), mat)
  shaft.rotation.z = Math.PI / 2
  g.add(shaft)
  for (let i = -1; i <= 1; i += 2) {
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24), mat)
    collar.rotation.z = Math.PI / 2
    collar.position.x = i * 0.6
    g.add(collar)
  }
  return g
}

export default function Experience() {
  const mountRef = useRef(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth, h = mount.clientHeight
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0d0d0d)
    scene.fog = new THREE.Fog(0x0d0d0d, 12, 28)

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.set(7, 5.5, 9)
    camera.lookAt(0, 1, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    mount.appendChild(renderer.domElement)

    // lighting (studio)
    const hemi = new THREE.HemisphereLight(0x9fb6c4, 0x1a1410, 0.55); scene.add(hemi)
    const key = new THREE.DirectionalLight(0xffffff, 1.6)
    key.position.set(5, 9, 6); key.castShadow = true
    key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -0.0005
    key.shadow.camera.near = 0.5; key.shadow.camera.far = 30
    key.shadow.camera.left = -10; key.shadow.camera.right = 10
    key.shadow.camera.top = 10; key.shadow.camera.bottom = -10
    scene.add(key)
    const fill = new THREE.DirectionalLight(0x6799a3, 0.45); fill.position.set(-6, 3, -4); scene.add(fill)
    const rim = new THREE.DirectionalLight(0xeaa44b, 0.35); rim.position.set(0, 4, -8); scene.add(rim)

    // grid floor
    const grid = new THREE.GridHelper(40, 40, 0x2c3a45, 0x1a2128)
    grid.position.y = 0
    grid.material.opacity = 0.55; grid.material.transparent = true
    scene.add(grid)

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({ color: 0x0a0d10, metalness: 0.2, roughness: 0.95 })
    )
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)

    // origin marker (SolidWorks-y triad)
    const triad = new THREE.Group()
    const ax = (color, axis) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 8), new THREE.MeshBasicMaterial({ color }))
      if (axis === 'x') { m.rotation.z = -Math.PI / 2; m.position.x = 0.6 }
      if (axis === 'y') { m.position.y = 0.6 }
      if (axis === 'z') { m.rotation.x = Math.PI / 2; m.position.z = 0.6 }
      return m
    }
    triad.add(ax(0xff6464, 'x')); triad.add(ax(0x64ff64, 'y')); triad.add(ax(0x6498ff, 'z'))
    triad.position.set(-6, 0.01, -6); scene.add(triad)

    // objects
    const microscope = buildMicroscope()
    microscope.position.set(-2.6, 0, -0.5)
    microscope.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
    scene.add(microscope)

    const nmes = buildNMES()
    nmes.position.set(2.4, 1.2, 0.6)
    nmes.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
    scene.add(nmes)

    const bracket = buildBracket()
    bracket.position.set(0.4, 0, 2.4)
    bracket.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
    scene.add(bracket)

    const gear = buildGear()
    gear.position.set(-2.0, 0.1, 2.4)
    gear.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
    scene.add(gear)

    const shaft = buildShaft()
    shaft.position.set(2.4, 0.5, -2.0)
    shaft.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
    scene.add(shaft)

    // simple orbit (mouse drag)
    let isDown = false, sx = 0, sy = 0
    let rot = { theta: Math.atan2(camera.position.x, camera.position.z), phi: Math.atan2(Math.hypot(camera.position.x, camera.position.z), camera.position.y) }
    let radius = camera.position.length()
    const target = new THREE.Vector3(0, 1, 0)

    const update = () => {
      const sp = Math.max(0.2, Math.min(Math.PI - 0.2, rot.phi))
      camera.position.x = target.x + radius * Math.sin(sp) * Math.sin(rot.theta)
      camera.position.z = target.z + radius * Math.sin(sp) * Math.cos(rot.theta)
      camera.position.y = target.y + radius * Math.cos(sp)
      camera.lookAt(target)
    }
    update()

    const onDown = (e) => { isDown = true; sx = e.clientX; sy = e.clientY }
    const onUp = () => { isDown = false }
    const onMove = (e) => {
      if (!isDown) return
      const dx = e.clientX - sx, dy = e.clientY - sy
      sx = e.clientX; sy = e.clientY
      rot.theta -= dx * 0.005
      rot.phi   -= dy * 0.005
      update()
    }
    const onWheel = (e) => {
      e.preventDefault()
      radius = Math.max(5, Math.min(20, radius + e.deltaY * 0.01))
      update()
    }
    renderer.domElement.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mousemove', onMove)
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false })

    let raf
    let auto = 0
    const tick = () => {
      auto += 0.0015
      // subtle auto-rotation when not dragging
      if (!isDown) { rot.theta += 0.0008; update() }
      gear.rotation.z += 0.005
      shaft.rotation.x += 0.01
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      const w2 = mount.clientWidth, h2 = mount.clientHeight
      camera.aspect = w2 / h2; camera.updateProjectionMatrix()
      renderer.setSize(w2, h2)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mousemove', onMove)
      renderer.domElement.removeEventListener('mousedown', onDown)
      renderer.domElement.removeEventListener('wheel', onWheel)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <section className="exp">
      <header className="exp-head">
        <Reveal>
          <div className="section-tag">Workspace · 3D</div>
          <h1>Experience.</h1>
          <p className="exp-lead">A SolidWorks-style sandbox of things I’ve designed and built. Drag to orbit, scroll to zoom.</p>
        </Reveal>
      </header>

      <Reveal className="exp-frame">
        <div className="frame-bar">
          <div className="frame-tabs">
            <span className="tab active">Assembly1.SLDASM</span>
            <span className="tab">Microscope.SLDPRT</span>
            <span className="tab">NMES_v3.SLDPRT</span>
          </div>
          <div className="frame-ctrls">
            <span className="ctrl"/>
            <span className="ctrl"/>
            <span className="ctrl"/>
          </div>
        </div>
        <div ref={mountRef} className="exp-canvas"/>
        <div className="frame-status">
          <span>● Live render</span>
          <span>Three.js · WebGL</span>
          <span>Drag · Orbit · Wheel · Zoom</span>
        </div>
      </Reveal>

      <div className="exp-cards">
        <Reveal delay={120}><div className="exp-card">
          <div className="exp-card-num">01</div>
          <h3>Dark-Field Microscope</h3>
          <p>Low-cost optical setup for antimicrobial susceptibility testing. Custom condenser, machined stage.</p>
        </div></Reveal>
        <Reveal delay={220}><div className="exp-card">
          <div className="exp-card-num">02</div>
          <h3>NMES Textile Device</h3>
          <p>Wearable neuromuscular electrical stimulation prototype, conductive textile electrodes, PCB driver.</p>
        </div></Reveal>
        <Reveal delay={320}><div className="exp-card">
          <div className="exp-card-num">03</div>
          <h3>SolidWorks Library</h3>
          <p>Brackets, shafts, gears, jigs — building blocks gathered through coursework and side projects.</p>
        </div></Reveal>
      </div>

      <style>{`
        .exp { max-width: 1320px; margin: 0 auto; padding: var(--space-16) clamp(var(--space-6), 5vw, var(--space-12)) var(--space-24); }
        .exp-head { margin-bottom: var(--space-12); max-width: 720px; }
        .section-tag {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--color-ochre); letter-spacing: 0.16em;
          text-transform: uppercase; margin-bottom: var(--space-6);
          display: inline-flex; align-items: center; gap: 8px;
        }
        .section-tag::before { content: ''; width: 24px; height: 1px; background: var(--color-ochre); }
        .exp-head h1 {
          font-family: var(--font-display); font-size: clamp(56px, 9vw, 120px);
          font-weight: 300; letter-spacing: -0.04em; line-height: 0.95; margin-bottom: var(--space-4);
        }
        .exp-lead { color: var(--color-text-secondary); font-size: 18px; }

        .exp-frame {
          background: #0D0D0D;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }
        .frame-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 8px 14px;
          background: linear-gradient(180deg, #161819, #0E1011);
          border-bottom: 1px solid var(--glass-border);
        }
        .frame-tabs { display: flex; gap: 0; }
        .tab {
          font-family: var(--font-mono); font-size: 11px;
          padding: 6px 14px; border-radius: 6px 6px 0 0;
          color: var(--color-text-muted);
        }
        .tab.active { color: var(--color-ochre); background: #0D0D0D; border: 1px solid var(--glass-border); border-bottom: none; }
        .frame-ctrls { display: flex; gap: 6px; }
        .ctrl { width: 10px; height: 10px; border-radius: 50%; background: #2a2d31; }
        .ctrl:nth-child(1) { background: #ff5f57; }
        .ctrl:nth-child(2) { background: #febc2e; }
        .ctrl:nth-child(3) { background: #28c840; }
        .exp-canvas { width: 100%; height: clamp(420px, 70vh, 720px); cursor: grab; }
        .exp-canvas:active { cursor: grabbing; }
        .frame-status {
          display: flex; justify-content: space-between;
          padding: 8px 14px;
          background: #08090a;
          border-top: 1px solid var(--glass-border);
          font-family: var(--font-mono); font-size: 11px;
          color: var(--color-text-muted);
        }
        .frame-status span:first-child { color: var(--color-ochre); }

        .exp-cards {
          margin-top: var(--space-12);
          display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6);
        }
        @media (max-width: 880px) { .exp-cards { grid-template-columns: 1fr; } }
        .exp-card {
          padding: var(--space-6);
          background: var(--color-bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          position: relative;
        }
        .exp-card-num {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--color-text-muted); letter-spacing: 0.12em;
          margin-bottom: var(--space-4);
        }
        .exp-card h3 { font-family: var(--font-display); font-size: 22px; margin-bottom: 8px; }
        .exp-card p { color: var(--color-text-secondary); font-size: 14px; line-height: 1.6; }
      `}</style>
    </section>
  )
}
