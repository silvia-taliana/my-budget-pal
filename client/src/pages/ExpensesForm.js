import { useAuth0 } from '@auth0/auth0-react';
import API from "../utils/API"
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import "./pages.css"
import { Form, Container, Col, Row, Card } from "react-bootstrap";

// setting up array of options for categories
const catOptions = [
    {
        label: "Please select",
        value: "invalid",
    },
    {
        label: "Food",
        value: "food",
    },
    {
        label: "Bills",
        value: "bills",
    },
    {
        label: "Commute",
        value: "commute",
    },
    {
        label: "Other",
        value: "other",
    }
];

// setting up array of options for frequency
const freqOptions = [
    {
        label: "Please select",
        value: "invalid",
    },
    {
        label: "Weekly",
        value: "weekly",
    },
    {
        label: "Fortnightly",
        value: "fortnightly",
    },
    {
        label: "Monthly",
        value: "monthly",
    },
    {
        label: "Quaterly",
        value: "quaterly",
    },
    {
        label: "Yearly",
        value: "yearly",
    },
];

function ExpensesForm() {
    // setting state for expenses
    const [items, setItems] = useState({});
    const [useritems, setUserItems] = useState([]);

    // defining variable for user id
    let userId = "";

    // defining variable for weekly expense
    let weeklyExpense = "";

    // getting user information
    const { user, getAccessTokenSilently } = useAuth0();

    // handling form input 
    function handleInputChange(event) {
        const { name, value } = event.target;
        setItems({ ...items, [name]: value })
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

    // function to calculate weekly expense to get values for pie chart
    function calcWeeklyExpenses() {
        if (items.frequency === "fortnightly") {
            let weekly = items.amount / 2;
            return weeklyExpense = weekly;
        }
        else if (items.frequency === "monthly") {
            let weekly = items.amount / 4;
            return weeklyExpense = weekly;
        }
        else if (items.frequency === "quaterly") {
            let weekly = items.amount / 12;
            return weeklyExpense = weekly;
        }
        else if (items.frequency === "yearly") {
            let weekly = items.amount / 52;
            return weeklyExpense = weekly;
        }
        else {
            return weeklyExpense = items.amount;
        }
    }

    // function to submit form on click only if user is authorized
    const addExpenseFormHandler = async (event) => {
        event.preventDefault();
        calcWeeklyExpenses(items.frequency);
        const checkAuth = await getAuth();
        try {
            if (!items.frequency || items.frequency === "invalid" || !items.category || items.category === "invalid") {
                console.log("not allowed");
            } else if (checkAuth === "Authorized" && items.type && items.category && items.amount && items.frequency) {
                API.createExpense({
                    type: items.type,
                    category: items.category,
                    amount: items.amount,
                    frequency: items.frequency,
                    user_id: userId,
                    weeklyExpense: weeklyExpense,
                }).then(console.log("expense added!"), clearForm())
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
        document.getElementById("expensesForm").reset();
    }

    // function to delete expense by id
    function deleteExpense(id) {
        API.deleteExpense(id)
            .then(res => console.log("expense deleted"))
            .catch(err => console.log(err));
    }

    // getting data from the api to display on screen specific to user only
    useEffect(() => {
        API.getExpensesById(user.sub)
            .then(res => {
                setUserItems(res.data);
            })
            .catch(err => console.log(err));
    }, [user.sub, useritems]);

    // returning html
    return (
        <div className="page">
            <Container>
                <Row>
                    <Col>
                        <h1 className="expensesTitles">Add Expenses</h1>
                    </Col>
                </Row>

                <Form id="expensesForm">
                    <Row>
                        <Col>
                            <div className="expensesFormCol">

                                <Card id="expenseCard">
                                    <Card.Body>
                                        <Card.Text>
                                            Add your expenses here!
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                                <Form.Group>
                                    <Form.Label>Expense type:</Form.Label>
                                    <Form.Control
                                        onChange={handleInputChange}
                                        name="type"
                                        placeholder="e.g. Elictricity bill">
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Category:</Form.Label>
                                    <Form.Control as="select" name="category" value={items.category} onChange={handleInputChange}>
                                        {catOptions.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </Col>

                        <Col>
                            <div className="expensesFormCol">
                                <Form.Group>
                                    <Form.Label>Amount:</Form.Label>
                                    <Form.Control
                                        onChange={handleInputChange}
                                        name="amount"
                                        placeholder="$">
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Frequency:</Form.Label>
                                    <Form.Control as="select" name="frequency" value={items.frequency} onChange={handleInputChange}>
                                        {freqOptions.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </Col>

                        <Col>
                            <div className="expensesFormCol">
                                <Form.Group>
                                    <button onClick={addExpenseFormHandler}>Add Expense</button>
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                </Form>

                <h2 className="expensesTitles">Expenses List</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Category</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Frequency</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {useritems.map(useritem => {
                            return (
                                <tr key={useritem._id}>
                                    <th scope="row">{useritem.type} </th>
                                    <td>{useritem.category}</td>
                                    <td>{useritem.amount}</td>
                                    <td>{useritem.frequency}</td>
                                    <td><button onClick={() => deleteExpense(useritem._id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Container>
            <Footer />
        </div>
    );
}

export default ExpensesForm;