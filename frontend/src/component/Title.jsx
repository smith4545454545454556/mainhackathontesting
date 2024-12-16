import React from 'react'
import { AnimatePresence, motion } from "framer-motion"


const Title = ({ children }) => {
    return (
        <div className='overflow-hidden'>
            <motion.h1 className='text-4xl font-semibold text-gray-800 mb-2' initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-110%" }} transition={{ duration: 0.6, delay: 1.2 }}>{children}</motion.h1>
        </div>
    )
}

export default Title