import { Router } from "express";
import { isAuthenticated } from "../../middlewares/authentification";
import { getGuilds } from "../../controllers/guilds";

const router = Router();

router.get("/", isAuthenticated, getGuilds);

export default router;