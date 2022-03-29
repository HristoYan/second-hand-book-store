import './UserCard.css';

export const UserCard = ({ onEditClick, onDeleteClick, ...user }) => {
    const { name, imgUrl, gender, username, role, short_description } = user;

    return (
        <div className="card col m3" style={{ width: "370px", height: "500px", "margin": "10px", flexShrink: "0" }}>
            <div className="card-content">
                <img className="user-img" src={imgUrl} alt="User Picture" />

                <h4>{username} (<RoleTag role={role} />)</h4>
                <h5>{name}, <GenderTag gender={gender} /></h5>
                <p>
                    {short_description}
                </p>
                <button onClick={() => { onEditClick(user) }}>Edit</button>
                <button onClick={() => { onDeleteClick(user) }}>Delete</button>
            </div>
        </div>
    );
}

const GenderTag = ({ gender }) => {
    const color = gender?.toLowerCase() === "male" ? "blue" : "hotpink";
    return <span style={{ color, fontWeight: "bold" }}>{gender}</span>
}

const RoleTag = ({ role }) => {
    const color = role?.toLowerCase() === "admin" ? "gold" : "black";
    return <span style={{ color, fontStyle: "italic", fontWeight: "bold" }}>{role}</span>
}