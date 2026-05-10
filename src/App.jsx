import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx'
import { FloatingDock } from './ui/floating-dock.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Experience from './pages/Experience.jsx'
import Gallery from './pages/Gallery.jsx'

const Icon = {
  Home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full p-2"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/></svg>,
  Projects: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full p-2"><rect x="3" y="4" width="7" height="7" rx="1.4"/><rect x="14" y="4" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/></svg>,
  Experience: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full p-2"><path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/></svg>,
  Gallery: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full p-2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="1.6"/><path d="m21 15-5-5L5 21"/></svg>,
  YouTube: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full p-2"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.2 5 12 5 12 5s-6.2 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.8 19 12 19 12 19s6.2 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"/></svg>,
  LinkedIn: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full p-2"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.6h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.13V21h-4v-5.27c0-1.26-.02-2.88-1.76-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5Z"/></svg>,
  Resume: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full p-2"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M9 13h6M9 17h6M9 9h2"/></svg>,
  Sun: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full p-2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  Moon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full p-2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>,
}

function DockShell() {
  const { theme, toggleTheme } = useTheme()
  const items = [
    { title: 'Home', icon: Icon.Home, to: '/' },
    { title: 'Projects', icon: Icon.Projects, to: '/projects' },
    { title: 'Experience', icon: Icon.Experience, to: '/experience' },
    { title: 'Gallery', icon: Icon.Gallery, to: '/gallery' },
    { title: 'YouTube', icon: Icon.YouTube, href: '#' },
    { title: 'LinkedIn', icon: Icon.LinkedIn, href: '#' },
    { title: 'Resume', icon: Icon.Resume, href: '/portfolio/resume.pdf' },
    { title: theme === 'dark' ? 'Light mode' : 'Dark mode', icon: theme === 'dark' ? Icon.Sun : Icon.Moon, accentActive: toggleTheme },
  ]
  return <FloatingDock items={items} />
}

function Routed() {
  const location = useLocation()
  return (
    <main key={location.pathname} className="route-fade">
      <Routes location={location}>
        <Route path="/" element={<Home/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/experience" element={<Experience/>} />
        <Route path="/gallery" element={<Gallery/>} />
      </Routes>
    </main>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Routed/>
      <DockShell/>
    </ThemeProvider>
  )
}
