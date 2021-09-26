import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
// import { DEFAULT_IMAGE_PATH } from '../constants/paths';
// import useUser from '../hooks/use-user';

export default function Header() {
    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);

    return(
        <header className="h-16 bg-white border-b border-gray-primary mb-8">
            <div className = "container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full" >
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer" >
                        <h1 className="flex justify-center w-full" >
                            <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                                <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" />
                            </Link>
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    )
}