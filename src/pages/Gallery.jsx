import { useEffect } from 'react'
import InfiniteGrid from '@/components/InfiniteGrid'
import { useTheme } from '@/context/ThemeContext'

export default function Gallery() {
  const { theme } = useTheme()
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  return <InfiniteGrid theme={theme} />
}
