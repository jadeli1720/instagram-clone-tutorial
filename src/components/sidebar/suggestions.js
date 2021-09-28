import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

export default function Suggestions ({ userId, following }) {
    const [profiles, setProfile] = useState(null);

    useEffect(() => {

    })

    return (
        <p>This is the suggestions component</p>
    )
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array
}
