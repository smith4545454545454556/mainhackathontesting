import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import clsx from 'clsx';
import navbar from '../datas/navbar';
import { logout } from '../api/user';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const { userContextData, setUserContextData } = useContext(UserContext)
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [token, setToken] = useState(true)

    const toggleMenu = () => setShowMenu(prev => !prev)

    const handleLogOut = async () => {
        try {
            console.log(userContextData.user)
            const response = await logout(userContextData.user)
            console.log(response, "log out message")

            if (response.data.success) {
                // Clear user data in context and redirect to /login
                setUserContextData(null)
                navigate('/login')
            } else {
                console.error(response.message || 'Logout failed.')
                alert(response.message || 'Logout failed. Please try again.')
            }
        } catch (error) {
            console.error('Error during logout:', error.message)
            alert('user not logged in.')
        }
    }

    return (
        <div className="w-full">
            <div className='sticky top-0 z-50 flex justify-between py-5 items-center border-b border-b-gray-400 text-sm bg-white'>
                <img className='w-44 cursor-pointer' src={""} alt="logo" />

                {/* Desktop Navbar */}
                <ul className='hidden md:flex lg:gap-14 gap-7 items-start font-medium'>
                    {navbar.map((navbarItem, index) => {
                        return (
                            <NavLink onClick={() => { scrollTo(0, 0) }}
                                key={index}
                                to={navbarItem.href}
                                className="cursor-pointer">
                                <li className='relative group cursor-pointer'>
                                    {navbarItem.name}
                                    <div className='group-hover:bg-primary absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-4/5'></div>
                                    <hr className='absolute border-none outline-none left-1/2 -bottom-1 transform -translate-x-1/2 bg-primary h-0.5 w-4/5 hidden' />
                                </li>
                            </NavLink>
                        )
                    })}
                </ul>

                {/* Desktop Profile */}
                <div className='flex items-start gap-4 md:ml-4'>
                    <div className='hidden md:flex items-center gap-2 group relative'>
                        <button onClick={handleLogOut}>Logout</button>
                    </div>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="md:hidden flex items-center justify-center text-2xl"
                    onClick={toggleMenu}
                >
                    {showMenu ? 'X' : '☰'} {/* Display "X" when menu is open, otherwise "☰" */}
                </button>
            </div>

            {/* Mobile Navbar */}
            <div className={clsx("md:hidden flex flex-col items-center mb-5 text-white bg-primary transition-all duration-500", showMenu ? "max-h-60 opacity-100" : "max-h-0 overflow-hidden")}>
                <ul className={clsx("cursor-pointer flex flex-col gap-4 items-center p-7 overflow-hidden")}>
                    {navbar.map((item, index) => (
                        <li onClick={() => { scrollTo(0, 0); setShowMenu(false); navigate(`${item.href}`) }} key={index}>
                            {item.name}
                        </li>
                    ))}
                </ul>

                {/* Profile for mobile */}
                <div>
                    <div className='flex items-center gap-2 group relative'>
                        <div className={clsx("flex gap-2", showMenu ? "visible opacity-100 transition-all duration-1000" : "invisible opacity-0")}>
                            <button onClick={handleLogOut}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
