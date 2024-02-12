import { assertEquals } from "https://deno.land/std@0.202.0/testing/asserts.ts";
import * as topicService from "../services/topicService.js";
import * as questionService from "../services/questionService.js";
import * as optionService from "../services/optionService.js";
import * as mainController from "../routes/controllers/mainController.js";

let testTopicId = 0;
let questionId = 0;
let optionId = 0;

Deno.test({
    name: "Main Page",
    async fn () {
        const ctx = { render: () => {} };
        await mainController.showMain(ctx);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test("Add Topic", async () => {
    const topics = await topicService.listTopics();
    const lengthBefore = topics.length;
    await topicService.addTopic(1, "Test Topic");
    const testTopic = await topicService.listSingleTopicWithName("Test Topic");
    testTopicId = testTopic.id;
    const newTopics = await topicService.listTopics();
    await assertEquals(newTopics.length, lengthBefore + 1);
});

Deno.test("Add Question", async () => {
    const questions = await questionService.listQuestions(testTopicId);
    const lengthBefore = questions.length;
    await questionService.addQuestion(1, testTopicId, "Test Question");
    const testQuestion = (await questionService.listQuestionWithText("Test Question"))[0];
    questionId = testQuestion.id;
    const newQuestions = await questionService.listQuestions(testTopicId);
    await assertEquals(newQuestions.length, lengthBefore + 1);
});

Deno.test("Add option", async () => {
    const options = await optionService.listOptions(questionId);
    const lengthBefore = options.length;
    await optionService.addOption(questionId, "Test Option", true);
    const testOption = (await optionService.listOptionWithText("Test Option"))[0];
    optionId = testOption.id;
    const newOptions = await optionService.listOptions(questionId);
    await assertEquals(newOptions.length, lengthBefore + 1);
});

Deno.test("Delete Option", async () => {
    const options = await optionService.listOptions(questionId);
    const lengthBefore = options.length;
    await optionService.deleteOption(optionId);
    const newOptions = await optionService.listOptions(questionId);
    await assertEquals(newOptions.length, lengthBefore - 1);
});

Deno.test("Delete Question", async () => {
    const questions = await questionService.listQuestions(testTopicId);
    const lengthBefore = questions.length;
    await questionService.deleteQuestion(questionId);
    const newQuestions = await questionService.listQuestions(testTopicId);
    await assertEquals(newQuestions.length, lengthBefore - 1);
});

Deno.test("Delete Topic", async () => {
    const topics = await topicService.listTopics();
    const lengthBefore = topics.length;
    await topicService.deleteTopic(testTopicId);
    const newTopics = await topicService.listTopics();
    await assertEquals(newTopics.length, lengthBefore - 1);
});

Deno.test("Added Topic is correct", async () => {
    await topicService.addTopic(1, "Topic name");
    const testTopic = await topicService.listSingleTopicWithName("Topic name");
    testTopicId = testTopic.id;
    await assertEquals(testTopic.name, "Topic name");
});

Deno.test("Added Question is correct", async () => {
    await questionService.addQuestion(1, testTopicId, "Question name");
    const testQuestion = (await questionService.listQuestionWithText("Question name"))[0];
    questionId = testQuestion.id;
    await assertEquals(testQuestion.question_text, "Question name");
});

Deno.test("Added Option is correct", async () => {
    await optionService.addOption(questionId, "Test Option", true);
    const testOption = (await optionService.listOptionWithText("Test Option"))[0];
    await assertEquals(testOption.option_text, "Test Option");
});

Deno.test("Deleting topic deletes questions and options too", async () => {
    await topicService.deleteTopic(testTopicId);
    const testTopic = await topicService.listSingleTopic(testTopicId);
    const testQuestion = (await questionService.listSingleQuestion(testTopicId, questionId))[0];
    const testOption = (await optionService.listOption(optionId))[0];
    await assertEquals(testTopic, undefined);
    await assertEquals(testQuestion, undefined);
    await assertEquals(testOption, undefined);
});