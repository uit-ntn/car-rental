import React from "react";
import AccountLayout from "../layouts/UserLayout";

const Account = () => {
  return (
    <AccountLayout>
      <div className="row">
        <div className="col-md-4">
          <div className="d-flex justify-content-center">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="rounded-circle"
              width="150"
              height="150"
            />
          </div>
          <h5 className="text-center mt-3">Denis Holland</h5>
          <p className="text-center">Balance: 38.00$</p>
        </div>
        <div className="col-md-8">
          <h3>Personal Information</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstName" placeholder="First name" />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastName" placeholder="Last name" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Email" />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="text" className="form-control" id="phone" placeholder="Phone" />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <div>
                <input type="radio" id="male" name="gender" value="male" /> <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female" /> <label htmlFor="female">Female</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary ml-3">Cancel</button>
          </form>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Account;
