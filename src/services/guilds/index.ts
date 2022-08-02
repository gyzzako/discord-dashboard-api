import axios from "axios";
import User from "../../database/schemas/user"
import { DISCORD_API_URL } from "../../utils/constants";
import { PartialGuild } from "../../utils/types";

export function getBotGuilds(){
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
    });
}

export async function getUserGuilds(id: string){
    const user = await User.findById(id);
    if(!user) throw new Error("No user found");

    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
    });
}

export async function getMutualGuilds(id: string){
    const { data: botGuilds } = await getBotGuilds();
    const { data: userGuilds } = await getUserGuilds(id);

    const adminUserGuilds = userGuilds.filter(({ permissions }) => (parseInt(permissions) & 0x8) === 0x8);
    const mutualGuilds = adminUserGuilds.filter((guild) => botGuilds.some((botguild) => botguild.id === guild.id));
    return mutualGuilds;
}