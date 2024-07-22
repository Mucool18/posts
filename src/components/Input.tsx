import React from "react"

interface PropTypes {
    label: string,
    type: string,
    placeholder: string,
    value: string|number,
    handler:(e: React.ChangeEvent<HTMLInputElement>) => void,
    styles:string|null,
    showForget: boolean,
    togglePasswordVisibility?: () => void;
    isPasswordVisible?: boolean;
}

const Input = ({label, type, placeholder, handler, value, styles, showForget, isPasswordVisible, togglePasswordVisibility }:PropTypes) => {
  return (
    <div className="w-[95%]">
        <div className="my-[13px] flex justify-between items-center">
            <div className="text-[#C5C7CA] text-[14px] font-medium font-inter leading-[16.94px] ">{label}</div>
            {showForget && <div className="text-[#C5C7CA] text-[14px] font-medium font-inter leading-[16.94px] cursor-pointer ">Forgot Password ?</div>}
        </div>
        <div>
            <input type={isPasswordVisible && type === 'password' ? 'text' : type} placeholder={placeholder} onChange={handler} value={value} className={`${styles} p-[12px] border-[1.5px] border-gray-700 w-[100%] text-[#ffffff] text-[16px] font-normal font-inter leading-[19.36px] rounded-sm bg-[#343434] border-solid`} />
            {type === 'password' && (
            <span
                onClick={togglePasswordVisibility}
                className="absolute ml-[-30px] mt-[10px] cursor-pointer"
            >
                {isPasswordVisible ? '🙈' : '👁️'}
            </span>
            )}
        </div>
    </div>
  )
}

export default Input