import React, { useState } from 'react'

const useToggle = () => {
    const [isOpen, setIsOpen] = useState(false)
    const open = () => {
        setIsOpen(true)

    }
    const close = () => {
        setIsOpen(false)
    }
    const toggle = () => {
        setIsOpen((prev) => !prev)
    }
    return { open, close, toggle, isOpen, setIsOpen }
}

export default useToggle