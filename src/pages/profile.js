import { useParams, useHistory } from "react-router-dom";
import { useEffect ,useState } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from '../components/header';
import UserProfile from "../components/profile";


export default function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [ userExists, setUserExist ] = useState(false);
    const history = useHistory();
    

    useEffect(() => {
        async function checkUserExists() {
            const user = await getUserByUsername(username);
            // console.log('doest user exist', doesUserExist)
            if (user.length > 0) {
                setUser(user[0]);
                setUserExist(true);
            } else {
                history.push(ROUTES.NOT_FOUND)
            }
        }

        checkUserExists();
        return user

    }, [username, history]);

    return userExists ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    ): null;
}
