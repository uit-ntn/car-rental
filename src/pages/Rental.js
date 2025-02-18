import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import api from "../configs/api";

const Rentals = () => {
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        api.get("/api/rentals")
            .then((res) => setRentals(res.data))
            .catch(console.error);
    }, []);

    const rentalColumns = [
        { label: "Car ID", key: "car_id" },
        { label: "Customer ID", key: "customer_id" },
        { label: "Ngày bắt đầu", key: "start_date", type: "date" },
        { label: "Ngày kết thúc", key: "end_date", type: "date" },
        { label: "Tổng chi phí (VNĐ)", key: "total_cost" },
        { label: "Trạng thái", key: "status" }
    ];

    return <DataTable columns={rentalColumns} data={rentals} title="🚗 Quản lý Thuê Xe" />;
};

export default Rentals;
