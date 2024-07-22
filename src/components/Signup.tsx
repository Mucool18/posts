import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Input from './Input';
import { UserContext } from '../context/userContext';
type SignUpPropsType = {
  close?: ()=>void,
  setLoginOpen?: ()=>void
}
const Signup = ({close, setLoginOpen}:SignUpPropsType) => {
    const [username , setUsername] = useState<string>("");
    const [email , setEmail] = useState<string>("");
    const [errorString , setErrorString] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const {setCurrentUser} = useContext(UserContext);
    const navigate = useNavigate();
    const usernameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const emailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((isPasswordVisible)=>!isPasswordVisible);
    };
    const handleSignUp = ()=>{
      if(!username || !email || !password){
        setErrorString("All fields are required");
        return;
      }
      const user = {
        username,
        email,
        password,
        isLoggedIn: true
      }
      setCurrentUser(user);
      if(close ){
        close();
      }else{
        navigate("/", { replace: true });
      }
      
    }
    const navigateToLogin = () => {
      if(setLoginOpen && close){
        close();
        setLoginOpen()
      }else{
        navigate("/login", { replace: true });
      }
    }

    return (
        <div className='flex flex-col justify-center items-center h-[100vh]'>
          {!close && <div className=''>
            <img src="../../public/Logo_.svg" alt="logo" />
          </div>}
          <div className=' border-2 border-[#969696] border-solid rounded-lg p-3 w-[90%] lg:w-[40%] 2xl:w-[30%] md:w-[60%] mt-[40px] bg-[#343434]'>
            {close && <div onClick={close} className='bg-[#000000] w-7 h-7 relative left-[87%] lg:left-[95%] top-[10px] text-center rounded-2xl z-10  cursor-pointer text-[#ffffff]'>
                      x
            </div>}
            <div className='flex flex-col justify-center items-center'>
              <div className='text-[#6B6C70] text-[14px] font-medium font-inter mb-[5px] mt-[30px]'>SIGN UP</div>
              <div className='text-[#FFFFFF] text-[18px] font-semibold font-inter mb-[40px]'>Create an account to continue</div>
              {errorString && <div className='text-red-600 text-[14px] font-medium font-inter leading-[16.94px] mt-1'>{errorString}</div>}
              {/* create a input component */}
              <Input placeholder='Enter your email' label='Email' type='text' handler={emailInputHandler} showForget={false} value={email} styles=''/>
              <Input placeholder='Choose a preferred username' label='Username' type='text' handler={usernameInputHandler} showForget={false} value={username} styles=''/>
              <Input placeholder='Choose a strong password' label='Password' type='password' handler={handlePasswordInput}  styles='' showForget={true} value={password} isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility}/>
              <button onClick={handleSignUp} className='w-[95%] mt-[25px] px-[12px] py-[15px] cursor-pointer bg-[#4A96FF] rounded-[4px] text-[#ffffff] text-[16px] font-medium font-inter leading-[19.36px] hover:bg-[#ffffff] hover:text-[#4A96FF]'>Continue</button>
            
            </div>
            <div className='mt-[25px] ml-4 flex-start mb-[30px]'>
              <span className='text-[#7F8084] text-[14px] font-medium font-inter leading-[16.94px]'>Already have an account?</span>
              <span onClick={navigateToLogin} className='text-[#ffffff] text-[14px] relative left-0 font-medium font-inter leading-[16.94px] ml-[5px] cursor-pointer'>Login --&gt;</span>
            </div>
          </div>
        </div>
        
      )
}

export default Signup