import { useState } from "react";
import { editGoods } from "../services/api";


const EditGoodsForm = ({ goods, onGoodsUpdated, onClose }) => {
    const [formData, setFormData] = useState({ ...goods });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editGoods(formData)
            .then(() => {
                alert("Cập nhật thành công!");
                onGoodsUpdated();
                onClose();
            })
            .catch(error => alert("Lỗi khi cập nhật hàng hóa"));
    };

    return (
        <div className="form-container">
            <h3>Chỉnh sửa hàng hóa</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Mô tả hàng hóa:
                    <input type="text" name="goodsDescription" value={formData.goodsDescription} onChange={handleChange} />
                </label>
                {/* <label>
                    Kích thước:
                    <input type="text" name="size" value={formData.size} onChange={handleChange} />
                </label>
                <label>
                    Trọng lượng:
                    <input type="number" name="can" value={formData.can} onChange={handleChange} />
                </label>
                <label>
                    Ghi chú:
                    <textarea name="goodsNote" value={formData.goodsNote} onChange={handleChange} />
                </label> */}
                <button type="submit">Lưu</button>
                <button type="button" onClick={onClose}>Hủy</button>
            </form>
        </div>
    );
};

export default EditGoodsForm;
