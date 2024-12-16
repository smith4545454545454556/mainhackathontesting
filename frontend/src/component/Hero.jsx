import React, { useEffect, useRef } from "react";
import { init } from "./Frame.jsx";

function Hero() {
    const threeCanvasRef = useRef(null);

    useEffect(() => {
        // Pass the specific DOM element for Three.js rendering
        if (threeCanvasRef.current) {
            init(threeCanvasRef.current);
        }
    }, []);

    return (
        <div className="hero-section h-[95vh] w-full relative bg-[#fdf46e]">

            {/* Three.js Canvas Container */}
            <div
                ref={threeCanvasRef}
                className="absolute top-0 left-0 w-full h-full z-0"
            ></div>
            <p className="absolute top-[35%] left-12 font-bold text-3xl uppercase leading-tight md:text-[6rem] z-0 text-[#8f4c1d]  tracking-wider drop-shadow-lg">
                <span className="block md:inline">Frame</span> <span className="block md:inline  ">It</span>
            </p>
            <div class="custom-shape-divider-bottom-1733907512">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                </svg>
            </div>



        </div>
    );
}

export default Hero;
