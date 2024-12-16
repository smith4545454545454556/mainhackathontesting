import React, { useContext, useEffect } from 'react';
import Hero from '../component/Hero';
import Scrolling from '../component/Scrolling';
import Zoom from '../component/Zoom';
import { UserContext } from '../context/UserContext';

const Home = () => {
    const {
        userContextData, setUserContextData

    } = useContext(UserContext)
    useEffect(() => {
        console.log(userContextData)

    }, [userContextData])
    console.log(userContextData)
    return (
        <>
            <div className=' relative min-h-screen min-w-screen overflow-x-hidden'>

                <Hero />


                <Scrolling />

                <Zoom />
            </div>

        </>




    );
};

export default Home;
