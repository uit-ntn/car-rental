import React, { useState } from "react";

const TableCRUD = () => {
  const [data, setData] = useState([
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
  ]);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="card mt-4">
      <div className="card-header">Product List</div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCRUD;
