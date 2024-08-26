import { Route, Routes } from "react-router-dom"
import { ForgotPassword, Home, Login, ResetPassword, SignUp } from "./components"


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}> </Route>
      <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
    </Routes>
    </>
  )
}

export default App