// import {createSlice} from "@reduxjs/toolkit";

// const connectionSlice = createSlice({
//     name:"connection",
//     initialState:[],
//     reducers:{
//         addConnection:(state, action)=>{
//             return [...state, ...action.payload]
//         },
//         removeConnection:(state, action)=>{
//             return state.filter((feed) => feed._id !== action.payload)
//         }
//     }
// });


// export const {addConnection, removeConnection} = connectionSlice.actions
// export default connectionSlice.reducer





import {createSlice, createEntityAdapter} from "@reduxjs/toolkit";

//createEntityAdapter: a helper to manage normalized collection state (lists of items)

//This creates a custom adapter for your "connections" entity.
//selectId tells the adapter how to uniquely identify each connection (here using _id).
export const connectionAdapter=createEntityAdapter({
    selectId:(conn)=>conn._id 
})

//create the slice using adapters initial state
const connectionSlice = createSlice({
    name:"connection",
    initialState:connectionAdapter.getInitialState(), //It's ready to store many items in a way that's optimized for performance.
    reducers:{
        addConnection: connectionAdapter.addMany,
        removeConnection:connectionAdapter.removeOne
    }
});


export const {addConnection, removeConnection} = connectionSlice.actions
export default connectionSlice.reducer