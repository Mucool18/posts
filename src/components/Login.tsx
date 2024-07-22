import React, { useContext, useState } from 'react'
import Input from './Input'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

type LoginPropType = {
  close?: ()=> void,
  openSignup?:()=>void
}
const Login = ({close, openSignup}:LoginPropType) => {
  const [inputValue , setInputValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {currentUser, loginCurrentUser} = useContext(UserContext);
  const [errorString , setErrorString] = useState<string>("");
  const navigate = useNavigate();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((isPasswordVisible)=>!isPasswordVisible);
  };
  const handleLogin = ()=>{
    if(!currentUser || !currentUser.isLoggedIn){
      navigateToRegister();
      return
    }
    if(!inputValue || !password){
      setErrorString("Please fill the credentials");
      return
    }
    if(currentUser.password == password && (currentUser.username == inputValue || currentUser.email == inputValue)){
      loginCurrentUser(currentUser);
      if(close){
        close();
      }else{
        navigate("/", { replace: true });
      }
    }else{
      setErrorString("Invalid credentials !!")
    }
    
  }
  const navigateToRegister = ()=>{
    if(close && openSignup){
      close();
      openSignup();
    }else{
      navigate("/signup", { replace: true });
    }
    
  }

  return (
    <div className='flex flex-col justify-center items-center h-[100vh]'>
      {!close && <div className=''>
        <img src="../../public/Logo_.svg" alt="logo" />
      </div>}
      
      <div className=' border-2 border-[#969696] border-solid rounded-lg p-3 mt-[40px] w-[90%] lg:w-[40%] 2xl:w-[30%] md:w-[60%]  bg-[#343434]'>
        {close && <div onClick={close} className='bg-[#000000] w-7 h-7 relative left-[85%] text-center rounded-2xl z-10  cursor-pointer text-[#ffffff]'>
                  x
        </div>}
        <div className='flex flex-col justify-center items-center'>
          <div className='text-[#6B6C70] text-[14px] font-medium font-inter mb-[5px] mt-[30px]'>WELCOME BACK</div>
          <div className='text-[#FFFFFF] text-[18px] font-semibold font-inter mb-[40px]'>Log into your account</div>
          {errorString && <div className='text-red-600 text-[14px] font-medium font-inter leading-[16.94px] mt-1'>{errorString}</div>}
          {/* create a input component */}
          <Input placeholder='Enter you email or username' label='Email or Username' type='text' handler={inputHandler} showForget={false} value={inputValue} styles=''/>
          <Input placeholder='Enter you password' label='Password' type='password' handler={handlePasswordInput} showForget={true} value={password} styles='' isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility} />
          <button onClick={handleLogin} className='w-[95%] mt-[25px] px-[12px] py-[15px] cursor-pointer bg-[#4A96FF] rounded-[4px] text-[#ffffff] text-[16px] font-medium font-inter leading-[19.36px] lg:hover:bg-[#ffffff] lg:hover:text-[#4A96FF]'>Login now</button>
        
        </div>
        <div className='mt-[25px] ml-4 flex-start mb-[30px]'>
          <span className='text-[#7F8084] text-[14px] font-medium font-inter leading-[16.94px]'>Not registered yet?</span>
          <span onClick={navigateToRegister} className='text-[#ffffff] text-[14px] relative left-0 font-medium font-inter leading-[16.94px] ml-[5px] cursor-pointer'>Register --&gt;</span>
        </div>
      </div>
    </div>
    
  )
}

export default Login