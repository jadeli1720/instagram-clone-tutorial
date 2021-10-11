import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { updateFollowerdUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase'

export default function SuggestedProfile({
	spDocId,
	profileDocId,
	username,
	profileId,
	userId,
	loggedInUserDocId,
}) {
	const [followed, setFollowed] = useState(false);

	async function handleFollowUser() {
		setFollowed(true);

		//firebase: create 2 services (functions)
		// update the following array of the logged in user (my profile in this case)
		await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
		
		// update the followers array of the user who has been followed
		await updateFollowerdUserFollowers(spDocId, userId)
	}

	const capitalize = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return !followed ? (
		<div className="flex flex-row items-center align-items justify-between ">
			<div className="flex items-center justify-between">
				<img
					className="rounded-full w-8 flex mr-3"
					src={`/images/avatars/${username}.jpg`}
					alt=""
					onError={(e) => {
						e.target.src = `/images/avatars/default.png`;
					}}
				/>
				<Link to={`/p/${username}`}>
					<p className="font-bold text-sm">{username}</p>
				</Link>
			</div>
			<button
				className="text-xs font-bold text-blue-medium"
				type="button"
				// onClick={() => console.log(`Follow ${capitalize(username)}`)}
				onClick={handleFollowUser}
			>
				Follow
			</button>
		</div>
	) : null;
}

SuggestedProfile.propTypes = {
	spDocId: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	profileId: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	loggedInUserDocId: PropTypes.string.isRequired
};
