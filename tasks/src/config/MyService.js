import axios from "axios";
import { MAIN_URL } from "./Url";
let token = localStorage.getItem("_token");
//ADD TASK
// export function addTask(data) {
//   console.log(data);
//   return axios.post(`${MAIN_URL}addTask`, data);
// }

//Captcha
export function captcha(ctoken) {
  console.log(ctoken);
  return axios.post(`${MAIN_URL}captcha`, ctoken);
}

//ADD TASK
export const addTask = async (data) => {
  console.log(data);
  const response = await axios.post(`${MAIN_URL}addTask`, data);
  return response.data;
};

//FETCH TASK
export function fetchtask(email) {
  return axios.get(`${MAIN_URL}fetchtask/${email}`, {
    headers: { authorization: `Bearer ${token}` },
  });
}
//DELETE ATSK
export function deleteAdd(id) {
  console.log(id);
  return axios.delete(`${MAIN_URL}deleteadd/${id}`);
}

//Update task
export function updatetask(data, id) {
  console.log(id);
  return axios.post(`${MAIN_URL}updatetask/${id}`, data);
}
//Fetch filter task
export function fetchtoptask(email) {
  return axios.get(`${MAIN_URL}fetchtoptask/${email}`, {
    headers: { authorization: `Bearer ${token}` },
  });
}
//Edit Satges
export function editstages(data) {
  return axios.post(`${MAIN_URL}editstages`, data);
}
//Edit Satges drag
export function editstagesdrag(data) {
  return axios.post(`${MAIN_URL}editstagesdrag`, data);
}
export function trashDrag(id) {
  console.log(id);
  return axios.delete(`${MAIN_URL}deletedrag/${id}`);
  // return axios.post(`${MAIN_URL}editstagesdrag`, id);
}

//contact US
export function contactUS(data) {
  return axios.post(`${MAIN_URL}contact`, data);
}

//register
export function addUser(data) {
  return axios.post(`${MAIN_URL}adduser`, data);
}
//login
export function login(data) {
  return axios.post(`${MAIN_URL}login`, data);
}

//Forgot password
export function getchangepassword(data) {
  return axios.put(`${MAIN_URL}changepassword`, data);
}

export function getEmail(data) {
  return axios.post(`${MAIN_URL}forgetemail`, data);
}

export function updProfile(id, data) {
  console.log(data);
  return axios.put(`${MAIN_URL}updprofile/${id}`, data);
}

export function getProfile(email) {
  return axios.get(`${MAIN_URL}profile/${email}`, {
    headers: { authorization: `Bearer ${token}` },
  });
}

export function changePass(id, data) {
  return axios.put(`${MAIN_URL}changepass/${id}`, data);
}

// Add profile image using multer
export function getMulter(data, user) {
  return axios.post(`${MAIN_URL}user-profile/${user}`, data);
}
export function getImage(user) {
  return axios.get(`${MAIN_URL}getmulter/${user}`);
}
