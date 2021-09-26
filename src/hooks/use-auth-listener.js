import  { useContext, useEffect, useState } from "react";
import FirebaseContext  from "../context/firebase";


//This custom hook will just listen for if a user is logged in or logged out. Listens for the state to change.

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            //if we have a user....store the user in local storage; 
            //When storing things in local storage always remember to stringify
            if (authUser){
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser)
            } else {
                //we don't have an authorized user, clear the local storage
                localStorage.removeItem('authUser');
                setUser(null);
            }
        })
        
        //The listener opens a connection when state has changed and needs to be closed once its finished setting state. Cleaning up the listener when it's done :
        return () => listener()

    }, [firebase]);

    return { user }
}