import React, { useEffect, useState } from "react";
import { useAuth } from '../hooks/useAuthentication';
import { useNavigate } from "react-router-dom";
import CarInfoModal from "../components/CarInfoModal";
import UserInfoModal from "../components/UserInfoModal";
import ContractInfoModal from "../components/ContractInfoModal";
import "../styles/Admin.css";

function Admin() {
    const contractAPI = "https://656d757bbcc5618d3c23335e.mockapi.io/car-rental/contract";
    const userAPI = "https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/user";
    const carAPI = "https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/car";
    const [userData, setUserData] = useState([]);
    const [carData, setCarData] = useState([]);
    const [contractData, setContractData] = useState([]);
    const [selectedToggle, setSelectedToggle] = useState("users");
    const [multiDeleteMode, setMultiDeleteMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selected_LINCENSE_PLATE, setSelected_LICENSE_PLATE] = useState(null);
    const [selectedContractId, setSelectedContractId] = useState(null);
    const [userInfoModalVisible, setUserInfoModalVisible] = useState(false);
    const [carInfoModalVisible, setCarInfoModalVisible] = useState(false);
    const [contractInfoModalVisible, setContractInfoModalVisible] = useState(false);


    const handleOpenUserInfoModal = (userId) => {
        setSelectedUserId(userId);
        setUserInfoModalVisible(true);
    };
    const handleOpenCarInfoModal = (LICENSE_PLATE) => {
        setSelected_LICENSE_PLATE(LICENSE_PLATE);
        setCarInfoModalVisible(true);
    };
    const handleOpenContractInfoModal = (CONTRACT_ID) => {
        setSelectedContractId(CONTRACT_ID);
        setContractInfoModalVisible(true);
    };
    const handleMultiDeleteToggle = () => {
        setMultiDeleteMode(!multiDeleteMode);
    };

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

    const handleMultiDelete = async () => {
        try {
            const checkboxes = document.querySelectorAll(`#${selectedToggle}Checkbox:checked`);
            const selectedIds = Array.from(checkboxes).map((checkbox) =>
                checkbox.getAttribute('data-id')
            );

            const promises = selectedIds.map((id) =>
                fetch(`${userAPI}/${id}`, {
                    method: 'DELETE',
                })
            );

            const responses = await Promise.all(promises);

            if (responses.every((response) => response.ok)) {
                setUserData((prevData) =>
                    prevData.filter((user) => !selectedIds.includes(user.USER_ID))
                );
            } else {
                throw new Error('Failed to delete some users');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async (api, setData) => {
        try {
            const response = await fetch(api);

            if (!response.ok) {
                throw new Error(`Failed to fetch data from ${api}`);
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(userAPI, setUserData);
        fetchData(carAPI, setCarData);
        fetchData(contractAPI, setContractData);
    }, [userAPI, carAPI, contractAPI]);
    useEffect(() => {
        const handleSideMenuClick = (item) => {
            const li = item.parentElement;
            document
                .querySelectorAll('#sidebar .side-menu.top li')
                .forEach((i) => i.classList.remove('active'));
            li.classList.add('active');

            setSelectedToggle(item.getAttribute("data-toggle"));
        };

        document
            .querySelectorAll('#sidebar .side-menu.top li a')
            .forEach((item) => {
                item.addEventListener('click', () => handleSideMenuClick(item));
            });

        const handleSidebarToggle = () => {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('hide');
        };

        document
            .querySelector('#content nav .bx.bx-menu')
            .addEventListener('click', handleSidebarToggle);




        return () => {
            document
                .querySelectorAll('#sidebar .side-menu.top li a')
                .forEach((item) => item.removeEventListener('click', handleSideMenuClick));
            document.querySelector('#content nav .bx.bx-menu').removeEventListener('click', handleSidebarToggle);
        };
    }, []);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            {/* SIDEBAR */}
            <section id="sidebar">
                <a className="brand">
                    <i className="bx bx bxs-taxi" />
                    <span className="text">Car Rental</span>
                </a>
                <ul className="side-menu top">
                    <li className={selectedToggle === "users" ? "active" : ""}>
                        <a data-toggle="users">
                            <i className="bx bxs-user" />
                            <span className="text">Danh sách người dùng</span>
                        </a>
                    </li>
                    <li className={selectedToggle === "cars" ? "active" : ""}>
                        <a data-toggle="cars">
                            <i className="bx bxs-car" />
                            <span className="text">Danh sách xe</span>
                        </a>
                    </li>
                    <li className={selectedToggle === "contracts" ? "active" : ""}>
                        <a data-toggle="contracts">
                            <i className="bx bx-file" />
                            <span className="text">Danh sách hợp đồng</span>
                        </a>
                    </li>
                    <li className={selectedToggle === "owner-register" ? "active" : ""}>
                        <a data-toggle="owner-register">
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
                            {selectedToggle === "users" && <h1>Danh sách người dùng</h1>}
                            {selectedToggle === "cars" && <h1>Danh sách xe</h1>}
                            {selectedToggle === "contracts" && <h1>Danh sách hợp đồng</h1>}
                            {selectedToggle === "owner-register" && <h1>Danh sách xe đăng ký</h1>}
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
                                <p>User</p>
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
                        <div className="table-data">
                            <div className="order">
                                <div className="head">
                                    <h3>{selectedToggle === "dashboard" ? "Dashboard" : `Danh sách ${selectedToggle === "users" ? "người dùng" : selectedToggle === "cars" ? "xe" : selectedToggle === "contracts" ? "hợp đồng" : "xe đăng ký"}`}</h3>
                                    <div className="head-actions">
                                        {multiDeleteMode ? (
                                            <button onClick={handleMultiDeleteToggle}>Hủy</button>
                                        ) : (
                                            <div>
                                                <button>Thêm</button>
                                                <button onClick={handleMultiDeleteToggle}>Xóa nhiều</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                        {selectedToggle === "cars" && (
                                            <tr>
                                                <th>NAME</th>
                                                <th>LICENSE_PLATE</th>
                                                <th>BRAND</th>
                                                <th>PRICE_C</th>
                                                <th>Action</th>
                                            </tr>
                                        )}
                                        {selectedToggle === "users" && (
                                            <tr>
                                                <th>User ID </th>
                                                <th>First name</th>
                                                <th>Last name</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        )}
                                        {selectedToggle === "contracts" && (
                                            <tr>
                                                <th>USER_ID</th>
                                                <th>LICENSE_PLATE</th>
                                                <th>BRAND</th>
                                                <th>PRICE_C</th>
                                                <th>Action</th>
                                            </tr>
                                        )}
                                    </thead>


                                    <tbody>
                                        {selectedToggle === "users" && userData.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.USER_ID}</td>
                                                <td>{user.FIRST_NAME}</td>
                                                <td>{user.LAST_NAME}</td>
                                                <td>{user.EMAIL}</td>
                                                <td>
                                                    <div className="table-data-actions">
                                                        <div>
                                                            {multiDeleteMode && (
                                                                <input type="checkbox" id={`userCheckbox-${user.id}`} />
                                                            )}
                                                            {!multiDeleteMode && (
                                                                <div>
                                                                    <button onClick={() => handleOpenUserInfoModal(user.USER_ID)}>Xem</button>
                                                                    <button onClick={() => handleUserDelete(user.USER_ID)}>Xóa</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                        {selectedToggle === "cars" && carData.map(car => (
                                            <tr key={car.id}>
                                                <td>{car.NAME}</td>
                                                <td>{car.LICENSE_PLATE}</td>
                                                <td>{car.BRAND}</td>
                                                <td>{car.PRICE_C}</td>
                                                <td>
                                                    <div className="table-data-actions">
                                                        <div>
                                                            {multiDeleteMode && (
                                                                <input type="checkbox" id={`carCheckbox-${car.id}`} />
                                                            )}
                                                            {!multiDeleteMode && (
                                                                <div>
                                                                    <button onClick={handleOpenCarInfoModal(car.LICENSE_PLATE)}>Xem</button>
                                                                    <button onClick={() => handleCarDelete(car.LICENSE_PLATE)}>Xóa</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {selectedToggle === "contracts" && contractData.map(contract => (
                                            <tr key={contractData.USER_ID}>
                                                <td>{contract.NAME}</td>
                                                <td>{contract.LICENSE_PLATE}</td>
                                                <td>{contract.BRAND}</td>
                                                <td>{contract.PRICE_C}</td>
                                                <td>
                                                    <div className="table-data-actions">
                                                        <div>
                                                            {multiDeleteMode && (
                                                                <input type="checkbox" id={`carCheckbox-${contract.id}`} />
                                                            )}
                                                            {!multiDeleteMode && (
                                                                <div>
                                                                    <button onClick={handleOpenContractInfoModal()}>Xem</button>
                                                                    <button onClick={() => handleCarDelete(contract.LICENSE_PLATE)}>Xóa</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    {multiDeleteMode && (
                                        <tr>
                                            <td colSpan="3">
                                                <div>
                                                    <button onClick={handleMultiDelete}>Xóa tất cả mục đã chọn</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {userInfoModalVisible && (
                                        <UserInfoModal USER_ID={selectedUserId} onclose={() => setUserInfoModalVisible(false)} />
                                    )}
                                    {
                                        carInfoModalVisible && (
                                            <CarInfoModal LICENSE_PLATE={selected_LINCENSE_PLATE} onClose={() => setCarInfoModalVisible(false)}></CarInfoModal>
                                        )}
                                    {
                                        contractInfoModalVisible &&
                                        <ContractInfoModal CONTRACT_ID={selectedContractId} onclose={() => setContractInfoModalVisible(false)}></ContractInfoModal>
                                    }

                                </table>
                            </div>
                        </div>
                    </div>
                </main>
                {/* MAIN */}
            </section >
            {/* CONTENT */}
        </>
    );
}
export default Admin;