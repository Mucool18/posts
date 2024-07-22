import  { ReactNode } from 'react'
type ModalProps = {
    isOpen:boolean,
    close :()=>void,
    children: ReactNode
}
const Modal = ({isOpen, children}:ModalProps) => {

    if(!isOpen){
        return null;
    }
  return (
    <div className='bg-[rgba(0,0,0,0.5)] fixed w-[100%] h-[100%]'>
        <div className=" w-[100%] fixed top-[0%] left-[0%] shadow-2xl ">
            <div>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal