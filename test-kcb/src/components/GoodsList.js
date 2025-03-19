import { useEffect, useState } from "react";
import { getGoodsList, deleteGoods, addGoodsImage, editGoods } from "../services/api";
import AddGoodsForm from "./AddGoodsForm"; 
import EditGoodsForm from "./EditGoodsForm"; 
import "../styles/GoodsList.css";

const GoodsList = () => {
    const [goods, setGoods] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [file, setFile] = useState(null);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedGoods, setSelectedGoods] = useState(null); 


    const fetchGoods = () => {
        getGoodsList(searchKey)
            .then(response => {
                console.log("Dữ liệu từ API:", response);
                setGoods(response.result.items);
            })
            .catch(error => console.error("Lỗi khi lấy danh sách hàng hóa:", error));
    };

    useEffect(() => {
        fetchGoods();
    }, []);

    const handleSearch = () => {
        fetchGoods();
    };
    const handleDeleteGoods = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa hàng hóa này?")) {
            deleteGoods(id)
                .then(() => {
                    alert("Xóa thành công!");
                    fetchGoods();
                })
                .catch(error => alert("Lỗi khi xóa hàng hóa"));
        }
    };

    const handleUploadImage = (goodsId) => {
        if (!file) {
            alert("Vui lòng chọn ảnh!");
            return;
        }
        addGoodsImage(goodsId, file)
            .then(() => {
                alert("Tải ảnh thành công!");
                setFile(null);
            })
            .catch(error => alert("Lỗi khi tải ảnh"));
    };

    const handleEditGoods = (goods) => {
        setSelectedGoods(goods);
        setIsEditPopupOpen(true);
    };

    return (
        <div className="goods-container">
            <h2 className="title">Danh Sách Hàng Hóa</h2>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Tìm kiếm hàng hóa..."
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>
            <button className="add-product-btn" onClick={() => setIsAddPopupOpen(true)}>+ Thêm Sản Phẩm</button>
            {isAddPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close-btn" onClick={() => setIsAddPopupOpen(false)}>×</span>
                        <AddGoodsForm onGoodsAdded={fetchGoods} />
                    </div>
                </div>
            )}
            {isEditPopupOpen && selectedGoods && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close-btn" onClick={() => setIsEditPopupOpen(false)}>×</span>
                        <EditGoodsForm goods={selectedGoods} onGoodsUpdated={fetchGoods} onClose={() => setIsEditPopupOpen(false)} />
                    </div>
                </div>
            )}
            {goods.length === 0 ? (
                <p className="no-data">Không có dữ liệu hàng hóa.</p>
            ) : (
                <ul className="goods-list">
                    {goods.map(item => (
                        <li key={item.id} className="goods-item">
                            <span className="goods-code">{item.sysCode}</span>
                            <span className="goods-description">{item.goodsDescription}</span>

                            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                            <button onClick={() => handleUploadImage(item.id)}>Upload Ảnh</button>

                            <button className="edit-btn" onClick={() => handleEditGoods(item)}>Sửa</button>

                            <button className="delete-btn" onClick={() => handleDeleteGoods(item.id)}>Xóa</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GoodsList;
