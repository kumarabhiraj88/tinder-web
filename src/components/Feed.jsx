import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = ()=>{
    const dispatch = useDispatch();
    const feed = useSelector(store=>store.feedReducer);
    const getFeed=async()=>{
        try{
            const result= await axios.get(`${BASE_URL}/user/feed`,{withCredentials: true});
            dispatch(addFeed(result.data));
        }catch(err){
            console.log("Feed error",err);
        }
    }

    useEffect(()=>{
        if(!feed){
            getFeed();
        }
    },[])
    
    return(<div className="flex justify-center my-5"> 
        <FeedCard feed={feed[0]} />
        </div>)
}

export default Feed;