import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getArt } from '../api/art';

const SingleArt = () => {
    const { artData } = useContext(UserContext); // Assuming artData is an object
    const [singleArt, setSingleArt] = useState(null); // Use `null` for better conditional rendering
    const { id } = useParams();

    useEffect(() => {
        const reload = async () => {
            try {
                const response = await getArt();
                console.log(response, "reload");

                // Find the specific art by id
                const filteredArt = response.data.art.find((artItem) => artItem._id === id);
                setSingleArt(filteredArt);
            } catch (error) {
                console.error("Error fetching art:", error);
            }
        };
        reload();
    }, [id]);

    useEffect(() => {
        console.log(singleArt, "singleArt");
    }, [singleArt]);

    return (
        <>
            {singleArt ? (
                <>
                    <div>
                        <h1>{singleArt.name}</h1>
                        <p>{singleArt.description}</p>
                        <img src={singleArt.cover} alt={singleArt.name} className="art-cover" />
                    </div>

                    <div>
                        <h2>Comments</h2>
                        {singleArt.comments?.length > 0 ? (
                            singleArt.comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <p>{comment.text}</p>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default SingleArt;
