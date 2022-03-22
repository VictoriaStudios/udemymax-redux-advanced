import { createContext, useState, useReducer } from 'react';


export const testContext = createContext();

const detailsReducer = (state, action) => {
        switch (action.type) {
            case 'LOG_IN': return {loggedIn:true}
            case 'LOG_OUT': return {loggedIn:false}
            default: return {loggedIn:false}
        }
}

const TestProvider = (props) => {
    //basic state management
    //const [userDetails, setUserDetails] = useState({loggedIn:false});

    const [userDetails, dispatchDetails] = useReducer(detailsReducer, {loggedIn:false})



    return (
        //this line works with the basic state management
        //<testContext.Provider value={[userDetails, setUserDetails]}>
        <testContext.Provider value={{
            loggedIn:userDetails.loggedIn,
            dispatchDetails:dispatchDetails,

        }}>
            {props.children}
        </testContext.Provider>
    );
};

export default TestProvider;