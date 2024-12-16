import React, { useEffect } from 'react'

const useClickOutside = (mainRef, contentRef, allowedRef, close) => {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (mainRef.current && mainRef.current == e.target && allowedRef != e.target) {
                close()

            }


        }
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)

        }


    });
    return {}



}

export default useClickOutside