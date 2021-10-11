import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return result.docs.length > 0;
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("userId", "==", userId)
		.get();

	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return user;
}

export async function getSuggestedProfiles(userId, following) {
	const result = await firebase
		.firestore()
		.collection("users")
		.limit(10)
		.get();

	return result.docs
		.map((user) => ({ ...user.data(), doc: user.id }))
		.filter(
			(profile) =>
				profile.userId !== userId && !following.includes(profile.userId)
		);
}

//This function will allow a user to toggle to follow/unfollow other profiles
export async function updateLoggedInUserFollowing(
	loggedInUserDocId, // currently logged in user document id (my profile)
	profileId, // the user that the currently logged in user (me) requests to follow
	isFollowingProfile // true/false if the currently logged in user (me) following this person?
) {
	return firebase
		.firestore()
		.collection("users")
		.doc(loggedInUserDocId)
		.update({
			following: isFollowingProfile
				? FieldValue.arrayRemove(profileId) //if following, remove from array
				: FieldValue.arrayUnion(profileId), // if not following, add to the array
		});
}

//This function updates the profiles of those the currently logged in user (I) have chosen to follow/unfollow
export async function updateFollowedUserFollowers(
	profileDocId, 
	loggedInUserDocId, 
	isFollowingProfile
) {
	return firebase
		.firestore()
		.collection("users")
		.doc(profileDocId)
		.update({
			followers: isFollowingProfile
				? FieldValue.arrayRemove(loggedInUserDocId)
				: FieldValue.arrayUnion(loggedInUserDocId),
		});
}
