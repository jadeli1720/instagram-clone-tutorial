import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';

export default function usePhotos(user) {
    const [ photos, setPhotos ] = useState(null);

    const {
        user: { uid: userId = '' }
    } = useContext(UserContext)
    
    useEffect(() => {
        async function getTimelinePhotos() {

        }

        console.log(userId)
        // getTimelinePhotos()

    }, [])

    return { photos }
}

