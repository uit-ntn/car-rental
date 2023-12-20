import React, { useEffect, useState } from "react";
import { useAuth } from '../hooks/useAuthentication';
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

function Admin() {
    const contractAPI = "";
    const userAPI = "";
    const carAPI = "";
    const [userData, setUserData] = useState([]);
    const [carData, setCarData] = useState([]);
    const [contractData, setContractData] = useState([]);
    const [selectedToggle, setSelectedToggle] = useState("dashboard");

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

        const handleSearchButtonClick = (e) => {
            const searchForm = document.querySelector('#content nav form');
            const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');

            if (window.innerWidth < 576) {
                e.preventDefault();
                searchForm.classList.toggle('show');

                if (searchForm.classList.contains('show')) {
                    searchButtonIcon.classList.replace('bx-search', 'bx-x');
                } else {
                    searchButtonIcon.classList.replace('bx-x', 'bx-search');
                }
            }
        };

        document
            .querySelector('#content nav form .form-input button')
            .addEventListener('click', handleSearchButtonClick);

        const handleModeSwitchChange = () => {
            const switchMode = document.getElementById('switch-mode');
            document.body.classList.toggle('dark', switchMode.checked);
        };

        document.getElementById('switch-mode').addEventListener('change', handleModeSwitchChange);

        return () => {
            document
                .querySelectorAll('#sidebar .side-menu.top li a')
                .forEach((item) => item.removeEventListener('click', handleSideMenuClick));
            document.querySelector('#content nav .bx.bx-menu').removeEventListener('click', handleSidebarToggle);
            document.querySelector('#content nav form .form-input button').removeEventListener('click', handleSearchButtonClick);
            document.getElementById('switch-mode').removeEventListener('change', handleModeSwitchChange);
        };
    }, [userAPI, carAPI, contractAPI]);

    useEffect(() => {
        const handleResize = () => {
            const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
            const searchForm = document.querySelector('#content nav form');
            const sidebar = document.getElementById('sidebar');

            if (window.innerWidth < 576) {
                searchButtonIcon.classList.replace('bx-x', 'bx-search');
                searchForm.classList.remove('show');
            }

            if (window.innerWidth < 768) {
                sidebar.classList.add('hide');
            } else {
                sidebar.classList.remove('hide');
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
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
                    <li className={selectedToggle === "dashboard" ? "active" : ""}>
                        <a data-toggle="dashboard">
                            <i className="bx bxs-dashboard" />
                            <span className="text">Dashboard</span>
                        </a>
                    </li>
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
                    <form action="#">
                        <div className="form-input">
                            <input type="search" placeholder="Search..." />
                            <button type="submit" className="search-btn">
                                <i className="bx bx-search" />
                            </button>
                        </div>
                    </form>
                    <input type="checkbox" id="switch-mode" hidden="" />
                    <label htmlFor="switch-mode" className="switch-mode" />
                    <a className="profile">
                        <img alt="" src="img/people.png" />
                    </a>
                </nav>
                {/* NAVBAR */}

                {/* MAIN */}
                <main>
                    <div className="head-title">
                        <div className="left">
                            {selectedToggle === "dashboard" && <h1>Dashboard</h1>}
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
                                <p>Total Sales</p>
                            </span>
                        </li>
                    </ul>

                    {/* table data section */}
                    <div className="table-data-toggle">
                        <div className="table-data">
                            <div className="order">
                                <div className="head">
                                    {selectedToggle === "dashboard" && <h3>Dashboard</h3>}
                                    {selectedToggle === "users" && <h3>Danh sách người dùng</h3>}
                                    {selectedToggle === "cars" && <h3>Danh sách xe</h3>}
                                    {selectedToggle === "contracts" && <h3>Danh sách hợp đồng</h3>}
                                    {selectedToggle === "owner-register" && <h3>Danh sách xe đăng ký</h3>}
                                </div>

                                {selectedToggle === "dashboard" && (
                                    <table>
                                        {/* Dashboard table content */}
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Date Order</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img alt="" src="img/people.png" />
                                                    <p>John Doe</p>
                                                </td>
                                                <td>01-10-2021</td>
                                                <td>
                                                    <span className="status completed">Completed</span>
                                                </td>
                                            </tr>
                                            {/* Add more rows if needed */}
                                        </tbody>
                                    </table>
                                )}

                                {selectedToggle === "users" && (
                                    <table>
                                        {/* Users table content */}
                                        <thead>
                                            <tr>
                                                {/* User table headers */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {/* User table rows */}
                                            </tr>
                                            {/* Add more rows if needed */}
                                        </tbody>
                                    </table>
                                )}

                                {selectedToggle === "cars" && (
                                    <table>
                                        {/* Cars table content */}
                                        <thead>
                                            <tr>
                                                {/* Cars table headers */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {/* Cars table rows */}
                                            </tr>
                                            {/* Add more rows if needed */}
                                        </tbody>
                                    </table>
                                )}

                                {selectedToggle === "contracts" && (
                                    <table>
                                        {/* Contracts table content */}
                                        <thead>
                                            <tr>
                                                {/* Contracts table headers */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {/* Contracts table rows */}
                                            </tr>
                                            {/* Add more rows if needed */}
                                        </tbody>
                                    </table>
                                )}
                                {selectedToggle === "owner-register" && (
                                    <table>
                                        {/* Owner Register table content */}
                                        <thead>
                                            <tr>
                                                {/* Owner Register table headers */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {/* Owner Register table rows */}
                                            </tr>
                                            {/* Add more rows if needed */}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            <div className="todo">
                                <div className="head">
                                    <h3>Biểu đồ doanh thu trong năm {new Date().getFullYear()}</h3>
                                </div>
                                <ul className="revenue-chart">
                                    {Array.from({ length: 12 }, (_, index) => (
                                        <li key={index} className={index < 3 ? "completed" : "not-completed"}>
                                            <p>{`Tháng ${index + 1}`}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
                {/* MAIN */}
            </section>
            {/* CONTENT */}
        </>
    );
}

export default Admin;
