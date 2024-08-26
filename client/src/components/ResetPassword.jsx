import axios from 'axios';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [pass,setPass] = useState();
    const navigate = useNavigate();
    const {token} = useParams();
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post(`http://localhost:3001/auth/reset-password/${token}`, { password: pass })
        .then(result => {
            if (result.data.status) {
                console.log(result.data.message);
                navigate("/login");
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

  return (
    <div className="container-fluid bg-info">
    <div className="row d-flex vh-100 justify-content-center align-items-center">
        <div className="col-4 rounded bg-white shadow p-3">
            <h2 className="text-center">Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-2">
                    <label htmlFor="pass">Password:</label>
                    <input type="password" className="form-control mt-2" onChange={(e)=>setPass(e.target.value)} id="pass"  />
                </div>
                <button className="btn btn-primary mt-3 w-100">Reset</button>
            </form>
        </div>
    </div>
</div> 
  )
}

export default ResetPassword