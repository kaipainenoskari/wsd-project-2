import * as topicService from "../../services/topicService.js"

const addTopic = async ({ request, response }) => {
    const body = request.body({ type: "form" })
    const params = await body.value

    response.redirect("/")
}

export { addTopic }