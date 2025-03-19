import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import "../styles/Login.css"; 

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const data = await login(username, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("roleId", data.roleId);
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed! Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Đăng Nhập</h2>
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button className="login-button" onClick={handleLogin} disabled={loading}>
                    {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                </button>
            </div>
        </div>
    );
}

export default Login;
