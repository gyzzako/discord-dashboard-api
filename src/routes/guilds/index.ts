import { Router } from "express";
import { isAuthenticated } from "../../middlewares/authentification";
import { getGuildsController, getGuildController, getGuildPermissions } from "../../controllers/guilds";
import { discordApiTimeout } from "../../utils/helpers"

const router = Router();

router.get("/", isAuthenticated, discordApiTimeout, getGuildsController);

router.get("/:id/permissions", isAuthenticated, getGuildPermissions);

router.get("/:id", isAuthenticated, getGuildController);


export default router;