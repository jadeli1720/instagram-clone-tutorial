import { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types';
import Header from './header';

import { getUserPhotosByUserId, } from '../../services/firebase';
import Photos from './photos';


export default function UserProfile({ user }) {
    const reducer = (state, newState) => ({...state, ...newState});
    const initialState = {
        profile: {},
        photosCollection: null,
        followerCount: 0
    }

    const [{ profile, photosCollection, followerCount}, dispatch] = useReducer(
        reducer, 
        initialState
    );

    useEffect(() => {
        async function getProfileInfoAndPhotos() {

            const photos = await getUserPhotosByUserId(user.userId)
            dispatch({
                profile:user, 
                photosCollection: photos, 
                followerCount: user.followers.length
            });
        }

        getProfileInfoAndPhotos()
    },[user.username])

    return (
        <>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
            <p>Hello {user.username}</p>
        </>
    )
}

UserProfile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    }).isRequired
}