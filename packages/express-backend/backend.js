import express from "express";
import cors from "cors";
const app = express();
const port = 8000;
import userServices from "./user-services.js";

app.use(cors());
app.use(express.json());


const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async(req, res) => {
    const {name, job} = req.query;
    const users = await userServices.getUsers(name, job);
    res.send({ users_list: users });
  });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
  
app.post("/users", async(req, res) => {
    const userToAdd = {
      name: req.body.name,
      job: req.body.job
    }
    try {
      const addedUser = await userServices.addUser(userToAdd);
      res.status(201).send(addedUser);
    }
    catch(error) {
      res.status(500).send();
    }
});

app.delete("/users/:id", async(req, res) => {
  const id = req.params.id; 
  try{
    const deleteUser = await userServices.deleteUser(id);
    if (!deleteUser) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(204).send(deleteUser);
    }
  }catch (error) {
    res.status(500).send({ message: 'Error deleting user', error: error });
  }
});