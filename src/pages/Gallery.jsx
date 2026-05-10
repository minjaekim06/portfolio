import { useEffect } from 'react'
import InfiniteGrid from '@/components/InfiniteGrid'
import { useTheme } from '@/context/ThemeContext'

export default function Gallery() {
  const { theme } = useTheme()
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  return (
    <div className="relative">
      <InfiniteGrid theme={theme} />
      <div className="pointer-events-none fixed top-6 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-full bg-black/55 border border-white/10 backdrop-blur text-[11px] font-mono text-neutral-300 tracking-wide">
        <span className="text-ochre">●</span>&nbsp;&nbsp;Gallery — drag, hover, fling
      </div>
    </div>
  )
}
