import { Card } from "antd";
import {
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined,
    BankOutlined,
    HeartOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import "./index.css";

const { Meta } = Card;

const UserListElement = ({ user, isFavorite, toggleFav, addingDeleteFeature, onEdit }) => {
    const { id, name, email, phone, website, company, username } = user;

    return (
        <li className="user-list-item">
            <Card
                className="user-card"
                cover={
                    <img
                        alt={name}
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`}
                        className="user-avatar"
                    />
                }
                actions={[
                    <HeartOutlined
                        key="fav"
                        onClick={() => toggleFav(id)}
                        style={{ color: isFavorite ? "red" : "gray" }}
                    />,
                    <EditOutlined key="edit" onClick={() => onEdit(user)} />,
                    <DeleteOutlined key="delete" onClick={() => addingDeleteFeature(id)} />,
                ]}
            >
                <Meta
                    title={<div className="user-name">{name}</div>}
                    description={
                        <div className="user-info">
                            <p><MailOutlined /> {email}</p>
                            <p><PhoneOutlined /> {phone}</p>
                            <p><GlobalOutlined /> {website}</p>
                            <p><BankOutlined /> {company?.name}</p>
                        </div>
                    }
                />
            </Card>
        </li>
    );
};

export default UserListElement;
