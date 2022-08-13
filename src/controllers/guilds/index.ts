import { Request, Response } from "express";
import { getMutualGuildsService, getGuildService } from "../../services/guilds";

export async function getGuildsController(req: Request, res: Response){
    try{
        const guilds = await getMutualGuildsService(req.user.id);
        res.send(guilds);
    }catch(err){
        console.error(err);
        res.sendStatus(400);
    }
}

export async function getGuildController(req: Request, res: Response){
    const { id } = req.params;
    try{
        const { data: guild } = await getGuildService(id);
        res.send(guild);
    }catch(err){
        console.error(err);
        res.sendStatus(400);
    }
}

export async function getGuildPermissions(req: Request, res: Response){
    try{
        const { id } = req.params;
        const guilds = await getMutualGuildsService(req.user.id);
        const hasPermission = guilds.some((guild) => guild.id === id);
        return hasPermission ? res.sendStatus(200) : res.sendStatus(403);
    }catch(err){
        console.error(err);
        res.sendStatus(400);
    }
}