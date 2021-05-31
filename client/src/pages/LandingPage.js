import React from "react";
import "./pages.css"
import { Container, Col, Row, Card } from "react-bootstrap";
import Login from "../components/Login/Login";
import Homepage from "../components/Homepage/Homepage"
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "../components/Loading/Loading";
import Footer from "../components/Footer/Footer";
import BarchartImg from "./assets/barchart.jpg";
import PiechartImg from "./assets/piechart.jpg";

function LandingPage() {

    // if page is loading, the loading component will be rendered, once loaded, the page will return
    const { isLoading, error, isAuthenticated } = useAuth0();

    if (error) {
        return <div>Oops... {error.message}</div>;
    }
    else if (isLoading) {
        return <Loading />;
    }

    // conditionally rendering components based on if the user is logged in/out
    if (isAuthenticated === false) {
        return (
            <div className="page">
                <Container>
                    <Row id="welcomeLoginContainer">
                        <Col>
                            <div className="welcomeLogin">
                                <h1 id="welcomeTitle">Welcome</h1>
                            </div>
                        </Col>
                        <Col>
                            <div className="welcomeLogin">
                                <Login />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className="welcomePageAppInfo">
                                <Card id="expensesInfo">
                                    <Card.Body>
                                        <Card.Title>
                                            Visualise your expenses!
                                    </Card.Title>
                                        <Card.Text>
                                            My Budget Pal makes it easy to see where and how you are using your money so you can create better spending habits
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        <Col>
                            <div className="welcomePageAppInfo">
                                <img className="welcomeScreenImg" src={PiechartImg} alt="piechart" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className="welcomePageAppInfo">
                                <img className="welcomeScreenImg" src={BarchartImg} alt="barchart" />
                            </div>
                        </Col>
                        <Col>
                            <div className="welcomePageAppInfo">
                                <Card id="savingsInfo">
                                    <Card.Body>
                                        <Card.Title>
                                            Watch your money grow!
                                    </Card.Title>
                                        <Card.Text>
                                            Allocate your savings where you want them to reach your goals faster
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        )
    }
    else {
        return (
            <Homepage />
        )
    }
}

export default LandingPage;
