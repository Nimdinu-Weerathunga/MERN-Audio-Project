import { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()

    function handleOnSubmit(e){
        e.preventDefault()
        console.log(email,password)

        axios.post("http://localhost:3000/api/users/login",
          {
            email : email,
            password :password
          }).then((res)=>{

            console.log(res)
            toast.success("Login Success")
            const user = res.data.user
            localStorage.setItem("token",res.data.token)

            if(user.role === "admin"){
             navigate("/admin")
            }else{
             navigate("/")
            }
            
            
          }).catch((err)=>{
            console.log(err)
            toast.error(err.response.data.error)
          })
        

    }

    return(
         <div className="flex items-center justify-center min-h-screen bg-slate-200">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-gray-500 mb-6">Welcome Back!</h2>
  
          <form onSubmit={handleOnSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-500 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                value={email}
                onChange={
                    (e)=>{
                        setEmail(e.target.value)
                }
            }
              />
            </div>
  
            <div>
              <label className="block text-gray-500 font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                value={password}
                onChange={
                    (e)=>{
                        setPassword(e.target.value)
                }
            }
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-gray-500 text-white py-3 rounded-lg font-medium text-lg hover:bg-gray-600 transition duration-300"
            >
              Login
            </button>
          </form>

        </div>
      </div>
    )
}