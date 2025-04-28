import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BASE_URL, ACCEPTED, REJECTED } from '../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { addRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store=>store.request);
    const [showToast, setShowToast]= useState(false);

    //show all the connection requests 
    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/requests`, {withCredentials: true});
            dispatch(addRequest(response.data.data));
        } catch (error) {
            console.log(error);
        }
    }

    const handleRequest=async({status, requestId})=>{
        try{    
            await axios.patch(`${BASE_URL}/request/review/${status}/${requestId}`,{}, {withCredentials: true});
            dispatch(removeFeed(requestId));
            setShowToast(true)
        }catch(err){    
            console.log("Error sending request",err.message);
        } 
    }


    useEffect(() => {
        fetchRequests();
    }, []);

    useEffect(()=>{
            let timerId;
            if(showToast){
                timerId= setTimeout(()=>{
                    setShowToast(false);
                },3000);
            }
            //cleanup function to clear the timout while unmount
            return ()=> clearTimeout(timerId);
          },[showToast]);

    
    if(requests?.length === 0) return (<div className="flex justify-center my-5">No Requests found</div>);

  return requests && (<div className="text-center my-10"> 
        <h1 className='text-5xl font-bold mt-0 mb-5'>Requests</h1>
        {requests?.map((request)=>{
            const {senderId, _id} = request;
            const {firstName, lastName, age, gender, photoUrl, about} = senderId;
            return (<div className='flex items-center w-1/2 m-auto p-4' key={_id}>
                <div className='flex-shrink-0'>
                  <img alt="profile pic" className='w-20 h-20 rounded-full' src={photoUrl} />
                </div>
              
                <div className='text-left ml-4'>
                  <h2 className='font-bold text-xl whitespace-nowrap'>
                    {firstName} {lastName}
                  </h2>
                  {age && gender && <p>{age} {gender}</p>}
                  <p>{about}</p>
                </div>
                <div className="flex space-x-2 ml-4"> {/* Adds horizontal spacing between the buttons */}
                    <button onClick={()=>handleRequest({status: ACCEPTED, requestId:_id})} className="btn btn-success px-4 py-2 text-white rounded-md hover:bg-green-600 focus:outline-none">
                    Accept
                    </button>
                    <button onClick={()=>handleRequest({status: REJECTED, requestId:_id})} className="btn btn-error px-4 py-2 text-white rounded-md hover:bg-red-600 focus:outline-none">
                    Reject
                    </button>
                </div>
              </div>
              
              
              )
        })}
        {showToast &&<Toast msg={"Send successfully"} />}
        </div>)
}

export default Requests
