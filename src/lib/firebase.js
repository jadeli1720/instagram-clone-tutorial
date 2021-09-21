import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//import the seed file. leave commented out because we have already seeded the data once.
// import { seedDatabase } from '../seed';

const apiKey = process.env.REACT_APP_FIREBASE_APIKEY;
const authDomain = process.env.REACT_APP_FIREBASE_AUTHDOMAIN;
const projectId = process.env.REACT_APP_FIREBASE_PROJECTID;
const storageBucket = process.env.REACT_APP_FIREBASE_STORAGEBUCKET;
const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSSENDID;
const appId =  process.env.REACT_APP_FIREBASE_APPID;


const config = { 
    apiKey: `${apiKey}`,
    authDomain: `${authDomain}`,
    projectId: `${projectId}`,
    storageBucket: `${storageBucket}`,
    messagingSenderId: `${messagingSenderId}`,
    appId: `${appId}`
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//seed file will be called here (ONLY ONCE!!!!): if you uncomment it this will run a second time and we don't want that. Data has already been seeded to firebase
// seedDatabase(firebase);


export { firebase, FieldValue };