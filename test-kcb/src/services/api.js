import axios from "axios";

const API_URL = "http://tienminhglobal.com:8088/hola/goods";

export const login = async (username, password) => {
    try {
        const response = await axios.post("http://tienminhglobal.com:8088/hola/user-login", {
            userName: username,
            password: password
        });
        return response.data;
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};

export const getGoodsList = async (searchKey = "") => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                pageIndex: 1,
                pageSize: 10,
                searchKey: searchKey
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch goods list", error);
        throw error;
    }
};


export const addGoodsImage = async (goodsId, file, type = 1) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(`${API_URL}/image`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            params: { GoodsId: goodsId, Type: type }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to upload goods image", error);
        throw error;
    }
};

export const addGoods = async (goodsData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(API_URL, goodsData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to add goods", error);
        throw error;
    }
};

export const editGoods = async (goodsData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(API_URL, goodsData, {
            headers: { 
                Authorization: `Bearer ${token}`, 
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to edit goods", error);
        throw error;
    }
};

export const deleteGoods = async (id) => {
    const token = localStorage.getItem("token");
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}`, accept: "text/plain" },
        });
    } catch (error) {
        console.error("Failed to delete goods", error);
        throw error;
    }
};


