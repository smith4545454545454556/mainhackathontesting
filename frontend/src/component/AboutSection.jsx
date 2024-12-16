import { OrbitControls, ScrollControls } from '@react-three/drei'
import React from 'react'
import { Office } from './Office'
import { Overlay } from './Overlay'
const AboutSection = () => {
    return (
        <>
            <ambientLight intensity={1.5} />
            <OrbitControls enableZoom={false} enableRotate={false} />
            <ScrollControls pages={3} damping={0.25}>
                <Office />
                <Overlay />
            </ScrollControls>

        </>



    )
}

export default AboutSection