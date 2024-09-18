import { userService } from "../services/userService.js";

async function listUser(req, res) {
  try {
    const users = await userService.findAll();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
}

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

async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await userService.create({ name, email, password });
    res.status(201).send(user);
  } catch (err) {
    if (err.code === 404) return res.status(err.code).send(err.message);
    res.status(500).send(err.message);
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await userService.remove({ id });
    res.status(200).send("Success deleted");
  } catch (err) {
    if (err.code === 404) return res.status(err.code).send(err.message);
    res.status(500).send(err.message);
  }
}

export { signIn, createUser, deleteUser };


async function updateUser(req, res) {
  const { user_id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await userService.update(user_id, name, email);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}