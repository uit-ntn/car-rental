import { useState } from "react";
import React from "react";

const AddData = (selectedToggle, isAddFormOpen) => {
    const [isOpen, setIsOpen] = useState(isAddFormOpen);
    const handleAddData = async (formData) => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <div className="add-data-form-container">
                    <div className="data-form-header">
                        Thêm mới {selectedToggle}
                    </div>
                    <div>
                        {selectedToggle === "users"
                            && (
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Địa chỉ email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Mật khẩu</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                </form>
                            )
                        }
                        {selectedToggle === "cars" && (
                            <form>
                                <div className="form-group">
                                    <label htmlFor="carName">Tên xe</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="carName"
                                        placeholder="Enter car name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="licensePlate">Biển số xe</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="licensePlate"
                                        placeholder="Enter license plate"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="carBrand">Hãng xe</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="carBrand"
                                        placeholder="Enter car brand"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rentalPrice">Giá cho thuê</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="rentalPrice"
                                        placeholder="Enter rental price"
                                    />
                                </div>
                            </form>
                        )}

                        {selectedToggle === "contracts" && (
                            <form>
                                <div className="form-group">
                                    <label htmlFor="licensePlate">LICENSE_PLATE</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="licensePlate"
                                        placeholder="Enter license plate"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startDate">START_DATE</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="startDate"
                                        placeholder="Enter start date"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endDate">END_DATE</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="endDate"
                                        placeholder="Enter end date"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="depositStatus">DEPOSIT_STATUS</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="depositStatus"
                                        placeholder="Enter deposit status"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="returnStatus">RETURN_STATUS</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="returnStatus"
                                        placeholder="Enter return status"
                                    />
                                </div>
                            </form>
                        )}
                    </div>
                    <div className="add-data-form-actions">
                        <button type="button" class="btn btn-primary" onClick={handleAddData()}>Thêm</button>
                        <button type="button" class="btn btn-primary" onClick={() => { setIsOpen(false) }}>Đóng</button>
                    </div>
                </div>
            )}
        </>)
}
export default AddData;