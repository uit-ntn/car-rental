import React, { useEffect, useState } from "react";
import { useAuth } from '../hooks/useAuthentication';
import { useNavigate } from "react-router-dom";
import AddData from "../components/AddData";
import "../styles/Admin.css";

function Admin() {
    const contractAPI = "http://127.0.0.1:8000/api/contract";
    const userAPI = "http://127.0.0.1:8000/api/user";
    const carAPI = "http://127.0.0.1:8000/api/car";
    const [userData, setUserData] = useState([]);
    const [carData, setCarData] = useState([]);
    const [contractData, setContractData] = useState([]);
    const [selectedToggle, setSelectedToggle] = useState("users");
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCar, setSelectedCar] = useState();
    const [selectedContract, setSelectedContract] = useState();
    const [infoModalDisplay, setInfoModalDisplay] = useState('none');



    const handleOpenModal = () => {
        setInfoModalDisplay('block');
    };

    const handleCloseModal = () => {
        setInfoModalDisplay('none');
    };



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
                body: JSON.stringify(selectedUser),
            });

            if (!response.ok) {
                throw new Error(`Failed to save user data. Server responded with ${response.status}`);
            }

            const updatedUserData = userData.map(user =>
                user.USER_ID === selectedUser.USER_ID ? selectedUser : user
            );

            setUserData(updatedUserData);
            setIsEditing(false);
        } catch (error) {
            alert("Error saving contract data:", error);
            setIsEditing(false);
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
            alert("Error saving contract data:", error);
            setIsEditing(false);
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
            alert("Error saving contract data:", error);
            setIsEditing(false);
            
        }
    };



    const renderField = (label, value, onChange) => {
        return (
            <div className="user-info-modal-item row">
                <label className="col-sm-4 col-form-label">{label} :</label>
                <div className="col-sm-8">
                    {isEditing ? (
                        <input
                            className="form-control"
                            type="text"
                            value={value}
                            onChange={onChange}
                        />
                    ) : (
                        <span className="form-control-plaintext">{value}</span>
                    )}
                </div>
            </div>
        );
    };
    const handleInputChange = (field, newValue) => {
        setSelectedUser(prevData => ({
            ...prevData,
            [field]: newValue,
        }));
    };
    const handleCarInputChange = (field, newValue) => {
        setSelectedCar(prevData => ({
            ...prevData,
            [field]: newValue,
        }));
    };
    const handleContractInputChange = (field, newValue) => {
        setSelectedContract(prevData => ({
            ...prevData,
            [field]: newValue,
        }));
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${userAPI}s`);
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const responseData = await response.json();

            // Kiểm tra xem responseData có thuộc tính 'data' và có phải là mảng không
            const userDataArray = responseData.data && Array.isArray(responseData.data)
                ? responseData.data
                : [];

            setUserData(userDataArray);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchContractData = async () => {
        try {
            const response = await fetch(`${contractAPI}s`);
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const responseData = await response.json();

            // Kiểm tra xem responseData có thuộc tính 'data' và có phải là mảng không
            const contractDataArray = responseData.data && Array.isArray(responseData.data)
                ? responseData.data
                : [];

            setContractData(contractDataArray);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchCarData = async () => {
        try {
            const response = await fetch(`${carAPI}s`);
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const responseData = await response.json();

            // Kiểm tra xem responseData có thuộc tính 'data' và có phải là mảng không
            const carDataArray = responseData.data && Array.isArray(responseData.data)
                ? responseData.data
                : [];

            setCarData(carDataArray);
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
                headers: {
                    'Content-Type': 'application/json',
                  },

            });

            if (!response.ok) {
                throw new Error(`Failed to delete user with ID: ${userId}`);
            }
            setUserData((prevData) => prevData.filter((user) => user.USER_ID !== userId));
        } catch (error) {
            alert(error);
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
    console.log(userData);
    console.log("Type of userData:", typeof userData);
    const updateUserForm = {
        FIRST_NAME : "",
        LAST_NAME : "",
    }

    return (
        <>
            {/* SIDEBAR */}``
            <section id="sidebar">
                <a className="brand">
                    <i className="bx bx bxs-taxi" />
                    <span className="text">Car Rental</span>
                </a>
                <ul className="side-menu top">
                    <li className={selectedToggle === "dashboard" ? "active" : ""}>
                        <a onClick={() => handleToggle("dashboard")}>
                            <i className="bx bx bx-dashboard" />
                            <span className="text">Dashboard</span>
                        </a>
                    </li>
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
                                <h3>{contractData ? contractData.length : 0}</h3>
                                <p>Contract</p>
                            </span>
                        </li>
                        <li>
                            <i className="bx bxs-group" />
                            <span className="text">
                                <h3>{userData ? userData.length : 0}</h3>
                                <p>Người dùng</p>
                            </span>
                        </li>
                        <li>
                            <i className="bx bxs-dollar-circle" />
                            <span className="text">
                                <h3>{carData ? carData.length : 0}</h3>
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
                                                setIsAddFormOpen(true);
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
                                            {
                                                userData && (
                                                    userData.length > 0 ? (
                                                        userData.map(user => (
                                                            <tr key={user.id}>
                                                                <td>{user.USER_ID}</td>
                                                                <td>{user.FIRST_NAME}</td>
                                                                <td>{user.LAST_NAME}</td>
                                                                <td>{user.EMAIL}</td>
                                                                <td>
                                                                    <div className="table-data-actions">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-primary"
                                                                            onClick={() => {
                                                                                setSelectedUser(user);
                                                                                handleOpenModal();
                                                                            }}
                                                                        >
                                                                            Xem
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-danger"
                                                                            onClick={() => handleUserDelete(user.USER_ID)}
                                                                        >
                                                                            Xóa
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="5">Không có người dùng</td>
                                                        </tr>
                                                    )
                                                )
                                            }



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
                                                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"
                                                                onClick={() => {
                                                                    setSelectedCar(car)
                                                                    handleOpenModal()
                                                                }}
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
                                                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"
                                                                onClick={() => {
                                                                    setSelectedContract(contract)
                                                                    handleOpenModal();
                                                                }}
                                                            >Xem
                                                            </button>
                                                            <button type="button" class="btn btn-danger" onClick={() => { handleContractDelete(contract.CONTRACT_ID) }}>Xóa</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {selectedToggle === "dashboard" && (

                                    <div className="container">
                                        <div className="row my-3">
                                            <div className="col">
                                                <h4>Doanh thu</h4>
                                            </div>
                                        </div>
                                        <div className="row my-2">
                                            <div className="col-md-6 py-1">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <canvas id="chLine" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 py-1">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <canvas id="chBar" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row py-2">
                                            <div className="col-md-4 py-1">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <canvas id="chDonut1" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 py-1">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <canvas id="chDonut2" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 py-1">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <canvas id="chDonut3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )}

                            </div>
                        </div>
                    </div>


                    <div className="info-modal-container" style={{ display: infoModalDisplay }}>
                        {selectedToggle === "users" && (
                            <div className="user-info-modal-container">
                                {selectedToggle === "users" && selectedUser && (
                                    <div className="user-info-modal">
                                        <h3 className="user-info-modal-title">Thông tin người dùng</h3>
                                        <div className="user-info-fields">
                                            {renderField("User ID", selectedUser.USER_ID, e => handleInputChange("USER_ID", e.target.value))}
                                            {renderField("First Name", selectedUser.FIRST_NAME, e => handleInputChange("FIRST_NAME", e.target.value))}
                                            {renderField("Last Name", selectedUser.LAST_NAME, e => handleInputChange("LAST_NAME", e.target.value))}
                                            {renderField("Email", selectedUser.EMAIL, e => handleInputChange("EMAIL", e.target.value))}
                                        </div>
                                        <div className="user-info-modal-actions">
                                            {!isEditing && (
                                                <div className="user-info-modal-btn">
                                                    <div className="user-info-modal-btn">
                                                        <button className="btn btn-primary" onClick={handleEditClick}>Chỉnh Sửa</button>
                                                        <button className="btn btn-primary" onClick={() => {

                                                            setSelectedUser(null)
                                                            handleCloseModal();
                                                        }
                                                        }>Đóng</button>
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
                                        <h3 className="car-info-modal-title">Thông tin xe</h3>
                                        <div className="car-info-fields">
                                            {renderField("Name", selectedCar.NAME, e => handleCarInputChange("NAME", e.target.value))}
                                            {renderField("License Plate", selectedCar.LICENSE_PLATE, e => handleCarInputChange("LICENSE_PLATE", e.target.value))}
                                            {renderField("Brand", selectedCar.BRAND, e => handleCarInputChange("BRAND", e.target.value))}
                                            {renderField("Price", selectedCar.PRICE_C, e => handleCarInputChange("PRICE_C", e.target.value))}
                                        </div>

                                        <div className="car-info-modal-actions">
                                            {!isEditing && (
                                                <div className="car-info-modal-btn">
                                                    <button className="btn btn-primary" onClick={handleEditClick}>Chỉnh Sửa</button>
                                                    <button className="btn btn-primary" onClick={() => {
                                                        setSelectedCar(null)
                                                        handleCloseModal()
                                                    }}>Đóng</button>
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
                                        <div className="contract-info-modal-title">Thông tin hợp đồng</div>
                                        <div className="contract-info-fields">
                                            {renderField("License Plate", selectedContract.LICENSE_PLATE, e => handleContractInputChange("LICENSE_PLATE", e.target.value))}
                                            {renderField("Start Date", selectedContract.START_DATE, e => handleContractInputChange("START_DATE", e.target.value))}
                                            {renderField("End Date", selectedContract.END_DATE, e => handleContractInputChange("END_DATE", e.target.value))}
                                            {renderField("Deposit Status", selectedContract.DEPOSIT_STATUS, e => handleContractInputChange("DEPOSIT_STATUS", e.target.value))}
                                            {renderField("Return Status", selectedContract.RETURN_STATUS, e => handleContractInputChange("RETURN_STATUS", e.target.value))}
                                        </div>
                                        <div className="contract-info-modal-actions">
                                            {!isEditing && (
                                                <div className="contract-info-modal-btn">
                                                    <button className="btn btn-primary" onClick={handleEditClick}>Chỉnh Sửa</button>
                                                    <button className="btn btn-primary" onClick={() => {
                                                        setSelectedContract(null)
                                                        handleCloseModal()
                                                    }}>Đóng</button>
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


                    <AddData
                        isOpen={isAddFormOpen}
                        selectedToggle={selectedToggle}
                        onClose={() => setIsAddFormOpen(false)}
                    />



                </main>
                {/* MAIN */}
            </section >
            {/* CONTENT */}
        </>
    );
}
export default Admin;