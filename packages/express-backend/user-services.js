import mongoose from "mongoose";
import User from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = User.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else if (job && name) {
    promise = findUserByNameandJob(name, job);
  }
  return promise;
}

function deleteUser(id){
    return User.findByIdAndDelete(id);
}

function findUserById(id) {
  return User.findById(id);
}

function findUserByNameandJob(name, job){
    return User.find({name: name, job: job});
}

function addUser(user) {
  const userToAdd = new User(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return User.find({ name: name });
}

function findUserByJob(job) {
  return User.find({ job: job });
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUser,
  findUserByNameandJob,
};