import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [uname, setUname] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:3001/auth/signup", { username: uname, email: email, password: pass })
        .then(result =>{
            console.log(result.data.message)
            if(result.data.message == "User already exists"){
                navigate("/login");
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="container-fluid bg-info">
            <div className="row d-flex vh-100 justify-content-center align-items-center">
                <div className="col-4 rounded bg-white shadow p-3">
                    <h2 className="text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="uname">Username:</label>
                            <input type="text" className="form-control mt-2" onChange={(e) => setUname(e.target.value)} id="uname" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control mt-2" onChange={(e) => setEmail(e.target.value)} id="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Password:</label>
                            <input type="password" className="form-control mt-2" onChange={(e) => setPass(e.target.value)} id="pass" required />
                        </div>
                        <button className="btn btn-primary mt-2 w-100">Sign Up</button>
                    </form>
                    <p className="mt-3 text-center">Already have an Account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
