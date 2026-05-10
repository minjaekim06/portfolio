import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import FloatingDock from './components/FloatingDock.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Experience from './pages/Experience.jsx'
import Gallery from './pages/Gallery.jsx'

export default function App() {
  const location = useLocation()
  return (
    <ThemeProvider>
      <main key={location.pathname} className="route-fade">
        <Routes location={location}>
          <Route path="/" element={<Home/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/experience" element={<Experience/>} />
          <Route path="/gallery" element={<Gallery/>} />
        </Routes>
      </main>
      <FloatingDock/>
    </ThemeProvider>
  )
}
