import { Router } from "express";
import passport from "passport";
import { User } from "../../database/schemas/user";

const router = Router();

router.get("/discord", passport.authenticate('discord'), (req, res) => {
    res.sendStatus(200);
});

router.get("/discord/redirect", passport.authenticate('discord'), (req, res) => {
    res.sendStatus(200);
});

router.get("/status", (req, res) => {
    if(req.user){
        const user = req.user as Express.User & User;
        res.send({discordId: user.discordId})
     }else{
        res.sendStatus(401);
     } 
});

export default router;