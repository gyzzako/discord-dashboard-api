import express, { Express } from "express";
import routes from "../routes";
import cors from "cors";
import session from "express-session";
import passport from "passport";
require("../strategies/discord");
import store from "connect-mongo";

export function createApp(): Express {
    const app = express();

    // Enable CORS
    app.use(cors({ origin: ["http://localhost:3000"], credentials: true }))

    // Enable parsing middleware for requests
    app.use(express.json());

    // Enable sessions
    app.use(session({
        secret: <string>process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60 * 24 // 1day
        },
        store: store.create({
            mongoUrl: <string>process.env.MONGODB_CONNECTION_STRING,
        })
    }));

    // Enable passport
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/api", routes);
    return app;
}
