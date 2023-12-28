import React, { useEffect, useState } from "react";
import { useAuth } from '../hooks/useAuthentication';
import { useNavigate } from "react-router-dom";
import AddData from "../components/AddData";
import "../styles/Admin.css";

function Admin() {
    const contractAPI = "https://656d757bbcc5618d3c23335e.mockapi.io/car-rental/contract";
    const userAPI = "https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/user";
    const carAPI = "https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/car";
    const [userData, setUserData] = useState([]);
    const [carData, setCarData] = useState([]);
    const [contractData, setContractData] = useState([]);
    const [selectedToggle, setSelectedToggle] = useState("users");
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCar, setSelectedCar] = useState();
    const [selectedContract, setSelectedContract] = useState();



    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUserSaveClick = async () => {
        try {
            const response = await fetch(`${userAPI}/${selectedUser.USER_ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Failed to save user data");
            }

            setUserData((prevUserData) => {
                const updatedUserData = prevUserData.map((user) =>
                    user.USER_ID === selectedUser.USER_ID ? { ...user, ...userData } : user
                );
                return updatedUserData;
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };
    const handleCarSaveClick = async () => {
        try {
            const response = await fetch(`${carAPI}/${selectedCar.LICENSE_PLATE}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedCar),
            });

            if (!response.ok) {
                throw new Error("Failed to save car data");
            }

            setCarData((prevCarData) => {
                const updatedCarData = prevCarData.map((car) =>
                    car.LICENSE_PLATE === selectedCar.LICENSE_PLATE ? { ...car, ...selectedCar } : car
                );
                return updatedCarData;
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Error saving car data:", error);
        }
    };

    const handleContractSaveClick = async () => {
        try {
            const response = await fetch(`${contractAPI}/${selectedContract.CONTRACT_ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedContract),
            });

            if (!response.ok) {
                throw new Error("Failed to save contract data");
            }

            setContractData((prevContractData) => {
                const updatedContractData = prevContractData.map((contract) =>
                    contract.CONTRACT_ID === selectedContract.CONTRACT_ID ? { ...contract, ...selectedContract } : contract
                );
                return updatedContractData;
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Error saving contract data:", error);
        }
    };



    const renderField = (label, value) => {
        return (
            <div className="user-info-modal-item">
                <label>{label} :</label>
                {isEditing ? (
                    <input className="form-control"
                        type="text"
                        placeholder={value}
                    />
                ) : (
                    <label>{value}</label>
                )}
            </div>
        );
    };
    const renderCarField = (label, value) => {
        return (
            <div className="car-info-modal-item">
                <label>{label} :</label>
                {isEditing ? (
                    <input className="form-control"
                        type="text"
                        placeholder={value}
                    />
                ) : (
                    <label>{value}</label>
                )}
            </div>
        );
    };

    const renderContractField = (label, value) => {
        return (
            <div className="contract-info-modal-item">
                <label>{label} :</label>
                {isEditing ? (
                    <input
                        className="form-control"
                        type="text"
                        placeholder={value}
                    />
                ) : (
                    <label>{value}</label>
                )}
            </div>
        );
    };

    const handleAddData = async (formData) => {
        setIsAddFormOpen(false);
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch(userAPI);
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchContractData = async () => {
        try {
            const response = await fetch(contractAPI);
            if (!response.ok) {
                throw new Error("Failed to fetch contract data");
            }
            const data = await response.json();
            setContractData(data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchCarData = async () => {
        try {
            const response = await fetch(carAPI);
            if (!response.ok) {
                throw new Error("Failed to fetch car data");
            }
            const data = await response.json();
            setCarData(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchUserData();
        fetchContractData();
        fetchCarData();
    }, []);



    const handleUserDelete = async (userId) => {
        try {
            const response = await fetch(`${userAPI}/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete user with ID: ${userId}`);
            }
            setUserData((prevData) => prevData.filter((user) => user.USER_ID !== userId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleCarDelete = async (LICENSE_PLATE) => {
        try {
            const response = await fetch(`${carAPI}/${LICENSE_PLATE}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete car with LICENSE_PLATE: ${LICENSE_PLATE}`);
            }
            setCarData((prevData) => prevData.filter((car) => car.LICENSE_PLATE !== LICENSE_PLATE));
        } catch (error) {
            console.error(error);
        }
    };
    const handleContractDelete = async (CONTRACT_ID) => {
        try {
            const response = await fetch(`${contractAPI}/${CONTRACT_ID}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete car with CONTRACT_ID: ${CONTRACT_ID}`);
            }
            setContractData((prevData) => prevData.filter((contract) => contract.CONTRACT_ID !== CONTRACT_ID));
        } catch (error) {
            console.error(error);
        }
    };
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");

    };
    const handleToggle = (toggle) => {
        setSelectedToggle(toggle);
    };

    return (
        <>
            {/* SIDEBAR */}``
            <section id="sidebar">
                <a className="brand">
                    <i className="bx bx bxs-taxi" />
                    <span className="text">Car Rental</span>
                </a>
                <ul className="side-menu top">
                    <li className={selectedToggle === "users" ? "active" : ""}>
                        <a onClick={() => handleToggle("users")}>
                            <i className="bx bxs-user" />
                            <span className="text">Danh sách người dùng</span>
                        </a>
                    </li>
                    <li className={selectedToggle === "cars" ? "active" : ""}>
                        <a onClick={() => handleToggle("cars")}>
                            <i className="bx bxs-car" />
                            <span className="text">Danh sách xe</span>
                        </a>
                    </li>
                    <li className={selectedToggle === "contracts" ? "active" : ""}>
                        <a onClick={() => handleToggle("contracts")}>
                            <i className="bx bx-file" />
                            <span className="text">Danh sách hợp đồng</span>
                        </a>
                    </li>
                    <li className={selectedToggle === "owner-register" ? "active" : ""}>
                        <a onClick={() => handleToggle("owner-register")}>
                            <i className="bx bx bx-car" />
                            <span className="text">Danh sách xe đăng ký</span>
                        </a>
                    </li>
                </ul>
                <ul className="side-menu">
                    <li>
                        <a className="logout" onClick={handleLogout}>
                            <i className="bx bxs-log-out-circle" />
                            <span className="text">Logout</span>
                        </a>
                    </li>
                </ul>
            </section>
            {/* SIDEBAR */}


            {/* CONTENT */}
            <section id="content">
                {/* NAVBAR */}
                <nav>
                    <i className="bx bx-menu" />
                </nav>
                {/* NAVBAR */}

                {/* MAIN */}
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Danh sách {selectedToggle}</h1>
                        </div>
                    </div>

                    <ul className="box-info">
                        <li>
                            <i className="bx bxs-calendar-check" />
                            <span className="text">
                                <h3>{contractData.length}</h3>
                                <p>Contract</p>
                            </span>
                        </li>
                        <li>
                            <i className="bx bxs-group" />
                            <span className="text">
                                <h3>{userData.length}</h3>
                                <p>Người dùng</p>
                            </span>
                        </li>
                        <li>
                            <i className="bx bxs-dollar-circle" />
                            <span className="text">
                                <h3>{carData.length}</h3>
                                <p>Xe</p>
                            </span>
                        </li>
                    </ul>

                    {/* table data section */}
                    <div className="table-data-toggle">
                        <div className="table-data user-table">
                            <div className="order">
                                <div className="head">
                                    <h3></h3>
                                    <div className="head-actions">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => { 
                                                setIsAddFormOpen(true)
                                                AddData(selectedToggle,isAddFormOpen)
                                            }}
                                        >
                                            Thêm
                                        </button>
                                    </div>
                                </div>
                                {selectedToggle === "users" && (

                                    <table>
                                        <thead>

                                            <tr>
                                                <th>User ID </th>
                                                <th>First name</th>
                                                <th>Last name</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userData.map(user => (
                                                <tr key={user.id}>
                                                    <td>{user.USER_ID}</td>
                                                    <td>{user.FIRST_NAME}</td>
                                                    <td>{user.LAST_NAME}</td>
                                                    <td>{user.EMAIL}</td>
                                                    <td>
                                                        <div className="table-data-actions">
                                                            <button type="button" class="btn btn-primary"
                                                                onClick={() => setSelectedUser(user)}
                                                            >Xem
                                                            </button>
                                                            <button type="button" class="btn btn-danger"
                                                                onClick={() => handleUserDelete(user.USER_ID)}
                                                            >
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>

                                    </table>
                                )}

                                {selectedToggle === "cars" && (

                                    <table>
                                        <thead>
                                            <tr>
                                                <th>NAME</th>
                                                <th>LICENSE_PLATE</th>
                                                <th>BRAND</th>
                                                <th>PRICE_C</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carData.map(car => (
                                                <tr key={car.id}>
                                                    <td>{car.NAME}</td>
                                                    <td>{car.LICENSE_PLATE}</td>
                                                    <td>{car.BRAND}</td>
                                                    <td>{car.PRICE_C}</td>
                                                    <td>
                                                        <div className="table-data-actions">
                                                            <button type="button" class="btn btn-primary"
                                                                onClick={() => setSelectedCar(car)}
                                                            >Xem
                                                            </button>
                                                            <button type="button" class="btn btn-danger" onClick={() => handleCarDelete(car.LICENSE_PLATE)}>Xóa</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                                {selectedToggle === "contracts" && (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>LICENSE_PLATE</th>
                                                <th>START_DATE</th>
                                                <th>END_DATE</th>
                                                <th>DEPOSIT_STATUS</th>
                                                <th>RETURN_STATUS</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contractData.map(contract => (
                                                <tr>
                                                    <td>{contract.LICENSE_PLATE}</td>
                                                    <td>{contract.START_DATE}</td>
                                                    <td>{contract.END_DATE}</td>
                                                    <td>{contract.DEPOSIT_STATUS}</td>
                                                    <td>{contract.RETURN_STATUS}</td>
                                                    <td>
                                                        <div className="table-data-actions">
                                                            <button type="button" class="btn btn-primary"
                                                                onClick={() => {
                                                                    setSelectedContract(contract)

                                                                }}
                                                            >Xem
                                                            </button>
                                                            <button type="button" class="btn btn-danger">Xóa</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                   

                    <div className="info-modal-container">
                        {selectedToggle === "users" && (
                            <div className="user-info-modal-container container">
                                {selectedToggle === "users" && selectedUser && (
                                    <div className="user-info-modal">
                                        <div className="user-info-fields">
                                            {renderField("User ID", selectedUser.USER_ID)}
                                            {renderField("First Name", selectedUser.FIRST_NAME)}
                                            {renderField("Last Name", selectedUser.LAST_NAME)}
                                            {renderField("Email", selectedUser.EMAIL)}
                                        </div>
                                        <div className="user-info-modal-actions">
                                            {!isEditing && (
                                                <div className="user-info-modal-btn">
                                                    <div className="user-info-modal-btn">
                                                        <button className="btn btn-primary" onClick={handleEditClick}>Chỉnh Sửa</button>
                                                        <button className="btn btn-primary" onClick={() => setSelectedUser(null)}>Đóng</button>
                                                    </div>
                                                </div>
                                            )}
                                            {isEditing && (
                                                <div className="user-info-modal-btn">
                                                    <button className="btn btn-primary" onClick={handleUserSaveClick}>Lưu</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedToggle === "cars" && (
                            <div className="car-info-modal-container container">
                                {selectedToggle === "cars" && selectedCar && (
                                    <div className="car-info-modal">
                                        <div className="car-info-fields">
                                            {renderCarField("Name", selectedCar.NAME)}
                                            {renderCarField("License Plate", selectedCar.LICENSE_PLATE)}
                                            {renderCarField("Brand", selectedCar.BRAND)}
                                            {renderCarField("Price", selectedCar.PRICE_C)}
                                        </div>
                                        <div className="car-info-modal-actions">
                                            {!isEditing && (
                                                <div className="car-info-modal-btn">
                                                    <button className="btn btn-primary" onClick={handleEditClick}>Chỉnh Sửa</button>
                                                    <button className="btn btn-primary" onClick={() => setSelectedCar(null)}>Đóng</button>
                                                </div>
                                            )}
                                            {isEditing && (
                                                <div className="car-info-modal-btn">
                                                    <button className="btn btn-primary" onClick={handleCarSaveClick}>Lưu</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedToggle === "contracts" && (
                            <div className="contract-info-modal-container container">
                                {selectedToggle === "contracts" && selectedContract && (
                                    <div className="contract-info-modal">
                                        <div className="contract-info-fields">
                                            {renderContractField("License Plate", selectedContract.LICENSE_PLATE)}
                                            {renderContractField("Start Date", selectedContract.START_DATE)}
                                            {renderContractField("End Date", selectedContract.END_DATE)}
                                            {renderContractField("Deposit Status", selectedContract.DEPOSIT_STATUS)}
                                            {renderContractField("Return Status", selectedContract.RETURN_STATUS)}
                                        </div>
                                        <div className="contract-info-modal-actions">
                                            {!isEditing && (
                                                <div className="contract-info-modal-btn">
                                                    <button className="btn btn-primary" onClick={handleEditClick}>Chỉnh Sửa</button>
                                                    <button className="btn btn-primary" onClick={() => setSelectedContract(null)}>Đóng</button>
                                                </div>
                                            )}
                                            {isEditing && (
                                                <div className="contract-info-modal-btn">
                                                    <button className="btn btn-primary" onClick={handleContractSaveClick}>Lưu</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
                {/* MAIN */}
            </section >
            {/* CONTENT */}
        </>
    );
}
export default Admin;