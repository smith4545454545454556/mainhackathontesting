import React from 'react'
import About from './About'
import { Canvas } from '@react-three/fiber'
import AboutSection from './AboutSection'

const Transiton = () => {
    return (

        <div className=' h-screen w-full flex justify-center items-center'>
            <About />

            <Canvas camera={{
                fov: 44,
                position: [2.3, 1.5, 2.3]
            }}>
                <AboutSection />
            </Canvas>
        </div>)
}

export default Transiton
// import React from 'react'
// import { motion } from "framer-motion"

// const Transitons = () => {
//     return (
//         <>
//             <motion.div className=' fixed top-0 left-0 bg-black w-full h-screen origin-bottom' initial={{ scaleY: 0 }} animate={{ scaleY: 0 }} exit={{ scaleY: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
//             <motion.div className='fixed top-0 left-0 bg-black w-full h-screen origin-top' initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} exit={{ scaleY: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} /> </>)

// }

// export default Transitons