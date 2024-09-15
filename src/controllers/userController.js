import { userService } from "../services/userService.js";


async function signIn(req, res) {
  const { password, email } = req.body;


  try {
    const user = await userService.signIn({ email, password });
    res.status(200).send(user);
  } catch (err) {
    if (err.code === 404) return res.status(err.code).send(err.message);
    res.status(500).send(err.message);
  }
}


export { signIn };

