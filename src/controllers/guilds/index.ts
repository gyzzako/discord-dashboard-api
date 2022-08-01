import { Request, Response } from "express";
import { getBotGuilds } from "../../services/guilds";

export async function getGuilds(req: Request, res: Response){
    try{
        const { data } = await getBotGuilds();
        res.send(data);
    }catch(err){
        console.error(err);
        res.sendStatus(400);
    }
}