import React from "react";
import { Table, Card, Image } from "react-bootstrap";

const DataTable = ({ columns, data, title }) => {
    return (
        <Card className="shadow-sm p-3">
            <h4 className="fw-bold">{title}</h4>
            <Table striped bordered hover responsive>

                {/*Label*/}
                <thead className="table-dark text-center">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.label}</th>
                        ))}
                        <th>HÀNH ĐỘNG</th>
                    </tr>
                </thead>


                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>
                                    {col.type === "image" ? (
                                        <Image src={row[col.key]} alt="Xe" width="80" height="50" rounded />
                                    ) : (
                                        getNestedValue(row, col.key)
                                    )}
                                </td>
                            ))}
                            <td>
                                <button className="btn btn-warning btn-sm">Xem</button>
                                <button className="btn btn-danger btn-sm ms-2">Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    );
};

const getNestedValue = (obj, key) => {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj) || "N/A";
};

export default DataTable;
