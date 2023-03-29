const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const pool = require("./db");

/******MIDDLEWARE******/
app.use(cors());
app.use(express.json());
/****************/

/*ROUTES*/

//Get all todos

app.get("/todos", async (req, res) => {
  try {
    const getAllTodos = await pool.query("SELECT * FROM todo");
    res.json(getAllTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getOneTodo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json(getOneTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//edit a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("The todo was uppdated");
  } catch (error) {
    console.log(error.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json("Todo was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
