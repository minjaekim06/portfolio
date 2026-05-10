import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx'
import { FloatingDock } from '@/components/ui/floating-dock'
import {
  IconHome,
  IconLayoutGrid,
  IconPhoto,
  IconBrandYoutube,
  IconBrandLinkedin,
  IconFileText,
  IconSun,
  IconMoon,
} from '@tabler/icons-react'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Gallery from './pages/Gallery.jsx'

const iconCls = 'h-full w-full text-neutral-600 dark:text-neutral-300'

function DockShell() {
  const links = [
    { title: 'Home',       icon: <IconHome className={iconCls} />,           href: '#/' },
    { title: 'Projects',   icon: <IconLayoutGrid className={iconCls} />,     href: '#/projects' },
    { title: 'Gallery',    icon: <IconPhoto className={iconCls} />,          href: '#/gallery' },
    { title: 'YouTube',    icon: <IconBrandYoutube className={iconCls} />,   href: 'https://www.youtube.com/@crodiess', target: '_blank', rel: 'noreferrer' },
    { title: 'LinkedIn',   icon: <IconBrandLinkedin className={iconCls} />,  href: 'https://www.linkedin.com/in/minjaekim060103/', target: '_blank', rel: 'noreferrer' },
    { title: 'Resume',     icon: <IconFileText className={iconCls} />,       href: '/portfolio/resume.pdf', target: '_blank', rel: 'noreferrer' },
  ]
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
      <FloatingDock
        mobileClassName="translate-y-20"
        items={links}
      />
    </div>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const Icon = theme === 'dark' ? IconSun : IconMoon
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed top-6 right-6 z-[1000] h-11 w-11 rounded-full bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-[0_8px_28px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_28px_rgba(0,0,0,0.35)] grid place-items-center text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}

function Routed() {
  const location = useLocation()
  return (
    <main key={location.pathname} className="route-fade">
      <Routes location={location}>
        <Route path="/" element={<Home/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/experience" element={<Projects/>} />
        <Route path="/gallery" element={<Gallery/>} />
      </Routes>
    </main>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Routed/>
      <ThemeToggle/>
      <DockShell/>
    </ThemeProvider>
  )
}
