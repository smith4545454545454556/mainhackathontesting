import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

const Section = (props) => {
    return (
        <section
            className={`h-screen flex flex-col justify-center p-10 ${props.right ? "items-end" : "items-start"
                }`}
            style={{
                opacity: props.opacity,
            }}
        >
            <div className="w-1/2 flex items-center justify-center">
                <div className="max-w-sm w-full">
                    <div className="bg-white  rounded-lg px-8 py-12">
                        {props.children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Overlay = () => {
    const scroll = useScroll();
    const [opacityFirstSection, setOpacityFirstSection] = useState(1);
    const [opacitySecondSection, setOpacitySecondSection] = useState(1);
    const [opacityLastSection, setOpacityLastSection] = useState(1);

    useFrame(() => {
        setOpacityFirstSection(1 - scroll.range(0, 1 / 3));
        setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3));
        setOpacityLastSection(scroll.range(2 / 3, 1 / 3));
    });

    return (
        <Scroll html>
            <div class="w-screen">
                <Section opacity={opacityFirstSection}>
                    <h1 className="font-medium font-Montserrat text-3xl ">
                        Frame it

                    </h1>
                    <p className="font-Montserrat text-[21px]">It offers a space where creativity meets comfort. We are dedicated to providing you with the perfect room that fits your style, needs, and personality.</p>

                </Section>
                <Section right opacity={opacitySecondSection}>
                    <h1 className="font-medium font-Montserrat text-3xl ">
                        Why use it?

                    </h1>
                    <p className="font-Montserrat text-[21px]">Frame it offers an open platform for artists and art enthusiasts to come together, share insights, and inspire one another.</p>
                </Section>
                <Section opacity={opacityLastSection}>
                    <h1 className="font-medium font-Montserrat text-3xl ">
                        Objective

                    </h1>

                    <p className="font-Montserrat text-[21px]"> To offer a diverse collection of artworks that speak to different tastes, styles, and cultures, giving your space its own personality and soul</p>
                </Section>
            </div>
        </Scroll>
    );
};