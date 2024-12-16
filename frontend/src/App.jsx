import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Hero from './component/Hero'
import AboutPage from './pages/AboutPage'
import Art from './pages/Art'
import SingleArt from './pages/SingleArt'
import Navbar from './component/Navbar'
import Footer from './component/Footer'

function App() {
  const location = useLocation()

  // List of paths where the Navbar should not appear
  const noNavbarRoutes = ['/login', '/']

  return (
    <>
      {/* Conditionally render the Navbar */}
      {!noNavbarRoutes.includes(location.pathname) && (
        <div className='sticky top-0 z-50 bg-gray-700'>
          <Navbar />
        </div>
      )}

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/art' element={<Art />} />
          <Route path='/art/:id' element={<SingleArt />} />
        </Routes>
        <Footer />
      </AnimatePresence>
    </>
  )
}

export default App
