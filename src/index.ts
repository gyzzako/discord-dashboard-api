import { config } from "dotenv";
config();
import { createApp } from "./utils/createApp";
import "./database"

const PORT = process.env.PORT ?? 3001;

async function main(){
    console.log(`Running in ${process.env.ENVIRONMENT} mode.`)

    try{
        const app = createApp();
        app.listen(PORT, () => console.log(`Running on ${PORT}`));
    }catch(err){
        console.error(err);
    }
}

main();