// import axios from "axios";
// import { MAIN_URL } from "../config/Url";

// const addTask = async (taskData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.post(`${MAIN_URL}addTask`, taskData, config);
//   return response.data;
// };

// const fetchtask = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.get(`${MAIN_URL}fetchtask/${email}`, config);
//   return response.data;
// };

// const deleteAdd = async (id, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.delete(`${MAIN_URL}deleteadd/${id}`, config);
//   return response.data;
// };

// const taskService = {
//   addTask,
//   fetchtask,
//   deleteAdd,
// };

// export default taskService;
