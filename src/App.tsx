import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Typewriter1 from './components/typewriter1'
import Gallery from './components/Gallery'
import SharedWriting from './pages/SharedWriting'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Analytics } from '@vercel/analytics/react';

function Nav() {
  const location = useLocation()
  const isGallery = location.pathname === '/gallery'
  
  if (isGallery) return null
  
  return (
    <nav className="app-nav">
      <Link to="/gallery" className="nav-link">View Gallery <ArrowUpRight size={16} className="icon-arrow" /></Link>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <Analytics />
        <Nav />
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Typewriter1 />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/writing/:id" element={<SharedWriting />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
