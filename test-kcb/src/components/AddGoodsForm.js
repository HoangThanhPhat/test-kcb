import { useState } from "react";
import { addGoods } from "../services/api";
import "../styles/AddGoodsForm.css";

const AddGoodsForm = ({ onGoodsAdded }) => {
    const [newGoods, setNewGoods] = useState({
        goodsName: "",
        goodsDescription: "",
        size: "",
        kien: 0,
        can: 0,
        khoi: 0,
        truckingFee: 0,
        localFee: 0,
        goodsStatus: 0,
        imagesIds: [""],
        goodsNote: "",
        goodsHTVC: 0
    });

    const handleAddGoods = () => {
        if (!newGoods.goodsName || !newGoods.goodsDescription || !newGoods.size) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        addGoods(newGoods)
            .then(() => {
                alert("Thêm hàng hóa thành công!");
                setNewGoods({
                    goodsName: "",
                    goodsDescription: "",
                    size: "",
                    kien: 0,
                    can: 0,
                    khoi: 0,
                    truckingFee: 0,
                    localFee: 0,
                    goodsStatus: 0,
                    imagesIds: [""],
                    goodsNote: "",
                    goodsHTVC: 0
                });
                onGoodsAdded(); 
            })
            .catch(error => alert("Lỗi khi thêm hàng hóa"));
    };

    return (
        <div className="add-goods-form">
            <div className="title">Thêm Hàng Hóa</div>
            <div className="form-container">
                <div className="form-group">
                    <label>Tên sản phẩm</label>
                    <input
                        type="text"
                        value={newGoods.goodsName}
                        onChange={(e) => setNewGoods({ ...newGoods, goodsName: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Mô tả</label>
                    <input
                        type="text"
                        value={newGoods.goodsDescription}
                        onChange={(e) => setNewGoods({ ...newGoods, goodsDescription: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Size</label>
                    <input
                        type="text"
                        value={newGoods.size}
                        onChange={(e) => setNewGoods({ ...newGoods, size: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Số kiện</label>
                    <input
                        type="number"
                        value={newGoods.kien}
                        onChange={(e) => setNewGoods({ ...newGoods, kien: parseInt(e.target.value) || 0 })}
                    />
                </div>

                <div className="form-group">
                    <label>Số cân</label>
                    <input
                        type="number"
                        value={newGoods.can}
                        onChange={(e) => setNewGoods({ ...newGoods, can: parseFloat(e.target.value) || 0 })}
                    />
                </div>

                <div className="form-group">
                    <label>Số khối</label>
                    <input
                        type="number"
                        value={newGoods.khoi}
                        onChange={(e) => setNewGoods({ ...newGoods, khoi: parseFloat(e.target.value) || 0 })}
                    />
                </div>

                <div className="form-group">
                    <label>Phí vận chuyển</label>
                    <input
                        type="number"
                        value={newGoods.truckingFee}
                        onChange={(e) => setNewGoods({ ...newGoods, truckingFee: parseFloat(e.target.value) || 0 })}
                    />
                </div>

                <div className="form-group">
                    <label>Phí địa phương</label>
                    <input
                        type="number"
                        value={newGoods.localFee}
                        onChange={(e) => setNewGoods({ ...newGoods, localFee: parseFloat(e.target.value) || 0 })}
                    />
                </div>

                <div className="form-group">
                    <label>Trạng thái hàng hóa</label>
                    <input
                        type="number"
                        value={newGoods.goodsStatus}
                        onChange={(e) => setNewGoods({ ...newGoods, goodsStatus: parseInt(e.target.value) || 0 })}
                    />
                </div>

                <div className="form-group">
                    <label>Ghi chú</label>
                    <input
                        type="text"
                        value={newGoods.goodsNote}
                        onChange={(e) => setNewGoods({ ...newGoods, goodsNote: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Hình thức vận chuyển</label>
                    <input
                        type="number"
                        value={newGoods.goodsHTVC}
                        onChange={(e) => setNewGoods({ ...newGoods, goodsHTVC: parseInt(e.target.value) || 0 })}
                    />
                </div>

                <div className="form-group">
                    <label>Ảnh sản phẩm</label>
                    <input
                        type="text"
                        value={newGoods.imagesIds.join(", ")}
                        onChange={(e) => setNewGoods({ ...newGoods, imagesIds: e.target.value.split(", ") })}
                    />
                </div>

                <button className="add-button" onClick={handleAddGoods}>Thêm</button>
            </div>
        </div>
    );
};

export default AddGoodsForm;
