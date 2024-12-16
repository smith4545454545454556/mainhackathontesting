import React, { useContext, useEffect, useRef, useState } from 'react';
import { addArt, comment, getArt, likeArt } from '../api/art';
import { UserContext } from '../context/UserContext';
import useToggle from '../hook/useToggle';
import ArtPopUp from '../component/ArtPopUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Art = () => {
    const navigate = useNavigate();
    const { userContextData, artData, setArtData } = useContext(UserContext);
    const [addComment, setAddComment] = useState(null);
    const [storeArt, setStoreArt] = useState([]);
    const { open, close, isOpen } = useToggle();
    const allowedRef = useRef();
    const [newComment, setNewComment] = useState("");

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e, artId) => {
        e.preventDefault();
        if (!newComment) return;
        const response = await comment({ userId: userContextData.user, artId: artId, text: newComment });
        setNewComment(''); // Reset the comment input
        setAddComment(null); // Close the comment input field
        console.log(response, "comment submitted");
    };

    // Fetch all art on component mount
    useEffect(() => {
        const fetchArt = async () => {
            const response = await getArt();
            if (response?.data?.art) {
                setStoreArt(response.data.art);
            }
        };
        fetchArt();
    }, []);

    // Handle form input changes
    const handleFormChange = (e) => {
        const { value, name, files } = e.target;
        setArtData((prev) => ({
            ...prev,
            [name]: name === "cover" ? files[0] : value,
        }));
    };

    // Handle art submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!artData.name) {
            toast.error("Name is required");
            return;
        }
        if (!artData.description) {
            toast.error("Description is required");
            return;
        }
        if (!artData.cover) {
            toast.error("Cover image is required");
            return;
        }

        const formData = new FormData();
        formData.append("name", artData.name);
        formData.append("description", artData.description);
        formData.append("cover", artData.cover);
        formData.append("user", userContextData.user);

        try {
            const response = await addArt(formData);
            if (response?.data?.art) {
                setStoreArt((prev) => [...prev, response.data.art]);
                toast.success("Art posted successfully!");
                setArtData({ name: "", description: "", cover: null }); // Reset the form
                close(); // Close the popup
            }
        } catch (error) {
            toast.error("Failed to post art. Please try again.");
            console.error("Error submitting art:", error);
        }
    };

    // Handle like/unlike functionality
    const handleLike = async (id) => {
        // Optimistically update the UI
        setStoreArt((prevArt) =>
            prevArt.map((art) =>
                art._id === id
                    ? {
                        ...art,
                        likes: art.likes.includes(userContextData.user)
                            ? art.likes.filter((userId) => userId !== userContextData.user) // Unlike
                            : [...art.likes, userContextData.user], // Like
                    }
                    : art
            )
        );

        try {
            const response = await likeArt({
                userId: userContextData.user,
                artId: id,
            });
            if (!response || !response.data) {
                throw new Error("Failed to toggle like");
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            // Rollback optimistic update
            setStoreArt((prevArt) =>
                prevArt.map((art) =>
                    art._id === id
                        ? {
                            ...art,
                            likes: art.likes.includes(userContextData.user)
                                ? [...art.likes, userContextData.user] // Re-add like
                                : art.likes.filter((userId) => userId !== userContextData.user), // Remove like
                        }
                        : art
                )
            );
        }
    };

    return (
        <div>
            <ToastContainer />
            {userContextData?.role === "artist" && (
                <button ref={allowedRef} onClick={open}>
                    Add Art
                </button>
            )}

            {/* Art Pop-Up Form */}
            <ArtPopUp
                allowedRef={allowedRef}
                handleSubmit={handleSubmit}
                handleFormChange={handleFormChange}
                isOpen={isOpen}
                open={open}
                close={close}
            >
                <button onClick={close}>Close</button>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label>Name</label>
                    <input
                        onChange={handleFormChange}
                        type="text"
                        name="name"
                        value={artData.name || ""}
                    />
                    <label>Description</label>
                    <input
                        onChange={handleFormChange}
                        type="text"
                        name="description"
                        value={artData.description || ""}
                    />
                    <label>Cover</label>
                    <input onChange={handleFormChange} type="file" name="cover" />
                    <button type="submit">Submit</button>
                </form>
            </ArtPopUp>

            {/* Art Gallery */}
            <div className="grid grid-cols-auto gap-3 pt-5 gap-y-6 sm:px-0 w-full">
                {storeArt.map((art, index) => (
                    <div
                        key={index}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                    >
                        <img className="bg-blue-50" src={art.cover} alt={art.name} />
                        <div className="p-4">
                            <h1 className="font-medium text-lg text-gray-900">{art.name}</h1>
                            <p className="text-gray-900 text-sm">By: {art.user.name}</p>
                            <div>
                                <button
                                    onClick={() => handleLike(art._id)}
                                    className={`${art.likes.includes(userContextData.user)
                                        ? "text-blue-500"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {art.likes.includes(userContextData.user) ? "Unlike" : "Like"}
                                </button>
                                <p>
                                    {art.likes.length}{" "}
                                    {art.likes.length === 1 ? "like" : "likes"}
                                </p>
                                <div>commentCount:</div>
                                {addComment === art._id ? (
                                    <div>
                                        <textarea value={newComment} onChange={handleCommentChange}></textarea>
                                        <button onClick={(e) => { handleCommentSubmit(e, art._id) }}>Submit</button>
                                    </div>
                                ) : (
                                    <button onClick={() => { setAddComment(art._id) }}>Add a comment</button>
                                )}
                            </div>
                        </div>
                        <p onClick={() => { navigate(`/art/${art._id}`) }}>More</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Art;
