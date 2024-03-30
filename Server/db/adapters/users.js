const client = require("../client");

async function createUser({ username, email, password, adm }) {
  const {
    rows: [user],
  } = await client.query(
    `
    INSERT INTO users(username, email, password, adm)
            VALUES($1,$2, $3, $4)
            ON CONFLICT (username) DO NOTHING
            returning *
            `,
    [username, email, password, adm]
  );

  return user;
}
async function getAllUsers() {
  const { rows } = await client.query(`
    SELECT * FROM users;
  `);
  return rows;
}

async function getUserByUserid(userid) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE user_id=$1;
      `,
      [userid]
    );
    console.log("user from getUserbyUserid:", user);
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1;
      `,
      [username]
    );
    console.log("user from getUserbyUsername:", user);
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getUserbytoken() {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * from users
    WHERE password = $1
    `,
      [token]
    );
  } catch (error) {
    console.log(error);
  }
}
async function deleteUser(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `DELETE from users WHERE user_id=$1
    `,
      [id]
    );
    return { success: true, message: "user deleted" };
  } catch (error) {
    return { success: false, message: error };
  }
}
async function updateuser(id, updateObj) {
  try {
    //works
    const setString = Object.keys(updateObj)
      .map((key, i) => {
        return `${key}=$${i + 1}`;
      })
      .join(", ");
    const {
      rows: [updatedUser],
    } = await client.query(
      `
        update users
          set ${setString}
          where user_id = ${id}
          returning *
      `,
      Object.values(updateObj)
    );
    console.log("update keys", Object.keys(updateObj));
    console.log("obj values", Object.values(updateObj));
    console.log("set string", setString);
    return { success: true, message: "user updated", updatedUser };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserbytoken,
  getUserByUserid,
  updateuser,
  deleteUser,
};
