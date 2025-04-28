import React, {useEffect} from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store=>store.connection);
    //show all the accepted connections
    const fetchConnections = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/connections`, {withCredentials: true});
            dispatch(addConnection(response.data.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);
    if(connections?.length === 0) return (<div className="text-center my-5">No Connections found</div>);

  return connections && (<div className="text-center my-10"> 
        <h1 className='text-5xl font-bold'>Connections</h1>
        {connections?.map((connection)=>{
            const [firstName, lastName, age, gender, photoUrl, _id] = connection;
            return (<div className='flex flex-col w-1/2 m-auto' key={_id}>
                        <div >
                            <img alt="profile pic" className='w-20 h-20 rounded-full' src={photoUrl} />
                        </div>
                        <div className='text-left mx-4'>
                            <h2 className='font-bold text-xl'>{firstName} {lastName}</h2>
                            {age && gender &&(<p>{age} {gender}</p>)}
                            <p>{about}</p>
                        </div>
                    </div>)
        })}
        </div>)
}

export default Connections
