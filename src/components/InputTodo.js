import React, { Fragment, useState } from "react";
import axios from "axios";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/todos", {
        description,
      });

      window.location = "/";
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Input Todo</h1>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <form className="d-flex" onSubmit={onSubmitForm}>
          <input
            type="text"
            placeholder="Add todo"
            className="form-control"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button className="btn btn-success">Add</button>
        </form>
      )}
    </Fragment>
  );
};

export default InputTodo;
