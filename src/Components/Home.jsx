import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useReducer } from "react";
import Loading from "./Loading";
import Error from "./Error";
import Showtodo from "./Showtodo";
import { useState } from "react";
import { Select } from "@chakra-ui/react";

let initialdata = {
  loading: false,
  error: false,
  alldata: [],
  status: "Status",
  date: "Sort",
};

function todoreducer(state, { type, payload }) {
  switch (type) {
    case "LOADING": {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case "ERROR": {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case "STATUS": {
      return {
        ...state,
        status: payload,
      };
    }

    case "DATESORT": {
      return {
        ...state,
        date: payload,
      };
    }

    case "SUCCESS": {
      return {
        ...state,
        alldata: payload,
        loading: false,
        error: false,
      };
    }

    default: {
      return state;
    }
  }
}

const Home = () => {
  const [tododata, dispatch] = useReducer(todoreducer, initialdata);

  const { loading, error, alldata, status, date } = tododata;
  async function todoData() {
    dispatch({ type: "LOADING" });

    try {
      let { data } = await axios({
        method: "get",
        url: "http://localhost:8080/todos",
      });
      // console.log(data);
      let getFilterstatus;
      if (status == "Pending") {
        getFilterstatus = data.filter((ele) => {
          if (ele.status == false) {
            return ele;
          }
        });
      } else if (status == "Completed") {
        getFilterstatus = data.filter((ele) => {
          if (ele.status == true) {
            return ele;
          }
        });
      } else {
        getFilterstatus = data;
      }

      let getsortstatus;
      if (date == "asc") {
        getsortstatus = getFilterstatus.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
      } else if (date == "desc") {
        getsortstatus = getFilterstatus.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      } else {
        getsortstatus = getFilterstatus;
      }


      dispatch({ type: "SUCCESS", payload: getsortstatus });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR" });
    }
  }

  useEffect(() => {
    todoData();
  }, [status,date]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <select
        value={status}
        style={{ border: "1px solid black" }}
        onChange={(e) => {
          dispatch({ type: "STATUS", payload: e.target.value });
        }}
      >
        <option value="Status">Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        value={date}
        style={{ border: "1px solid black", marginLeft: "16px" }}
        onChange={(e) => {
          dispatch({ type: "DATESORT", payload: e.target.value });
        }}
      >
        <option value="Sort">Sort</option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      {alldata &&
        alldata.map((ele) => {
          return <Showtodo key={ele.id} {...ele} todoData={todoData} />;
        })}
    </div>
  );
};

export default Home;
