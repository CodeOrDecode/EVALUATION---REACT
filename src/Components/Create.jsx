import React from "react";
import { useReducer } from "react";
import { Input } from "@chakra-ui/react";
import axios from "axios";
let initialdataadd = {
  title: "",
  description: "",
  date:"",
  status: false,
};

function todoreduceradd(state, { type, payload }) {
  switch (type) {
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

    case "RESET": {
      return initialdataadd;
    }

    default: {
      return state;
    }
  }
}

const Create = () => {
  const [addtododata, dispatch] = useReducer(todoreduceradd, initialdataadd);
  const { title, description, status,date } = addtododata;

  async function addtodotoall() {
    let obj = { title: title, description: description, status: status,date:date };
    try {
      let res = await axios({
        method: "post",
        url: "http://localhost:8080/todos",
        data: obj,
      });
      dispatch({ type: "RESET" });
      console.log("done");
    } catch (error) {
      console.log("error");
    }
  }

  function handleAdd() {
    addtodotoall();
  }
  return (
    <div>
      <input
        type="text"
        style={{border:"1px solid black"}}
        placeholder="title"
        value={title}
        onChange={(e) => {
          dispatch({ type: "TITLE", payload: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        style={{border:"1px solid black",marginLeft:"14px" , marginRight:"14px"}}
        onChange={(e) => {
          dispatch({ type: "DESCRIPTION", payload: e.target.value });
        }}
      />
      <input
        type="checkbox"
        checked={status}
        onChange={(e) => {
          dispatch({ type: "STATUS", payload: e.target.checked });
        }}
      />

      <input type="date"    style={{border:"1px solid black",marginLeft:"14px" , marginRight:"14px"}} value={date}  onChange={(e) => {
          dispatch({ type: "DATE", payload: e.target.value });
        }} />
      <button style={{border:"1px solid black",padding:"4px 12px", marginLeft:"14px"}} onClick={handleAdd}>Add</button>
    </div>
  );
};

export default Create;
