import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//import the seed file

const config = { };

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//seed file will be called here (ONLY ONCE!!!!): 
//seedDatabase(firebase);

export { firebase, FieldValue };