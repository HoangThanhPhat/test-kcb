import React from "react";
import { useNavigate } from "react-router-dom";
import GoodsList from "../components/GoodsList";
import "../styles/Dashboard.css"; 

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Trang Quản Lý Hàng Hóa</h1>
            </div>
            
            <GoodsList />
            
            <div className="dashboard-footer">
                <button onClick={handleLogout} className="logout-btn">Đăng Xuất</button>
            </div>
        </div>
    );
};

export default Dashboard;

