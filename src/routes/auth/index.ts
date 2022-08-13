import { Router } from "express";
import passport from "passport";
import { isAuthenticated } from "../../middlewares/authentification";
import { User } from "../../database/schemas/user";

const router = Router();

router.get("/discord", passport.authenticate('discord'), (req, res) => {
    res.sendStatus(200);
});

router.get("/discord/redirect", passport.authenticate('discord'), (req, res) => {
    res.redirect("http://localhost:3000/menu");
});

router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect("http://localhost:3000");
    });
  });

router.get("/is-authenticated", isAuthenticated, (req, res) => {
    if(req.user){
        res.sendStatus(200);
     }else{
        res.sendStatus(401);
     } 
});

export default router;