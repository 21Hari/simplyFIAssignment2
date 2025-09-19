import UserListElement from '../userListElement';
import './index.css';
import { useState, useEffect } from 'react';
import { TailSpin } from "react-loader-spinner";
import { Modal, Form, Input } from "antd";

const UserCardElement = () => {
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(true);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => { gettingUserDetails() }, []);

    const gettingUserDetails = async () => {
        const url = "https://jsonplaceholder.typicode.com/users";
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
        setLoader(false);
    };

    const toggleFav = (id) => {
        setFavoriteIds((prevFavs) =>
            prevFavs.includes(id)
                ? prevFavs.filter(favId => favId !== id)
                : [...prevFavs, id]
        );
    };

    const addingDeleteFeature = (id) => {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        form.setFieldsValue(user);
    };

    const handleUpdate = () => {
        form.validateFields().then((values) => {
            setUsers((prevUsers) =>
                prevUsers.map(u =>
                    u.id === editingUser.id ? { ...u, ...values } : u
                )
            );
            setEditingUser(null); // close modal
        });
    };

    const renderLoader = () => (
        <div className="loader-container">
            <TailSpin visible={true} height="60" width="60" color="#000000" ariaLabel="tail-spin-loading" radius="1" />
        </div>
    );

    return (
        <div className="user-list-container">
            <h2 className="user-heading">User Profiles</h2>
            {loader ? (
                renderLoader()
            ) : (
                <ul className="user-list">
                    {users.map(user => (
                        <UserListElement
                            key={user.id}
                            user={user}
                            isFavorite={favoriteIds.includes(user.id)}
                            toggleFav={toggleFav}
                            addingDeleteFeature={addingDeleteFeature}
                            onEdit={handleEdit}
                        />
                    ))}
                </ul>
            )}


            {editingUser && (
                <Modal
                    title="Edit User"
                    open={true}
                    onCancel={() => setEditingUser(null)}
                    onOk={handleUpdate}
                    okText="OK"
                    cancelText="Cancel"
                    centered
                >
                    <Form form={form} layout="vertical">
                        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Website" name="website" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
};

export default UserCardElement;
