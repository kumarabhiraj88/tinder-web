import {INTERESTED, IGNORED, BASE_URL} from "../utils/constants";
import axios from "../api/axios";
import {removeFeed} from "../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({user, edit}) => {
  const dispatch = useDispatch();
    const { firstName, lastName, age, gender, about, photoUrl, _id } = user;

    const handleSendRequest=async({status, receiverId})=>{
        try{    
            await axios.post(`${BASE_URL}/request/send/${status}/${receiverId}`,{});
            dispatch(removeFeed(receiverId));
        }catch(err){    
            console.log("Error sending request",err.message);
        } 
    }

    return(   <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName} {lastName}</h2>
          <div>Age: {age}</div>
          <div>Gender: {gender}</div>
          <p>{about}</p>
         {!edit&& <div className="card-actions justify-center my-2">
          <button className="btn btn-secondary" onClick={()=>handleSendRequest({status: IGNORED, receiverId:_id})}>Ignore</button>
            <button className="btn btn-primary" onClick={()=>handleSendRequest({status: INTERESTED, receiverId:_id})}>Interested</button>
          </div>}
        </div>
      </div>)
}

export default UserCard;