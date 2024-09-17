import { prisma } from "../data/db.js";
import bcrypt from "bcrypt";
import { Error } from "mongoose";


async function signIn({ email, password }) {
  const user = await prisma.user.findFirst({ where: { email } });


  if (!user) throw { message: "User not the found!", code: 404 };


  const verifyUser = await bcrypt.compare(password, user.password);
  if (!verifyUser) throw new Error();


  return Object.defineProperty(user, "password", {
    enumerable: false,
  });
}

async function create({ name, email, password }) {
  const newUser = await prisma.user.create({
    data:{
      name: name,
      email:email,
      password:password,
    }});
  return newUser
}

async function remove({ id }) {
  const user = await prisma.user.findFirst({ where: { id } });
  if (!user) throw { message: "User not the found!", code: 404 };

  return prisma.user.delete({where: {id}});
}


export const userService = {
  create,
  // findAll,
  remove,
  // find,
  // update,
  signIn,
};