import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";

export default function Timeline() {
    //we need to get the logged in user's photos (custom hook)
    const { photos } = usePhotos();
    //on loading the photos, use react skeleton
    //if we have photos, render them (create a post component)
    //if the user has no photos, ask them to add photos/posts

    return(
        <div className="col-span-2" >
            This is the Timeline Component!
        </div>
    )
}