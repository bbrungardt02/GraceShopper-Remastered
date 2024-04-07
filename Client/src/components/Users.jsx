/* eslint-disable react-hooks/rules-of-hooks */
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
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">Users in database</h2>
      {users.map((user) => (
        <div
          key={user.user_id}
          className="inline-table m-4 border border-gray-300 p-4 rounded-lg shadow-md"
        >
          <p className="text-base font-medium">User Id: {user.user_id}</p>
          <p className="text-base font-medium">Username: {user.username}</p>
          <p className="text-base font-medium">email: {user.email}</p>
          <p className="text-lg font-semibold mb-2">is Admin?:</p>
          <select
            defaultValue={user.adm}
            onChange={(e) => setadmin(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <button
            value={user.user_id}
            onClick={(e) => handlesubmit(e, user.user_id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition-colors duration-200"
          >
            confirm update
          </button>
          <br />
          <button
            onClick={(e) => handledelete(e, user.user_id)}
            className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg mt-4 hover:bg-red-600 transition-colors duration-200"
          >
            delete user
          </button>
        </div>
      ))}
    </div>
  );
}
