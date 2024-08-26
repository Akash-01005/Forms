import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const ForgotPassword = () => {
    const [email,setEmail] = useState();
    const navigate = useNavigate();

    
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3001/auth/forgot-password",{email:email})
        .then(result => {
            if(result.data.status){
                alert("Check your email for reset password link");
                navigate("/login");
            }
        })
        .catch(err => console.log(err))
    }
    console.log(email)

  return (
    <div className="container-fluid bg-info">
        <div className="row d-flex vh-100 justify-content-center align-items-center">
            <div className="col-4 rounded bg-white shadow p-3">
                <h2 className="text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-2">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control mt-2" onChange={(e)=>setEmail(e.target.value)} id="eamil"  />
                    </div>
                    <button className="btn btn-primary mt-3 w-100">Reset Password</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword
