import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../api/user";
import { UserContext } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import Title from "../component/Title";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1 + 1,
            duration: 0.5,
            ease: "easeOut",
        },
    }),
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

const Register = () => {
    const { userContextData, setUserContextData } = useContext(UserContext);

    useEffect(() => {
        console.log(userContextData);
    }, [userContextData]);

    const handleNavigation = () => {
        setShowText(true);
        setTimeout(() => {
            setShowText(false);
        }, 3000);
    };

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const handleForm = (e) => {
        const { value, name } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleValidation = () => {
        const newErrors = {};
        if (!userData.name) newErrors.name = "Name is required";
        if (!userData.email) newErrors.email = "Email is required";
        if (!userData.password) newErrors.password = "Password is required";
        if (!userData.role) newErrors.role = "Role is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // return true if no errors
    };

    const handleSubmission = async (e) => {
        e.preventDefault();

        // Validate the form data before submitting
        if (!handleValidation()) {
            return; // Don't submit if there are validation errors
        }

        try {
            const response = await register(userData);

            if (response.data && response.data.success) {
                // If registration is successful, show a success toast
                toast.success("User registered successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });

                // Update the user context with user data after successful registration
                setUserContextData((prev) => ({
                    ...prev,
                    role: userData.role,
                    userName: response.data.response.name,
                }));
            } else {
                // Show an error toast if registration failed
                toast.error(response.data.message || "Registration failed. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            }
        } catch (error) {
            // First, check if error.response exists
            if (error.response) {
                // Check if error.response.data exists before accessing it
                if (error.response.data) {
                    console.log('Error Data:', error.response.data);
                    console.log('Error Message:', error.response.data.message || 'No message provided');
                } else {
                    console.log('Error Response Data is undefined');
                }

                console.log('Status Code:', error.response.status);
            } else {
                // If error.response is undefined, log the error message directly
                console.log('Error:', error.message);
            }

            // Optionally, handle the error (show a toast or alert)
            toast.error(error.response?.data?.message || "email already registered", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored"
            });
        }

    };

    const [showText, setShowText] = useState(false);
    const text1 = "Login";
    const text2 = "";

    return (
        <div className="w-full h-screen flex items-start">
            {/* Toast Container */}
            <ToastContainer />

            <div className="relative w-1/2 h-full hidden md:block">
                <img className="w-full h-full object-cover rounded-customShape" src="./public/images/art.png" alt="Art" />
            </div>
            <div className="w-full md:w-1/2 h-full flex flex-col p-4">
                <h1 className="text-xl font-semibold mb-7">Frame it</h1>
                <div className="w-full flex flex-col md:max-w-[550px] gap-3">
                    <div className="w-full flex flex-col mb-2">
                        <Title>Register</Title>
                        <p className="text-base">Join us in our journey!</p>
                    </div>
                    <form className="w-full flex flex-col">
                        <input
                            name="name"
                            onChange={handleForm}
                            value={userData.name}
                            type="name"
                            placeholder="Name"
                            className="w-full text-black py-4 my-2 bg-transparent outline-none border-black border-b focus:outline-none"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                        <input
                            name="email"
                            type="email"
                            onChange={handleForm}
                            value={userData.email}
                            placeholder="Email"
                            className="w-full text-black py-4 my-2 bg-transparent outline-none border-black border-b focus:outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        <input
                            name="password"
                            onChange={handleForm}
                            value={userData.password}
                            type="password"
                            placeholder="Password"
                            className="w-full text-black py-4 my-2 bg-transparent outline-none border-black border-b focus:outline-none"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                        <select onChange={handleForm} name="role" value={userData.role}>
                            <option value="">Choose a role</option>
                            <option value="user">User</option>
                            <option value="artist">Artist</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                    </form>
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <p className="text-sm">Remember me</p>
                        </div>
                        <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline-offset-1 underline">
                            Forget Password
                        </p>
                    </div>
                    <div className="w-full flex flex-col">
                        <button
                            onClick={handleSubmission}
                            className="w-full bg-black my-2 font-semibold text-white p-4 rounded-md text-center flex items-center justify-center"
                        >
                            Register
                        </button>
                    </div>
                    <div className="w-full flex items-center justify-center ">
                        <p className="text-md font-medium text-black">
                            Already have an account?{" "}
                            <NavLink className="underline text-blue-600" onClick={handleNavigation} to={"/login"}>
                                login
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
            <motion.div
                className="fixed top-0 left-0 w-full h-screen origin-bottom"
                style={{
                    backgroundColor: "#f7f3f3",
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
                            "fixed flex top-0 left-0 w-full h-screen justify-center items-center",
                            showText ? "opacity-100 visibility-visible" : "opacity-0 invisible"
                        )}
                    >
                        <motion.h1
                            className="text-3xl md:text-5xl  font-permanentMarker uppercase tracking-widest"
                            style={{
                                display: "inline-flex",
                            }}
                        >
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
                                        color: "#FFD700",
                                        transition: { duration: 0.3 },
                                    }}
                                    style={{ color: "#000" }}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}

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
                                        color: "#FFD700",
                                        transition: { duration: 0.3 },
                                    }}
                                    style={{ color: "#000" }}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="fixed top-0 left-0 w-full h-screen origin-top"
                style={{
                    backgroundColor: "#f7f3f3",
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

export default Register;
