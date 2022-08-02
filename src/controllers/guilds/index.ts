import { Request, Response } from "express";
import { getMutualGuilds } from "../../services/guilds";

export async function getGuilds(req: Request, res: Response){
    try{
        const guilds = await getMutualGuilds(req.user.id);
        res.send({guilds});
    }catch(err){
        console.error(err);
        res.sendStatus(400);
    }
}