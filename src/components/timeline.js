import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";

export default function Timeline() {
    //we need to get the logged in user's photos (custom hook)
    const { photos } = usePhotos();
    // console.log("Photos:", photos)
    
    return(
        <div className="container col-span-2" >
            {!photos ? (
                <>
                {/* //on loading the photos, use react skeleton */}
                    <Skeleton count = { 4 } width = { 640 } height = { 500 } className="mb-5"/>
                </>
            ) : photos? (
                //if we have photos, render them (create a post component) 
                photos.map((content) => <Post key={ content.docId } content= { content } />)
            ) : (
                //if the user has no photos, ask them to add photos/posts
                <p className=" text-center text-2xl">Follow people to see photos</p>
            )} 
        </div>
    )
}