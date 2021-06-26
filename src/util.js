import axios from "axios";
const BASEURL = "https://interviews-backend-api.herokuapp.com/api/v1";

// retrieve API key
export const fetchApiKey = async () => {
  try {
    const response = await axios.post(`${BASEURL}/api-key`);
    return response.data.key;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

//create user 
export const createUser = async (payload, key) => {
  const authHeaders = {
    headers: {
      Authorization: key,
    },
  };
  try {
    const response = await axios.post(`${BASEURL}/users`, payload, authHeaders);
    console.log('createUser response', response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

//get all users 

export const fetchAllUsers = async (key) => {
  const authHeaders = {
    headers: {
      Authorization: key,
    },
  };
  try {
    const response = await axios.get(`${BASEURL}/users`, authHeaders);
    console.log('fetch all users result', response.data)
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
