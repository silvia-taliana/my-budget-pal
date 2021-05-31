import "./pages.css"
import { Form, Container, Col, Row, Card } from "react-bootstrap";
import { useAuth0 } from '@auth0/auth0-react';
import API from "../utils/API"
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";

const payCycle = [
    {
        label: "Please select",
        value: "invalid",
    },
    {
        label: "Week",
        value: "Week",
    },
    {
        label: "Fortnight",
        value: "Fortnight",
    },
    {
        label: "Month",
        value: "Month",
    }
]

function Profile() {
    // setting state for income
    const [income, setIncome] = useState({});
    const [userincome, setUserIncome] = useState([]);

    // defining variable for user id
    let userId = "";

    // getting user information
    const { user, getAccessTokenSilently } = useAuth0();

    // handling form input 
    function handleInputChange(event) {
        const { name, value } = event.target;
        setIncome({ ...income, [name]: value })
    };

    // getting access token if user is logged in
    const getAuthToken = async () => {
        if (!user) {
            return null;
        }
        return getAccessTokenSilently({});
    };

    // authorizing access token and getting user id from token
    const getAuth = async () => {
        const token = await getAuthToken();
        try {
            const response = await fetch("/api/withAuth", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json());
            userId = response.user.sub;
            return "Authorized";
        } catch (err) {
            console.log(err);
        }
    };

    // function to submit form on click only if user is authorized
    const addIncomeFormHandler = async (event) => {
        event.preventDefault();
        const checkAuth = await getAuth();
        try {
            if (!income.payCycle || income.payCycle === "invalid") {
                console.log("not allowed");
            } else if (checkAuth === "Authorized" && income.income && income.payCycle && income.totalSaving) {
                API.createIncome({
                    income: income.income,
                    payCycle: income.payCycle,
                    totalSaving: income.totalSaving,
                    user_id: userId,
                }).then(console.log("income added!"), clearForm())
                    .catch(err => console.log(err));
            }
            else {
                console.log("please enter data")
            }
        } catch (err) {
            console.log(err);
        }
    }

    // function to clear form input 
    const clearForm = () => {
        document.getElementById("incomeForm").reset();
    }

    // getting data from the api to display on screen specific to user only
    useEffect(() => {
        API.getIncomeById(user.sub)
            .then(res => {
                setUserIncome(res.data);
            })
            .catch(err => console.log(err));
    }, [user.sub, userincome]);


    // returning html
    return (
        <div className="page">
            <Container>
                <Row>
                    <Col>
                        <h1 className="incomeTitles">Profile Page</h1>
                    </Col>
                </Row>

                <Form id="incomeForm">
                    <Row>
                        <Col>
                            <div className="incomeFormCol">
                                <Card id="incomeCard">
                                    <Card.Body>
                                        <Card.Text>
                                            Add your income details and total saving goal here!
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>

                        <Col>
                            <div className="incomeFormCol">
                                <Form.Group>
                                    <Form.Label>Income:</Form.Label>
                                    <Form.Control onChange={handleInputChange} name="income" placeholder="$"></Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Per:</Form.Label>
                                    <Form.Control as="select" onChange={handleInputChange} name="payCycle">
                                        {payCycle.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Total weekly saving goal:</Form.Label>
                                    <Form.Control onChange={handleInputChange} name="totalSaving" placeholder="$"></Form.Control>
                                </Form.Group>
                            </div>
                        </Col>

                        <Col>
                            <div className="incomeFormCol">
                                <Form.Group>
                                    <button onClick={addIncomeFormHandler}>Submit</button>
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                </Form>

                <Row>
                    <Col>
                        <h2 className="incomeTitles">Your details</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="incomeDetails">
                            <h3 className="incomeTitles">Income:</h3>
                            {userincome.map(income => {
                                return <p key={income._id}>${income.income} per {income.payCycle}</p>
                            })}
                        </div>
                    </Col>
                    <Col>
                        <div className="incomeDetails">
                            <h3 className="incomeTitles">Saving goal:</h3>
                            {userincome.map(income => {
                                return <p key={income._id}>${income.totalSaving} per week</p>
                            })}
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default Profile;