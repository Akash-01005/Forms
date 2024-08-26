import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email,setEmail] = useState();
    const [pass,setPass] = useState();
    const [data,setData] = useState();
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3001/auth/login",{email:email,password:pass})
        .then(result=>{setData(result.data)
            if(result.data.message == "Authorized User"){
                    navigate("/")
            }
        })
        .catch(err=>console.log(err))
    }
    console.log(pass)

    console.log(data)

  return (
    <div className="container-fluid bg-info">
        <div className="row d-flex vh-100 justify-content-center align-items-center">
            <div className="col-md-6 col-lg-4 rounded bg-white shadow p-3">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control mt-2" onChange={(e)=>setEmail(e.target.value)} id="email" />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="pass">Password:</label>
                        <input type="password" className="form-control mt-2" onChange={(e)=>setPass(e.target.value)} id="pass"  />
                    </div>
                    <button className="btn btn-primary mt-3 w-100">Login</button>
                </form>
                <p className="mt-3 text-center">
                     <Link to="/forgotPassword">Forgot Password?</Link>
                </p>
                <p className="mt-3 text-center"> {"Don't"} have an Account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login