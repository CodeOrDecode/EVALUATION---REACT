import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useReducer } from "react";

let initialsin = {
  title: "",
  description: "",
  date:"",
  status: "",
};

function singlereducer(state, { type, payload }) {
  switch (type) {
    case "SUCCESS": {
      return payload;
    }
    default: {
      return state;
    }
  }
}

const Singletask = () => {
  const [getdata, dispatch] = useReducer(singlereducer, initialsin);

  const { title, description, status,date } = getdata;
  console.log(status);

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

  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <div  style={{margin:"20px 20px"}}>
      {title && <h2>Title is : {title}</h2>}
      {description && <h3>Description is : {description}</h3>}
      {date && <h3>Due date is : {date}</h3>}
    <h4>Status is : {status ? "Completed" : "Pending"}</h4>
    </div>
  );
};

export default Singletask;
