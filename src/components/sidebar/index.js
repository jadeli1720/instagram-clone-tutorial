import useUser from "../../hooks/use-user";
import Users from "./user";
import Suggestions from "./suggestions";

export default function Sidebar() {
	const {
		user: { fullname, username, userId, following },
	} = useUser();

	// console.log(`following: ${following}`)

	return (
		<div className="p-4">
			<Users username={username} fullname={fullname} />
			<Suggestions userId={userId} following={following} />
		</div>
	);
}
