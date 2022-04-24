import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from '../services/firebase';

export default function usePhotos(user) {
    const [ photos, setPhotos ] = useState(null);

    const {
        user: { uid: userId = '' }
    } = useContext(UserContext);
    
    useEffect(() => {
        async function getTimelinePhotos() {
            const [{ following }] = await getUserByUserId(userId);
            let followedUserPhotos = [];

            //is the user following anyone
            if(following.length > 0){
                followedUserPhotos = await getPhotos(userId, following)
            }

            //making sure that the newest photos come first by dateCreated
            followedUserPhotos.sort((a,b) => b.dateCreated - a.dateCreated);
            setPhotos(followedUserPhotos);
        }

        // console.log("from use-photos hook:",userId);
        getTimelinePhotos();

    }, [userId])

    return { photos }
}

