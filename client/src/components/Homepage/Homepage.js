import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Piechart from "../Piechart/Piechart";
import Barchart from "../Barchart/Barchart";
import Footer from "../Footer/Footer";
import { useAuth0 } from '@auth0/auth0-react';
import { Card, Col, Row, Container } from "react-bootstrap";
import "./homepage.css";

function Homepage() {
    // logout function
    const { logout } = useAuth0();

    // user information
    const { user, isAuthenticated } = useAuth0();

    // setting state 
    const [useritems, setUserItems] = useState([]);
    const [usergoals, setUserGoals] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState("");
    const [money, setMoney] = useState("");
    const [payCycle, setPayCycle] = useState("week");
    const [moneyToSave, setMoneyToSave] = useState(0);
    const [moneyLeftover, setMoneyLeftover] = useState(0);
    const [goalAllocationMap, setGoalAllocationMap] = useState({});

    // getting data from the api to display on screen specific to user only
    useEffect(() => {
        API.getExpensesById(user.sub)
            .then(res => {
                setUserItems(res.data);
                let getWeeklyExpenses = res.data.map(expense => {
                    return expense.weeklyExpense;
                });
                let addExpenses = getWeeklyExpenses.reduce(getSum, 2);
                setTotalExpenses(addExpenses);
            })
            .catch(err => console.log(err));
    }, [user.sub]);

    // getting sum of all of the weekly expenses
    function getSum(total, num) {
        return total + Math.round(num);
    }

    // getting savings data 
    useEffect(() => {
        API.getSavingsById(user.sub)
            .then(res => {
                setUserGoals(res.data);
                let goalMap = {};
                res.data.map(goal => {
                    return goalMap[goal._id] = 0
                });
                setGoalAllocationMap(goalMap);
            })
            .catch(err => console.log(err));
    }, [user.sub]);

    // function to set money value showing total expenses
    useEffect(() => {
        setMoney(totalExpenses);
    }, [totalExpenses]);

    // function to toggle total expenses based on pay cycle to suit users needs
    function toggleExpenses() {
        if (payCycle === "week") {
            setPayCycle("fortnight");
            setMoney(totalExpenses * 2);
        }
        else if (payCycle === "fortnight") {
            setPayCycle("month");
            setMoney(totalExpenses * 4);
        }
        else {
            setPayCycle("week");
            setMoney(totalExpenses);
        }
    }

    // getting saving data from api to set states ready for allocating savings
    const getMoney = () => {
        API.getIncomeById(user.sub)
            .then(res => {
                setMoneyToSave(res.data[0].totalSaving);
                setMoneyLeftover(res.data[0].totalSaving);
            })
            .catch(err => console.log(err));
    }

    // setting up array of saving allocations with unique id for each saving goal and ensuring NaN values count as zero
    function updateGoalAlloc(id, newValue) {
        let allocatedValue = 0;
        if (!newValue) {
            allocatedValue = 0;
        }
        else {
            allocatedValue = parseInt(newValue);
        }
        let newAllocationMap = { ...goalAllocationMap, [id]: allocatedValue }
        setGoalAllocationMap(newAllocationMap);
        getAllocation(newAllocationMap);
    }

    // getting each saving goal and adding to array to get total and ensuring NaN values count as zero
    function getAllocation(newAllocationMap) {
        let allocated = [];
        for (let value of Object.values(newAllocationMap)) {
            let setValue = 0;
            if (!value) {
                setValue = 0;
            }
            else {
                setValue = value;
            }
            allocated.push(parseInt(setValue));
        }
        let totalAllocation = allocated.reduce(getTotal);
        calcMoney(totalAllocation);
    }

    // getting total of allocated savings 
    function getTotal(acc, item) {
        return acc + item;
    }

    // subtracting total allocation away from initial saving amount
    function calcMoney(totalAllocation) {
        let moneyLeft = moneyToSave - totalAllocation;
        setMoneyLeftover(moneyLeft);
    }

    // rendering html on to screen providing user is authenticated
    return (
        isAuthenticated && (
            <div className="page">
                <Container>
                    <Row>
                        <Col>
                            <header>
                                <h1 id="welcomeUser">Welcome {user.name}</h1>
                                <button id="logoutBtn"
                                    onClick={() => logout()}>
                                    Logout
                                </button>
                            </header>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Text>
                                        Get started by inserting your income details in the profile tab!
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h2 className="homepageTitles">Expenses</h2>
                            <Piechart userExpenses={useritems} />
                        </Col>
                        <Col>
                            <div id="expenseInfo">
                                <Row>
                                    <Card>
                                        <Card.Body>
                                            <Card.Text>
                                                Insert all of your expenses in the expenses tab to see how you are spending your money in the pie chart
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>

                                <Row>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                Top Tip!
                                            </Card.Title>
                                            <Card.Text>
                                                In order to save enough money to pay off all your expenses, put away ${money} each {payCycle} <button onClick={() => toggleExpenses()}>Toggle</button>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row>
                                <h2 className="homepageTitles">Savings</h2>
                                <Card>
                                    <Card.Body>
                                        <Card.Text>
                                            Insert your saving goals in the savings tab to see your goals on the bar chart
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row>

                                <button id="showMeTheMoneyBtn" onClick={() => getMoney()}>Show me the money $$</button>
                                <div id="savingsAllocatorContainer">
                                    <p id="savingGoal">Your saving Goal: ${moneyLeftover}</p>
                                    {usergoals.map(goal => {
                                        return <div id="allocatorInput" key={goal._id}><label>{goal.goal}</label> <input placeholder="$" id={goal._id} onChange={(e) => updateGoalAlloc(goal._id, e.target.value)}></input></div>
                                    })}
                                </div>
                                <Card id="allocationInfo">
                                    <Card.Body>
                                        <Card.Text>
                                            Allocate your savings and watch the bar chart to see your money grow!
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Col>
                        <Col>
                            <div id="barchartPosition">
                                <Barchart userGoals={usergoals} goalAllocation={goalAllocationMap} />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        )
    );
}

export default Homepage;