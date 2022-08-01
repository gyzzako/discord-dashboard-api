import passport from "passport";
import { Profile, Strategy } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import User from "../database/schemas/user"

passport.serializeUser((user: any, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id: string, done) => {
    try{
        const user = await User.findById(id);
        return user ? done(null, user) : done(null, null);

    }catch(err){
        console.error(err);
        return done(err, null);
    }
})

passport.use(new Strategy(
    {
    clientID: <string>process.env.DISCORD_CLIENT_ID,
    clientSecret: <string>process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ["identify", "email", "guilds"]
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        const { id: discordId } = profile;
        try{
            const existingUser = await User.findOneAndUpdate(
                { discordId },
                { accessToken, refreshToken },
                { new: true }
            );
        
            if(existingUser) return done(null, existingUser);
        
            const newUser = new User({ discordId, accessToken, refreshToken });
            const saveUser = await newUser.save();
            return done(null, saveUser);
        }catch(err){
            console.error(err);
            return done(err as any, undefined);
        }
    })
);