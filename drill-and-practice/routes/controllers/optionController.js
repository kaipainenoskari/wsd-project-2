import { validasaur } from "../../deps.js";
import * as questionService from "../../services/questionService.js"
import * as optionService from "../../services/optionService.js"

const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)]
}

const getOptionData = async (request, params) => {
    const body = request.body({ type: "form" })
    const bodyParams = await body.value
    return {
        option_text: bodyParams.get("option_text"),
        is_correct: bodyParams.get("is_correct") ? true : false,
        id: params.id,
        qId: params.qId
    }
}

const addOption = async ({ request, response, params, render }) => {
    const optionData = await getOptionData(request, params)
    const [passes, errors] = await validasaur.validate(optionData, optionValidationRules)

    if (!passes) {
        optionData.validationErrors = errors
        render("question.eta", { question: await questionService.listSingleQuestion(optionData.id, optionData.qId) })
    } else {
        await optionService.addOption(optionData.qId, optionData.option_text, optionData.is_correct)
        response.redirect(`/topics/${optionData.id}/questions/${optionData.qId}`)
    }
}

const deleteOption = async ({ response, params }) => {
    const optionID = params.oId
    const topicID = params.id
    const questionID = params.qId
    await optionService.deleteOption(optionID)
    response.redirect("/topics/" + topicID + "/questions/" + questionID)
}

export { addOption, deleteOption }