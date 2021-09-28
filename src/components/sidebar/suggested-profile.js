import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function SuggestedProfile({
    profileDocId,
    username,
    profileId,
    userId
}) {
    const [followed, setFollowed] = useState(false);

    return !followed ? (
        <div className = "flex flex-row items-center align-items justify-between ">

        </div>
    ) : null;
}