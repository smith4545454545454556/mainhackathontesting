import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import navbar from '../datas/navbar'

const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className=' md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>
                {/* left side */}
                <div className=' '>
                    <img className=' mb-5 w-40' src={"/images/cover.png"} />
                    <p className=' w-full text-gray-800 md:w-2/3 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Error repellendus eum ducimus quas ad. Voluptas modi illo aut nulla
                        rerum aperiam quo eaque doloribus ad laborum officia ab, dicta est.</p>


                </div>
                {/* center  */}
                <div className=''>
                    <h1 className=' text-xl text-gray-800 font-medium mb-5'>LINKS</h1>
                    <ul className=' flex flex-col gap-2 text-gray-800'>
                        {navbar.map((navbar, index) => (
                            <>
                                <NavLink to={navbar.href}>

                                    <li onClick={() => { scrollTo(0, 0); navigate(navbar.href) }} key={index}  >{navbar.name}</li>
                                </NavLink>

                            </>
                        ))}
                    </ul>

                </div>
                {/* right side */}


                <div className=' '>
                    <h1 className=' text-xl text-gray-800 font-medium mb-5'>GET IN TOUCH</h1>
                    <ul className=' flex flex-col gap-2 text-gray-800'>
                        <li>+977-019289493</li>
                        <li>frameit@gmail.com</li>

                    </ul>

                </div>
            </div>
            <hr />
            <p className=' text-sm text-center py-5 text-gray-700'> Copyright 2024@ frameit- All Right Reserved </p>
        </div>
    )
}

export default Footer