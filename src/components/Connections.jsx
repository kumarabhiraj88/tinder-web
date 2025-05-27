import React, {useEffect} from 'react';
import axios from '../api/axios';
import { BASE_URL } from '../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { addConnection, connectionAdapter } from '../utils/connectionSlice';
import NoImage from './common/NoImage';

const Connections = () => {
    const dispatch = useDispatch();
    const {selectAll} = connectionAdapter.getSelectors((state)=>state.connection);
    //selectAll will merge ids and entities internally and return an array of all the connection objects:
    const connections = useSelector(selectAll)
    //show all the accepted connections
    const fetchConnections = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/connections`);
            dispatch(addConnection(response.data.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(!connections || connections.length===0){
            fetchConnections();
        }
        
    }, [connections]);
    
    return connections?.length > 0 ? (
        <div className="text-center my-10">
          <h1 className="text-3xl font-bold mb-6">Connections</h1>
          {connections?.map((connection) => {
            const { firstName, lastName, age, gender, photoUrl, _id, about } = connection;
            
            return (
              <div className="flex items-center w-full max-w-4xl mx-auto p-4 border-b border-gray-300 mb-6" key={_id}>
                <div className="flex-shrink-0">
                  {photoUrl ? <img alt="profile pic" className='w-20 h-20 rounded-full object-cover' src={photoUrl} /> : <NoImage />}
                </div>
      
                <div className="text-left ml-6 flex-1">
                  <h2 className="font-bold text-xl mb-2">{firstName} {lastName}</h2>
                  {age && gender && <p className="text-sm text-gray-600">{age} {gender}</p>}
                  {about && <p className="text-gray-700 mt-2">{about}</p>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center my-5 text-xl text-gray-600">No Connections found</div>
      );
      
}

export default Connections
