import * as topicService from "../../services/topicService.js"
import * as questionService from "../../services/questionService.js"
import { validasaur } from "../../deps.js"

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)]
}

const getTopicData = async (request) => {
    const body = request.body({ type: "form" })
    const params = await body.value
    return {
        name: params.get("name")
    }
}

const addTopic = async ({ render, request, response, user }) => {
    const topicData = await getTopicData(request)
    const [passes, errors] = await validasaur.validate(topicData, topicValidationRules)

    if (!passes) {
        topicData.validationErrors = errors
        render("topics.eta", { topics: await topicService.listTopics(), user: user ? user : {}, topicData })
    } else {
        await topicService.addTopic(user.id, topicData.name)
        response.redirect("/topics")
    }
}

const listTopics = async ({ render, user }) => {
    render("topics.eta", { topics: await topicService.listTopics(), user: user ? user : {}, topicData: {} })
}

const listSingleTopic = async ({ render, params }) => {
    const id = params.id
    const questions = await questionService.listQuestions(id)
    render("topic.eta", { topic: await topicService.listSingleTopic(id), questions })
}

const deleteTopic = async ({ response, params }) => {
    const id = params.id
    await topicService.deleteTopic(id)
    response.redirect("/topics")
}

export { addTopic, listTopics, listSingleTopic, deleteTopic }