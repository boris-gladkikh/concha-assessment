import React, { useState, useEffect } from "react";
import "./SignInsList.css";
import { useSelector } from "react-redux";
import { fetchAllUsers } from "./util";

const testUsers = [
  {
    email: "amy@conchalabs.com",
    firebase_uid: "DLL0KLLe5FWOSG3bMOC4Qf4gWiM2",
    name: "Amy Li",
  },
  {
    email: "bingo@conchalabs.com",
    firebase_uid: "DLL0KLLe5FWOSG3bMOC4Qf4gWiM2",
    name: "Bingo Boingo",
  },
  {
    email: "jim@conchalabs.com",
    firebase_uid: "DLL0KLLe5FWOSG3bMOC4Qf4gWiM2",
    name: "Jim Jungus",
  },
  {
    email: "clem@gmail.com",
    firebase_uid: "DLL0KLLe5FWOSG3bMOC4Qf4gWiM2",
    name: "Clem Earthy",
  },
];

function SignInsList() {
  const [users, setUsers] = useState([]);
  const key = useSelector((st) => st.key);

  // fetch users from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersList = await fetchAllUsers(key);
        setUsers(usersList);
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    };

    fetchData();
  }, [key]);

  const generateList = users.map((u) => {
    return (
      <tr>
        <td>{u.name}</td>
        <td>{u.email}</td>
      </tr>
    );
  });
  return (
    <div className="App">
      <h1>Recent Users</h1>
      <table className="user-table">
        <tr>
          <th>NAME</th>
          <th>EMAIL</th>
        </tr>
        {generateList}
      </table>
    </div>
  );
}

export default SignInsList;
