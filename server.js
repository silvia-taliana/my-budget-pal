// getting dependencies and routes 
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.API_PORT || 3001;
// const hbs = exphbs.create({ helpers });
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require("dotenv").config();
const fetch = require('node-fetch');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// function to check if user is authorized 
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN,
    algorithms: ['RS256'],
});

// test route - getting information that doesnt require authorization
app.get("/api/noAuth", (req, res) => {
    console.log("we hit the no auth route woooo!");
    // res.send({ msg: "the no auth button worked!" });
    res.json({ result: "Response Success" });
});

// test route - getting information requiring authorization
app.get("/api/withAuth", checkJwt, (req, res) => {
    console.log(req.user);
    // res.send({ msg: "the auth button worked!" });
    res.json({ result: "Authed successfully", user: req.user });
});

// test route - getting user information with authorization 
app.get("/api/user", checkJwt, async (req, res) => {
    console.log("made it this far");
    const result = await fetch(`${process.env.AUTH0_DOMAIN}userinfo`, {
        headers: { Authorization: req.headers.authorization }
    }).then(res => res.json());
    console.log(result);
    // res.send({ msg: "the get user button worked!" });
    res.json({ result: "Authed successfully", userInfo: result });
});

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mybudgetpal",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

// testing to make sure database connection is working 
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// sending static file to app if no routes are hit
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});