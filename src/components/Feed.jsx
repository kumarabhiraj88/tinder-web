import { useEffect } from "react";
import axios from "../api/axios";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = ()=>{
    const dispatch = useDispatch();
    const feed = useSelector(store=>store.feed);
    const getFeed=async()=>{
        try{
            const result= await axios.get(`${BASE_URL}/user/feed`);
            dispatch(addFeed(result.data));
        }catch(err){
            console.log("Feed error",err);
        }
    }

    useEffect(()=>{
        if(feed.length===0){
            getFeed();
        }
    },[])


    
    if(feed?.length === 0) return (<div className="flex justify-center my-5">No users found</div>);
    
    return feed && (<div className="flex justify-center my-5"> 
        <UserCard user={feed[0]} />
        </div>)
}

export default Feed;