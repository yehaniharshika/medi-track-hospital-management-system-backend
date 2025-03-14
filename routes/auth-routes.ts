import express from "express";
import jwt, {Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
import {createUser, verifyUserCredentials} from "../database/user-data-store";
import User from "../model/User";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
    console.log('Login')

    const username = req.body.username;
    const password = req.body.password;

    const user : User = {username, password};

    try{
        const isVerified =  await verifyUserCredentials(user);

        if(isVerified){
            const token = jwt.sign({ username }, process.env.SECRET_KEY as Secret, { expiresIn: "7d" });
            const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN as Secret, {expiresIn: "7d"});

            res.json({accessToken : token, refreshToken : refreshToken});
        }else{
            res.sendStatus(403).send('Invalid credentials')
        }
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})

//Register route
router.post("/register", async (req, res) => {
    console.log('Register', req.body);
    const {  name,username, password, role } = req.body;

    const user : User = {name, username, password, role};

    try{
        const registration = await createUser(user);
        res.status(201).json(registration);
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }

})

router.post("/refresh-token", async (req, res) => {
    const authHeader = req.headers.authorization;
    const refresh_token = authHeader?.split(' ')[1];

    if(!refresh_token)res.status(401).send('No token provided');

    try{
        const payload = jwt.verify(refresh_token as string, process.env.REFRESH_TOKEN as Secret) as {username: string, iat: number};
        const token = jwt.sign({ username: payload.username }, process.env.SECRET_KEY as Secret, {expiresIn: "1m"});
        res.json({accessToken : token});
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
})

// Authenticate Token Middleware
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    console.log("Token received: ", token);

    if (!token) {
        res.status(401).send('No token provided');
        return;
    }

    try {
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as { username: string, iat: number };
        console.log("User verified: ", payload.username);
        req.body.username = payload.username;
        next();  // Ensures execution continues only if verification succeeds
    } catch (err) {
        console.error("Token verification failed: ", err);
        res.status(403).send("Invalid or expired token");
        return;  // Ensures function stops execution
    }
}

export default router;