import React, { useContext, useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import "../styles/Transaction.css";
import UserContext from "../hooks/userProvider";

function Transaction() {
  const { userId } = useContext(UserContext);
  const [cars, setCars] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`http://127.0.0.1:8000/api/contract/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCars(data.data);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const handleTimer = (car) => {
    const dateString = car.END_DATE;

    const givenDate = new Date(dateString);

    const currentDate = new Date();

    const timeDifference = givenDate.getTime() - currentDate.getTime();

    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  const handleDelete = (car) => {
    console.log("Huy");
    fetch(`http://127.0.0.1:8000/api/contract/${car.CONTRACT_ID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        const updatedCars = cars.filter(
          (c) => c.CONTRACT_ID !== car.CONTRACT_ID
        );
        setCars(updatedCars);
      })
      .catch((e) => console.log(e));
  };

  const handleReturn = (car) => {
    console.log("Return");
    fetch(`http://127.0.0.1:8000/api/contract/${car.CONTRACT_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RETURN_STATUS: "Y",
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        const updatedCars = cars.map((c) => {
          if (c.CONTRACT_ID === car.CONTRACT_ID) {
            return { ...c, RETURN_STATUS: "Y" };
          }
        });
        setCars(updatedCars);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Layout>
      <div className="transction-history-container">
        <h1>Thông tin thuê xe</h1>
        <div className="info_container">
          <ul>
            {cars?.length > 0 ? (
              cars.map((car) => (
                <li>
                  <div className="row_1">
                    <h1>{car.NAME}</h1>
                    <div className="date">
                      <span>Ngày thuê: {car.START_DATE.split(" ")[0]}</span>
                      <br></br>
                      <span>Ngày trả: {car.END_DATE.split(" ")[0]}</span>
                    </div>
                  </div>
                  <div className="picture_container">
                    <img
                      src={require(`../assets/imageCars/${car.RIGHT_IMG}.jpg`)}
                      alt="Profile"
                    />
                    <img
                      src={require(`../assets/imageCars/${car.FRONT_IMG}.jpg`)}
                      alt="Profile"
                    />
                    <img
                      src={require(`../assets/imageCars/${car.LEFT_IMG}.jpg`)}
                      alt="Profile"
                    />
                    <img
                      src={require(`../assets/imageCars/${car.BACK_IMG}.jpg`)}
                      alt="Profile"
                    />
                  </div>
                  <div className="row_3">
                    <div className="timer">
                      {car.RETURN_STATUS === "Y" ? (
                        <p>Xe đã được trả!</p>
                      ) : (
                        <>
                          <p>Bạn sẽ trả xe sau:</p>
                          <span id="timer1">{handleTimer(car)} ngày nữa</span>
                        </>
                      )}
                    </div>
                    <div className="button-container">
                      {car.RETURN_STATUS === "Y" ? (
                        ""
                      ) : (
                        <>
                          <button
                            className="cancel"
                            onClick={() => handleDelete(car)}
                          >
                            Hủy
                          </button>
                          <button
                            className="receive"
                            onClick={() => handleReturn(car)}
                          >
                            Trả xe
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="danhsach">Danh sách xe đang thuê trống...</div>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Transaction;
