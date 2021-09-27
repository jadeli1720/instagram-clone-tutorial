import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";


export default function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getUserObjByYserId() {
            // need a function that we can call (firebase service) that gets user data by id
            const response = await getUserByUserId(user.uid)
            setActiveUser(response)
        }

        if (user?.uid) {
            getUserObjByYserId() 
        } else {

        }

    }, [user]);

    return { user: activeUser };
};