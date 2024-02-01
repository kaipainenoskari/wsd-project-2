import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js"

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listTopics)
router.post("/topics", topicController.addTopic)

export { router };
