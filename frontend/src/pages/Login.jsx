import React, { useContext, useEffect, useState } from 'react';
const art = "./public/images/art.png";
import { AnimatePresence, motion } from "framer-motion";
import Title from '../component/Title';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import clsx from 'clsx';
import { login } from '../api/user';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const { userContextData, setUserContextData } = useContext(UserContext);
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(""); // State to hold error message
    const [redirectToHome, setRedirectToHome] = useState(false); // State to manage redirect
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleForm = async (e) => {
        const { value, name } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmission = async (e) => {
        e.preventDefault();

        // Validation: Check if email or password is empty
        if (!userData.email || !userData.password) {
            setError("Both email and password are required.");
            return; // Stop the form submission if fields are empty
        }

        // Clear the error if fields are filled
        setError("");

        // Proceed with login API call
        try {
            const response = await login(userData);

            // Ensure response and response.data exist before proceeding
            if (!response || !response.data || !response.data.response) {
                setError("Invalid email or password. Please try again.");
                return; // Exit early if the response structure is unexpected
            }

            // Store the user data in context
            setUserContextData((prev) => ({ ...prev, user: response.data.response.id }));

            // Set the redirect flag to navigate without animation
            setRedirectToHome(true);
        } catch (error) {
            // Handle any login errors (e.g., network issues)
            setError("Invalid email or password. Please try again.");
        }
    };

    useEffect(() => {
        console.log(userContextData, "userContext");
    }, [userContextData]);

    const text1 = "Register"; // First part of text (brown)
    const text2 = ""; // Second part of text (white)
    const handleNavigation = () => {
        setShowText(true);
        setTimeout(() => {
            setShowText(false);
        }, 3000);
    };

    const [showText, setShowText] = useState(false);
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1 + 1, // Sequential delay for each letter
                duration: 0.5,
                ease: "easeOut",
            },
        }),
        exit: {
            opacity: 0,
            y: -20, // Smooth upward fade-out
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
    };

    // If redirect flag is set to true, navigate to /home without animation
    if (redirectToHome) {
        return <Navigate to="/home" />;
    }

    return (
        <div className='w-full h-screen flex items-start'>
            <div className='w-full md:w-1/2 h-full flex flex-col p-12'>
                <h1 className='text-xl font-semibold mb-7'>Frame it</h1>
                <div className='w-full flex flex-col md:max-w-[550px] gap-3'>
                    <div className='w-full flex flex-col mb-2'>
                        <Title>Login</Title>
                        <p className='text-base'>Join us in our journey!</p>
                    </div>
                    <form className='w-full flex flex-col'>
                        <input
                            name='email'
                            onChange={handleForm}
                            value={userData.email}
                            type='email'
                            placeholder='Email'
                            required
                            className='w-full text-black py-4 my-2 bg-transparent outline-none border-black 
                            border-b focus:outline-none'
                        />
                        <input
                            name='password'
                            onChange={handleForm}
                            value={userData.password}
                            type='password'
                            placeholder='Password'
                            required
                            className='w-full text-black py-4 my-2 bg-transparent outline-none border-black 
                            border-b focus:outline-none'
                        />
                    </form>
                    {error && (
                        <div className="text-red-500 text-sm mt-2">{error}</div> // Display error message
                    )}
                    <div className='w-full flex items-center justify-between'>
                        <div className='w-full flex'>
                            <input type='checkbox' className='w-4 h-4 mr-2' />
                            <p className='text-sm'>Remember me</p>
                        </div>
                    </div>
                    <div className='w-full flex flex-col'>
                        <button onClick={handleSubmission} className='w-full bg-black my-2 font-semibold text-white p-4 rounded-md text-center flex items-center justify-center'>
                            Login
                        </button>
                    </div>
                    <div className='w-full flex items-center justify-center mt-11'>
                        <p className='text-sm font-medium text-black'>Don't have an account?
                            <NavLink onClick={handleNavigation} to={"/"}>register</NavLink>
                        </p>
                    </div>
                </div>
            </div>

            <div className='relative w-1/2 h-full hidden md:block'>
                <img className='w-full h-full object-cover rounded-customShape' src={art} />
            </div>
            <motion.div
                className="fixed top-0 left-0 w-full h-screen origin-bottom"
                style={{
                    backgroundColor: "#f7f3f3", // Brown color
                    backgroundImage: "linear-gradient(62deg, #f7f3f3 0%, #f7f3f3 100%)"
                }}
                initial={{ scaleY: 0, borderTopLeftRadius: "0%", borderTopRightRadius: "0%" }}
                animate={{ scaleY: 0, borderTopLeftRadius: "500%", borderTopRightRadius: "500%" }}
                exit={{ scaleY: 1, borderTopLeftRadius: "0%", borderTopRightRadius: "0%" }}
                transition={{ delay: 0.2, duration: 3.1 }}
            />

            <AnimatePresence>
                {showText && (
                    <motion.div
                        className={clsx(
                            'fixed flex top-0 left-0 w-full h-screen justify-center items-center',
                            showText ? "opacity-100 visibility-visible" : "opacity-0 invisible"
                        )}
                    >
                        <motion.h1
                            className="text-3xl md:text-5xl font-permanentMarker  uppercase tracking-widest"
                            style={{
                                display: "inline-flex",
                            }}
                        >
                            {/* Animate the first part (Frame) with brown color */}
                            {text1.split("").map((letter, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="inline-block"
                                    whileHover={{
                                        scale: 1.2,
                                        color: "#FFD700", // Gold on hover
                                        transition: { duration: 0.3 },
                                    }}
                                    style={{ color: "#000" }} // Brown color
                                >
                                    {letter === " " ? "\u00A0" : letter} {/* Preserve spaces */}
                                </motion.span>
                            ))}

                            {/* Animate the second part (It) with white color */}
                            {text2.split("").map((letter, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="inline-block"
                                    whileHover={{
                                        scale: 1.2,
                                        color: "#FFD700", // Gold on hover
                                        transition: { duration: 0.3 },
                                    }}
                                    style={{ color: "#000" }} // White color
                                >
                                    {letter === " " ? "\u00A0" : letter} {/* Preserve spaces */}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="fixed top-0 left-0 w-full h-screen origin-top"
                style={{
                    backgroundColor: "#f7f3f3", // Brown color
                    backgroundImage: "linear-gradient(62deg, #f7f3f3 0%, #f7f3f3 100%)"
                }}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
            />
        </div>
    );
};

export default Login;
