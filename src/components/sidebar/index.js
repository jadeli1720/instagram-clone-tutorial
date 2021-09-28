import useUser from "../../hooks/use-user";
import Users from "./user";
import Suggestions from "./suggestions";

export default function Sidebar() {
	const {
		user: { fullname, username, userId, following },
	} = useUser();

	// console.log(`fullname: ${fullname}, username: ${username}, userID: ${userId} `)

	return (
		<div className="p-4">
			<Users username={username} fullname={fullname} />
			<Suggestions userId={userId} following={following} />
		</div>
	);
}
