import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return result.docs.length > 0;
}

export async function getUserByUsername(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));
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

export async function getPhotos(userId, following) {
	const result = await firebase
		.firestore()
		.collection("photos")
		.where("userId", "in", following)
		.get();

	const userFollowedPhotos = result.docs.map((photo) => ({
		...photo.data(),
		docId: photo.id,
	}));

	//checking if there are any photos
	// console.log('userFollowedPhotos', userFollowedPhotos);

	//this is a way of doing async await within a map!
	const photoWithUserDetails = await Promise.all(
		userFollowedPhotos.map(async (photo) => {
			let userLikedPhoto = false;

			if (photo.likes.includes(userId)) {
				userLikedPhoto = true;
			}

			const user = await getUserByUserId(photo.userId);
			const { username } = user[0];

			return { username, ...photo, userLikedPhoto };
		})
	);

	return photoWithUserDetails;
}

export async function getUserPhotosByUserId(userId) {
	const result = await firebase
		.firestore()
		.collection("photos")
		.where("userId", "==", userId)
		.get();

	const photos = result.docs.map((photo) => ({
		...photo.data(),
		docId: photo.id,
	}));

	return photos;
}

export async function isUserFollowingProfile(
	loggedInUserUsername,
	profileUserId
) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", loggedInUserUsername) // jade (active logged in user)
		.where("following", "array-contains", profileUserId)
		.get();

	const [response = {}] = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return response.userId;
}

export async function toggleFollow(
	isFollowingProfile,
	activeUserDocId,
	profileDocId,
	profileUserId,
	followingUserId
) {
	// 1st param: jade's doc id
	// 2nd param: raphael's user id
	// 3rd param: is the user following this profile? e.g. does jade follow raphael? (true/false)
	await updateLoggedInUserFollowing(
		activeUserDocId,
		profileUserId,
		isFollowingProfile
	);

	// 1st param: jade's user id
	// 2nd param: raphael's doc id
	// 3rd param: is the user following this profile? e.g. does jade follow raphael? (true/false)
	await updateFollowedUserFollowers(
		profileDocId,
		followingUserId,
		isFollowingProfile
	);
}
