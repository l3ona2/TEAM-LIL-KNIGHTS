import React from 'react'
import {useForm} from 'react-hook-form'
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

import axios from 'axios'
function Login() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  // error state
let [error, setError] = useState("");

  let navigate=useNavigate()
  let addNewUser=(newUser)=>{
    // make http post to save New User to local api
    axios
    .post("http://localhost:4002/login",newUser)
    .then((response) => {
        if (response.message === "Login success") {
            //navigate to login component
            navigate('/')
        }
        else{
            setError(response.data.message)
        }
    })
    .catch((err) => {
        //console.log("err is",err)
        //the client is given an error response (5xx,4xx)
        if (err.response) {
            setError(err.message);
        }
        //the client never recieved a response
        else if (err.request) {
            setError(err.message);
        }
        //for other error
        else {
            setError(err.messaage);
        }
    })

  }
  return (
    <div className='login-form text-center'>
      <div className='row mt-5'>
        <div className='col-9 col-sm-8 col-md-6 mx-auto'>
        <h1 className='head text-center mb-4'>Log-in</h1>
      <form onSubmit={handleSubmit(addNewUser)}>
        <div className='mb-3'>
          <input type="text" id='name' className='form-control p-3' placeholder='Username'
          {...register("name",{required:true})}></input>
          {/*Validation */}
          {errors.name?.type==="required"&&
          <p className='text-danger'>*Username is required</p>}
        </div>
        <div className='mb-3'>
          
          <input type="password" id='password' className='form-control p-3' placeholder='Password'
          {...register("password",{required:true,minLength:6})}></input>
          {errors.password?.type==="required"&&
          <p className='text-danger'>*Password is required</p>}
          {errors.password?.type==="minLength"&&
          <p className='text-danger'>*Password must be atleast 6 characters long</p>}
          </div>
          <div className='mb-3' >
          <Form.Select className='form-control' id="post" {...register("post",{required:true})}
          >
      <option>Select Post</option>
      <option value="1">Admin</option>
      <option value="2">User</option>
    </Form.Select>
        </div>
        
       
        <button type="submit"  className='btn bg-dark text-centre text-white mx-auto'>Login</button>
      </form>
        </div>
      </div>
      
    </div>
  )
}

export default Login;