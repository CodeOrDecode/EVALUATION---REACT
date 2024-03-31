import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useReducer } from "react";
import { useToast } from "@chakra-ui/react";

let initialsin = {
  title: "",
  description: "",
  date: "",
  status: "",
};

function singlereducer(state, { type, payload }) {
  switch (type) {
    case "SUCCESS": {
      return payload;
    }

    case "TITLE": {
      return {
        ...state,
        title: payload,
      };
    }

    case "DESCRIPTION": {
      return {
        ...state,
        description: payload,
      };
    }
    case "DATE": {
      return {
        ...state,
        date: payload,
      };
    }
    case "STATUS": {
      return {
        ...state,
        status: payload,
      };
    }

    default: {
      return state;
    }
  }
}
const Edit = () => {
  const [getdata, dispatch] = useReducer(singlereducer, initialsin);
  const toast = useToast();

  const { title, description, status, date } = getdata;
  console.log(getdata);

  const { id } = useParams();

  async function getSingleData() {
    try {
      let { data } = await axios({
        method: "get",
        url: `http://localhost:8080/todos/${id}`,
      });
      dispatch({ type: "SUCCESS", payload: data });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function showtoast() {
    toast({
      title: "Todo edit is done.",
      description: "Go to Home page to see it.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  async function handleEdit(id) {
    try {
      let obj = {
        title: title,
        description: description,
        status: status,
        date: date,
      };
      let res = await axios({
        method: "put",
        url: `http://localhost:8080/todos/${id}`,
        data: obj,
      });
      showtoast();
      getSingleData();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleData();
  }, []);
  return (
    <div style={{ margin: "20px 20px" }}>
      {/* {title && <h2>Title is : {title}</h2>}
      {description && <h3>Description is : {description}</h3>}
      <h4>Status is : {status ? "Completed" : "Pending"}</h4> */}

      <input
        type="text"
        value={title}
        onChange={(e) => {
          dispatch({ type: "TITLE", payload: e.target.value });
        }}
        style={{ border: "1px solid black" }}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => {
          dispatch({ type: "DESCRIPTION", payload: e.target.value });
        }}
        style={{ border: "1px solid black", marginLeft: "12px" }}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => {
          dispatch({ type: "DATE", payload: e.target.value });
        }}
        style={{ border: "1px solid black", marginLeft: "12px" }}
      />

      <input
        type="checkbox"
        checked={status}
        onChange={(e) => {
          dispatch({ type: "STATUS", payload: e.target.checked });
        }}
        style={{ marginLeft: "12px" }}
      />
      <button
        onClick={() => {
          handleEdit(id);
        }}
        style={{
          border: "1px solid black",
          padding: "4px 12px",
          marginLeft: "12px",
        }}
      >
        Edit Todo
      </button>
    </div>
  );
};

export default Edit;
