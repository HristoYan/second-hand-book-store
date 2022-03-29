import React, { useEffect, useState } from "react"
import userApiClient from "../../services/user-api-client";
// import { Loader } from "../Loader";
import { UserCard } from "./UserCard";

export const Users = ({ onEditUser, onDeleteUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const userList = await userApiClient.fetchUsers();
        console.log(userList);
        setUsers(userList);
    }, []);

    async function onDeleteHandler(user) {
        await onDeleteUser(user.id);
        setUsers(users.filter(u => u.id !== user.id));
    }

    // if (!users) {
    //     return <Loader />;
    // }

    return (
        <div className="container">
            <div className="section">
                <h2 style={{ color: "#2196F3", margin: "50px" }}>Edit Users</h2>
                <div className="row">
                    {
                        users.map(user => <UserCard {...user} key={user.id} onEditClick={onEditUser} onDeleteClick={onDeleteHandler} />)
                    }
                </div>
            </div>
        </div>);
}

{/* <div style={{ display: "flex", flexWrap: "wrap" }}></div> */ }