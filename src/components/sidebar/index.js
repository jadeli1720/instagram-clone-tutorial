import useUser from "../../hooks/use-user";
import Users from "./user";
import Suggestions from "./suggestions";

export default function Sidebar() {
	const {
		user: { docId, fullname, username, userId, following },
	} = useUser();

	// console.log(`docId: ${docId}`)

	return (
		<div className="p-4">
			<Users username={username} fullname={fullname} />
			<Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
		</div>
	);
}
