import React from "react";
import style from "../Css/Showtodo.module.css";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Showtodo = ({ title, description, status, id, todoData,date }) => {
  const navigate = useNavigate();
  async function deletetodo(id) {
    try {
      let res = await axios({
        method: "delete",
        url: `http://localhost:8080/todos/${id}`,
      });
      console.log("done");
      todoData();
    } catch (error) {
      console.log(error);
    }
  }

  function handlegoto(id) {
    navigate(`/task/${id}`);
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  return (
    <div className={style.smailldiv}>
      <h2>Title is : {title}</h2>
      <h3>Description is : {description}</h3>
      <h3>Due date : {date}</h3>

      <h4>Status is : {status ? "Completed" : "Pending"}</h4>
      <Button
        colorScheme="blue"
        onClick={() => {
          handlegoto(id);
        }}
      >
        Details
      </Button>
      <Button
        colorScheme="blue"
        style={{ marginLeft: "16px" }}
        onClick={() => {
          deletetodo(id);
        }}
      >
        Delete Todo
      </Button>

      <Button
        colorScheme="blue"
        style={{ marginLeft: "16px" }}
        onClick={() => {
          handleEdit(id);
        }}
      >
        Edit Todo
      </Button>
    </div>
  );
};

export default Showtodo;
