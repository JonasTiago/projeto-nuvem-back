import { prisma } from "../data/db.js";
import bcrypt from "bcrypt";
import { Error } from "mongoose";

async function findAll() {
  return await userCollection.find({}).project({ password: 0 }).toArray();
}

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

async function update(id, name, email) {

  const userId = ObjectId.createFromHexString(id);

  const user = await userCollection.findOne({ _id: userId });
  if (!user) throw { message: "User not found!", code: 404 };
 
  if(email){
    const emailexit = await userCollection.findOne({ email })
    if(emailexit) throw { message: "Email já usado!", code: 409 };
  } else {
    email = user.email 
  } 

  if(!name) name = user.name 

  return await userCollection.updateOne({ _id: userId }, { $set: { name, email } });
}

async function find(id) {
  const userId = ObjectId.createFromHexString(id);

  const user = await userCollection.findOne({ _id: userId });
  if (!user) throw { message: "User not found!", code: 404 };

  return Object.defineProperty(user, "password", {
    enumerable: false,
  });
}