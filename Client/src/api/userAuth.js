import { API_URL } from "./constants";

// eslint-disable-next-line no-unused-vars
export default async function registerUser(username, email, password, adm) {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
    credentials: "include",
  });
  console.log("RESPONSE: ", response);
  const { success, message, data } = await response.json();
  console.log({ success, message, data });
  if (!success) {
    throw {
      message,
    };
  }
  console.log(success, message, data);
  return { success, message, data };
}

export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
    credentials: "include",
  });
  const { success, message, data } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, data };
}
export async function logout() {
  const response = await fetch(`${API_URL}/api/users/logout`, {
    credentials: "include",
  });
  const { success, message, data } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, data };
}

export async function getAllUsers() {
  const response = await fetch(`${API_URL}/api/users/`);
  const rows = await response.json();
  console.log("ALL USERS:", rows);
  if (!rows) {
    throw {
      // eslint-disable-next-line no-undef
      message,
    };
  }
  return rows;
}

export async function fetchMe() {
  const response = await fetch(`${API_URL}/api/users/me`, {
    credentials: "include",
  });
  const { success, message, user } = await response.json();
  console.log("INSIDE FETCH ME:       ", { success, message, user });
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, user };
}

export async function fetchuserbyid(userid) {
  const response = await fetch(`${API_URL}/api/users/test/${userid}`, {
    credentials: "include",
  });
  const { success, message, user } = await response.json();
  console.log("inside getuserbyid-api", { success, message, user });
  if (!success) {
    throw { message };
  }
  return { success, message, user };
}

export async function updateuser(updateObj, userid) {
  // eslint-disable-next-line no-useless-catch
  try {
    console.log("both user and object in api", { updateObj, userid });
    let adm = updateObj;
    const response = await fetch(`${API_URL}/api/users/update/${userid}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        adm,
      }),
      credentials: "include",
    });
    const results = response.JSON;
    console.log("results", results);
    console.log("response", response);

    return results;
  } catch (error) {
    throw error;
  }
}

export async function deleteuser(userid) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/api/users/delete/${userid}`, {
      method: "DELETE",
    });
    const results = response.JSON;
    return results;
  } catch (error) {
    throw error;
  }
}
