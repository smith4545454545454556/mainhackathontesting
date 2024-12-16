import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()
const UserContextProvider = ({ children }) => {

    const [userContextData, setUserContextData] = useState(() => {
        const storedData = localStorage.getItem("userContextData")
        return storedData ? JSON.parse(storedData) : { userName: "", user: "", role: "" }
    })

    const [artData, setArtData] = useState({
        name: "",
        description: "",
        cover: "",
    });



    useEffect(() => {
        localStorage.setItem("userContextData", JSON.stringify(userContextData))
    }, [userContextData])


    // const [userContextData, setUserContextData] = useState({
    //     userName: "",

    //     user: "",
    //     role: ""
    // })




    const value = {
        userContextData, setUserContextData, artData, setArtData
    }


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider