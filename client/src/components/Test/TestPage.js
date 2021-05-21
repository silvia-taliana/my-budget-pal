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
        } catch (err) {
            console.log(err);
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