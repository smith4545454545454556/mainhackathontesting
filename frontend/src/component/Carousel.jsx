// import React from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';

// const Carousel = () => {
//     // Track scroll progress along the Y axis (vertical scroll)
//     const { scrollYProgress } = useScroll();

//     // Map the scroll position to the horizontal movement (x-axis)
//     const x = useTransform(scrollYProgress, [0, 1], [0, -100 * 2]); // Adjust -100 * number of cards to scroll through

//     const cards = [
//         { id: 1, title: 'Card 1', description: 'Description of Card 1' },
//         { id: 2, title: 'Card 2', description: 'Description of Card 2' },
//         { id: 3, title: 'Card 3', description: 'Description of Card 3' },
//     ];

//     return (
//         <div className="relative h-screen overflow-hidden">
//             {/* Scrollable area that sticks to the top */}
//             <motion.div
//                 className="sticky top-0 flex w-full"
//                 style={{ x }} // Animate the horizontal scroll based on the vertical scroll position
//             >
//                 {cards.map((card) => (
//                     <div key={card.id} className="flex-shrink-0 w-screen h-full flex items-center justify-center px-4 py-8">
//                         <div className="bg-white shadow-lg rounded-lg w-full h-64 flex flex-col items-center justify-center text-center">
//                             <h2 className="text-xl font-semibold">{card.title}</h2>
//                             <p>{card.description}</p>
//                         </div>
//                     </div>
//                 ))}
//             </motion.div>
//         </div>
//     );
// };

// export default Carousel;
