import * as topicService from "../../services/topicService.js"

const addTopic = async ({ request, response }) => {
    const body = request.body({ type: "form" })
    const params = await body.value

    await topicService.addTopic(1, params.get("name"))
    response.redirect("/topics")
}

const listTopics = async ({ render }) => {
    render("topics.eta", { topics: await topicService.listTopics() })
}

const listSingleTopic = async ({ render, params }) => {
    const id = params.id
    render("topic.eta", { topic: await topicService.listSingleTopic(id) })
}

const deleteTopic = async ({ response, params }) => {
    const id = params.id
    await topicService.deleteTopic(id)
    response.redirect("/topics")
}

export { addTopic, listTopics, listSingleTopic, deleteTopic }