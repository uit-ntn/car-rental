import React, { useState, useEffect } from "react";

function ContractInfoModal({ CONTRACT_ID , onclose}) {
  const contractAPI = `https://656d757bbcc5618d3c23335e.mockapi.io/car-rental/contract${CONTRACT_ID}`;
  const [contractData, setContractData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const response = await fetch(contractAPI);
        if (!response.ok) {
          throw new Error("Failed to fetch contract data");
        }

        const data = await response.json();
        setContractData(data);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    };

    fetchContractData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(contractAPI, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
      });

      if (!response.ok) {
        throw new Error("Failed to save contract data");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving contract data:", error);
    }
  };

  

  const renderField = (label, value) => {
    return (
      <div>
        <p>{label} :</p>
        {isEditing ? (
          <input
            type="text"
            value={contractData[label]}
            onChange={(e) =>
              setContractData((prevData) => ({ ...prevData, [label]: e.target.value }))
            }
          />
        ) : (
          <p>{value}</p>
        )}
      </div>
    );
  };

  if (!contractData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="contract-info-modal-container">
      {renderField("Contract ID", contractData.CONTRACT_ID)}
      {renderField("User ID", contractData.USER_ID)}
      {renderField("License Plate", contractData.LICENSE_PLATE)}
      {renderField("Start Date", contractData.START_DATE)}
      {renderField("End Date", contractData.END_DATE)}
      {renderField("Deposit Status", contractData.DEPOSIT_STATUS)}
      {renderField("Return Status", contractData.RETURN_STATUS)}
      <div className="contract-info-modal-actions">
        <div>
          <button onClick={handleEditClick}>Chỉnh Sửa</button>
          <button>Xóa</button>
          <button onClick={onclose}>Đóng</button>
        </div>
        {isEditing && (
          <div>
            <button onClick={handleSaveClick}>Lưu</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractInfoModal;
