import axios from "axios";
import store from "@/store/index.js";

export async function login(email, password) {
  return await axios.post("http://localhost:3000/api/auth/login", {
    email: email,
    password: password,
  });
}

export async function signUp(data) {
  return await axios.post("http://localhost:3000/api/auth/signup", data, {
    data: data,
  });
}

export async function modifyArticle(postId, data) {
  return await axios.put("http://localhost:3000/api/articles/" + postId, data, {
    headers: {
      Authorization: "Bearer " + store.getters.user.token,
    },
  });
}

export async function getOneArticle(postId) {
  return await axios.get("http://localhost:3000/api/articles/" + postId, {
    headers: {
      Authorization: "Bearer " + store.getters.user.token,
    },
  });
}

export async function getAllArticles() {
  return await axios.get("http://localhost:3000/api/articles", {
    headers: {
      Authorization: "Bearer " + store.getters.user.token,
    },
  });
}

export async function deleteArticle(postId, isAdmin) {
  return await axios.delete("http://localhost:3000/api/articles/" + postId, {
    headers: {
      Authorization: "Bearer " + store.getters.user.token,
    },
    data: {
      postId: postId,
      isAdmin: isAdmin,
    },
  });
}

export async function sendLike(postId, userId) {
  return await axios.post(
    "http://localhost:3000/api/articles/" + postId + "/like",
    {
      userId: userId,
    },
    {
      headers: {
        Authorization: "Bearer " + store.getters.user.token,
      },
    }
  );
}

export async function postArticle(data) {
  return await axios.post("http://localhost:3000/api/articles", data, {
    headers: {
      Authorization: "Bearer " + store.getters.user.token,
    },
  });
}
