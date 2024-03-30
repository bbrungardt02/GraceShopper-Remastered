import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
import { getAllUsers, updateuser } from "../api/userAuth";
import { deleteuser } from "../api/userAuth";
export default function allUsers() {
  const [users, setUsers] = useState([]);
  const [admin, setadmin] = useState(false);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, []);

  async function handlesubmit(e, userid) {
    e.preventDefault();
    confirm("confirm update");
    let updateObj = admin;
    await updateuser(updateObj, userid);
  }
  async function handledelete(e, userid) {
    e.preventDefault();
    confirm("confirm deletion");
    await deleteuser(userid);
  }
  return (
    <div className="route_flex">
      <h2>Users in database</h2>
      {users.map((user) => (
        <div key={user.user_id} className="users">
          <p>User Id: {user.user_id}</p>
          <p>Username: {user.username}</p>
          <p>email: {user.email}</p>
          <select
            defaultValue={user.adm}
            onChange={(e) => setadmin(e.target.value)}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <button
            value={user.user_id}
            onClick={(e) => handlesubmit(e, user.user_id)}
          >
            confirm update
          </button>
          <br />
          <button onClick={(e) => handledelete(e, user.user_id)}>
            delete user
          </button>
        </div>
      ))}
    </div>
  );
}
