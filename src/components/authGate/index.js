import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import App from "../../App";

const AuthGate = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const authState = {
        user: user,
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        getToken: getAccessTokenSilently,
    }

    return (
        <App authState={authState} />
        // <div style={{ width: "15rem" }}>
        //     {/* <div className='mh-100 align-self-center'> */}
        //     <img
        //         style={{ width: "8rem" }}
        //         className='card-img-top rounded-circle'
        //         src={user.picture}
        //         alt={user.name} />
        //     {/* </div> */}
        //     <div className='d-flex flex-column justify-content-center p-3'>
        //         <h2>{user.name}</h2>
        //         <p>{user.email}</p>
        //     </div>
        //     <p className='text-left'>
        //         A developer with a passion for blah blah blah
        //     </p>
        // </div>
    );
};

export default AuthGate;