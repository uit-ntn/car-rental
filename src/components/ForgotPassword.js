import React from "react";

const ForgotPassword = () => (
    <form action="#!">
        <div className="row gy-2 overflow-hidden">
            <div className="col-12">
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="name@example.com"
                        required=""
                    />
                    <label htmlFor="email" className="form-label">Email</label>
                </div>
            </div>
            <div className="col-12">
                <div className="d-grid my-3">
                    <button className="btn btn-primary btn-lg" type="submit">Reset Password</button>
                </div>
            </div>
        </div>
    </form>
);

export default ForgotPassword;
