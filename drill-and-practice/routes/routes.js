import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js"
import * as questionController from "./controllers/questionController.js"
import * as optionController from "./controllers/optionController.js"
import * as quizController from "./controllers/quizController.js"

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listTopics)
router.post("/topics", topicController.addTopic)

router.get("/topics/:id", topicController.listSingleTopic)
router.post("/topics/:id/delete", topicController.deleteTopic)

router.post("/topics/:id/questions", questionController.addQuestion)
router.get("/topics/:id/questions/:qId", questionController.listSingleQuestion)
router.post("/topics/:id/questions/:qId/delete", questionController.deleteQuestion)

router.post("/topics/:id/questions/:qId/options", optionController.addOption)
router.post("/topics/:id/questions/:qId/options/:oId/delete", optionController.deleteOption)

router.get("/auth/register", registrationController.showRegistrationForm)
router.post("/auth/register", registrationController.registerUser)

router.get("/auth/login", loginController.showLoginForm)
router.post("/auth/login", loginController.processLogin)

router.get("/quiz", quizController.showTopics)
router.get("/quiz/:tId", quizController.showRandomQuestion)

router.get("/quiz/:tId/questions/:qId", quizController.showQuestion)
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.addAnswer)

router.get("/quiz/:tId/questions/:qId/correct", quizController.correctAnswer)
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.incorrectAnswer)

router.get("/api/questions/random", quizController.apiRandomQuestion)
router.post("/api/questions/answer", quizController.apiAnswerQuestion)

export { router };
