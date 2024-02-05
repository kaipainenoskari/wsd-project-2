import * as userService from "../../services/userService.js"
import { bcrypt } from "../../deps.js";

const renderWithErrors = (render) => {
  render("login.eta", { validationError: "Credentials do not match." })
}

const processLogin = async ({ request, response, render, state }) => {
    const body = request.body({ type: "form" })
    const params = await body.value

    const userFromDatabase = await userService.findUserByEmail(params.get("email"))
    if (userFromDatabase.length !== 1) {
        renderWithErrors(render)
        return
    }

    const user = userFromDatabase[0];
    const passwordMatches = await bcrypt.compare(
      params.get("password"),
      user.password,
    );
  
    if (!passwordMatches) {
      renderWithErrors(render)
      return
    }
    await state.session.set("user", user);
    response.redirect("/topics");
}

const showLoginForm = ({ render }) => {
    render("login.eta");
};

export { processLogin, showLoginForm }