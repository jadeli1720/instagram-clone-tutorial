import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";

export default function Timeline() {
    //we need to get the logged in user's photos (custom hook)
    const { photos } = usePhotos();
    // console.log("Photos:", photos)
    
    return(
        <div className="container col-span-2" >
            {!photos ? (
                <>
                {/* //on loading the photos, use react skeleton */}
                    {[...new Array(4)].map((_, index) => 
                        <Skeleton key={ index } count = { 1 } width = { 320 } height = { 400 } />
                    )}
                </>
            ) : photos?.length > 0 ? (
                //if we have photos, render them (create a post component) 
                photos.map((content) => <p key={content.docId}>{ content.imageSrc }</p>)
            ) : (
                //if the user has no photos, ask them to add photos/posts
                <p className=" text-center text-2xl">Follow people to see photos</p>
            )} 
        </div>
    )
}