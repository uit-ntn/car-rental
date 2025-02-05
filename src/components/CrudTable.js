import React from "react";

const CrudTable = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <h5>Manage Data</h5>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>johndoe@example.com</td>
              <td>
                <button className="btn btn-warning btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm ml-2">Delete</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrudTable;
