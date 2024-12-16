import clsx from 'clsx'
import React, { useRef } from 'react'
import useClickOutside from '../hook/useClickOutside';

const ArtPopUp = (props) => {
    const { children, isOpen, open, close, allowedRef } = props

    // const{mainRef,contentRef}=
    const mainRef = useRef()
    const contentRef = useRef()
    useClickOutside(mainRef, contentRef, allowedRef, close, isOpen);
    return (
        <div>
            <div ref={mainRef} className={clsx(" fixed top-0 left-0 h-[100vh] w-[100vw] bg-black/25", isOpen ? "visible opacity-100" : "invisible opacity-0")}>
                <div ref={contentRef} className={clsx(" absolute top-[20%] left-[30%]", isOpen ? "visible opacity-100" : "invisible opacity-0")}>
                    {children}

                </div>
            </div>
        </div>
    )
}

export default ArtPopUp