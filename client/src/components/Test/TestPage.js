import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import { Container, Card, Button } from "react-bootstrap";

function Profile() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [result, setResult] = useState(null);

    const getAuthToken = async () => {
        if (!user) {
            return null;
        }
        return getAccessTokenSilently({});
    };

    const testAuthedRoute = async () => {
        const token = await getAuthToken();
        console.log(token);
        try {
            const response = await fetch("/api/withAuth", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json());
            console.log(response);
            setResult(response);
        } catch (err) {
            console.log(err);
            setResult(err);
        }
    };

    const testUnAuthedRoute = async () => {
        const response = await fetch("/api/noAuth").then((res) => {
            res.json();
            console.log(res);
        });
        console.log(response);
        setResult(response);
    };

    const getUserInfo = async () => {
        const token = await getAuthToken();
        console.log(token);
        try {
            const response = await fetch("/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json());
            console.log(response);
            // setResult(response);
        } catch (err) {
            console.log(err);
            // setResult(err);
        }
    };


    return (
        <>
            {user ? (
                <div>
                    <h1>{user.name}</h1>
                    <p><strong>Email: </strong>
                        {user.email} <br />
                        <strong>Id: </strong>
                        {user.sub}</p>
                </div>
            ) : (
                <div>Not logged in</div>
            )}
            <button onClick={testAuthedRoute}>Test Authed Route</button>{' '}
            <button onClick={testUnAuthedRoute}>Test Non Authed Route</button>{' '}
            <button onClick={getUserInfo}>Get User Info</button>{' '}
            <div>
                <h2>Result</h2>
                <div>
                    <pre>{JSON.stringify(result)}</pre>
                </div>
            </div>
        </>
    );
};

export default Profile;


// import React from "react";


// function Testing() {
//     return (
//         <div>
//             <h1>Woo hoo it worked!!</h1>
//         </div>
//     )
// };

// export default Testing;

// import React, { useState } from "react";
// // import { Button, Alert } from "reactstrap";
// // import { useAuth0 } from "@auth0/auth0-react";
// import config from "../../auth_config.json";

// const { apiOrigin = "http://localhost:3001" } = config;

// const ExternalApiComponent = () => {
//     const [state, setState] = useState({
//         showResult: false,
//         endpointMessage: "",
//         error: null
//     });

//     // const { loginWithPopup, getAccessTokenWithPopup } = useAuth0();

//     // const handleConsent = async () => {
//     //     try {
//     //         await getAccessTokenWithPopup();
//     //         setState({
//     //             ...state,
//     //             error: null
//     //         });
//     //     } catch (error) {
//     //         setState({
//     //             ...state,
//     //             error: error.error
//     //         });
//     //     }
//     // };

//     // const handleLoginAgain = async () => {
//     //     try {
//     //         await loginWithPopup();
//     //         setState({
//     //             ...state,
//     //             error: null
//     //         });
//     //     } catch (error) {
//     //         setState({
//     //             ...state,
//     //             error: error.error
//     //         });
//     //     }

//     //     await callPublicEndpoint();
//     // };

//     const callProtectedEndpoint = async () => {
//         return;
//     };

//     const callPublicEndpoint = async () => {
//         try {
//             const response = await fetch(`${apiOrigin}/api/public`);
//             const responseData = await response.json();
//             setState({
//                 ...state,
//                 showResult: true,
//                 endpointMessage: responseData
//             });
//         }
//         catch (error) {
//             setState({
//                 ...state,
//                 error: error.error
//             });
//         }
//     };

//     // const handle = (e, fn) => {
//     //     e.preventDefault();
//     //     fn();
//     // };

//     return (
//         <>
//             <div className="mb-5">


//                 <h1>External API</h1>
//                 <p>
//                     Ping an external API by clicking one of the buttons below. The private
//                     APIs will call the external API using an access token, and the API
//                     will validate it using the API's audience value.
//         </p>
//                 <div>
//                     <button color="primary" className="mt-5" onClick={callPublicEndpoint}>
//                         Ping Public Endpoint
//           </button>
//                 </div>
//                 <div>
//                     <button
//                         color="primary"
//                         className="mt-5"
//                         onClick={callProtectedEndpoint}
//                     >
//                         Ping Protected Endpoint
//           </button>
//                 </div>
//             </div>

//             <div className="result-block-container">
//                 {state.showResult && (
//                     <div className="result-block" data-testid="api-result">
//                         <h6 className="muted">Result</h6>
//                         {state.endpointMessage.msg}
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default ExternalApiComponent;