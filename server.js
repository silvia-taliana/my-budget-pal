// getting dependencies and routes 
// require('dotenv').config();
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

// const cors = require("cors");
// const morgan = require("morgan");
// const helmet = require("helmet");
// const authConfig = require("./client/src/auth_config.json");

// const appPort = process.env.SERVER_PORT || 3001;
// const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

// Add routes, both API and view
app.use(routes);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// if (!authConfig.domain || !authConfig.audience) {
//     throw new Error(
//         "Please make sure that auth_config.json is in place and populated"
//     );
// }

// app.use(morgan("dev"));
// app.use(helmet());
// app.use(cors({ origin: appOrigin }));

// app.get("/api/public", (req, res) => {
//     res.send({
//         msg: "You called the public API!"
//     });
// });

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: [process.env.AUTH0_DOMAIN],
    algorithms: ['RS256'],
});

app.get("/api/noAuth", (req, res) => {
    console.log("we hit the no auth route woooo!");
    res.send({ msg: "the no auth button worked!" })
    res.json({ result: "Response Success" });
});

app.get("/api/withAuth", checkJwt, (req, res) => {
    console.log(req.user);
    res.json({ result: "Authed successfully", user: req.user });
});

app.get("/api/user", checkJwt, async (req, res) => {
    console.log("made it this far");
    const result = await fetch(`${process.env.AUTH0_DOMAIN}userinfo`, {
        headers: { Authorization: req.headers.authorization }
    }).then(res => res.json());
    console.log(result);
    res.json({ result: "Authed successfully", userInfo: result });
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mybudgetpal",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});