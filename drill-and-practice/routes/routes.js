import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js"
import * as questionController from "./controllers/questionController.js"
import * as optionController from "./controllers/optionController.js"

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listTopics)
router.post("/topics", topicController.addTopic)

router.get("/topics/:id", topicController.listSingleTopic)
router.post("/topics/:id/delete", topicController.deleteTopic)

router.post("/topics/:id/questions", questionController.addQuestion)
router.get("/topics/:id/questions/:qId", questionController.listSingleQuestion)

router.post("/topics/:id/questions/:qId/options", optionController.addOption)

router.get("/auth/register", registrationController.showRegistrationForm)
router.post("/auth/register", registrationController.registerUser)

router.get("/auth/login", loginController.showLoginForm)
router.post("/auth/login", loginController.processLogin)

export { router };
