import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import api from "../configs/api";
import { Image } from "react-bootstrap";

const Cars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        api.get("/api/cars")
            .then((res) => setCars(res.data))
            .catch(console.error);
    }, []);

    const carColumns = [
        { label: "Hình ảnh", key: "image", type: "image" },
        { label: "Hãng xe", key: "make" },
        { label: "Mẫu xe", key: "model" },
        { label: "Năm", key: "year" },
        { label: "Biển số", key: "license_plate" },
        { label: "Trạng thái", key: "status" },
        { label: "Vị trí", key: "location" },
        { label: "Giá thuê/ngày (VNĐ)", key: "price" },
        { label: "Hộp số", key: "transmission" }
    ];

    return <DataTable columns={carColumns} data={cars} title="🚗 Quản lý Xe" />;
};

export default Cars;
