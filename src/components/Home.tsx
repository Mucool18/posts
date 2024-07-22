
import { useContext, useState } from 'react'
import CreatePost from './CreatePost'
import { UserContext } from '../context/userContext'
import { PostContext } from '../context/post context';
import Modal from './Modal';
import Signup from './Signup';
import Login from './Login';

const Home = () => {
const [isOpen, setModalOpen] = useState(false);
const [isLoginOpen, setLogingOpen] = useState(false);
const {currentUser} = useContext(UserContext);
const {posts} = useContext(PostContext);

  return (
    <div className='flex overflow-y-scroll overflow-x-hidden flex-col justify-center items-center'>
        <div className='mt-[50px] w-[95%] md:w-[90%] lg:w-[50%] flex flex-col justify-start items-start'>
            <div className='text-[#C5C7CA] text-[28px] font-medium font-inter leading-[33.89px] mb-2'>
                Hello {currentUser? currentUser.username : "User"}
            </div>
            <div className='text-[#7F8084] text-[16px] font-normal font-inter leading-[24px] w-[80%] '>
                How are you doing today? Would you like to share something with the community 🤗
            </div>
            <div className='mt-[40px] w-[100%]'>
                <CreatePost openModal={()=>{setModalOpen(true)}} isCreatePost={true}/>
            </div>
            <div className='mt-[30px] w-[100%]'>
                {
                    posts.map((post)=>(
                        <div className='mb-10' key={post.id}>
                            <CreatePost  currentPost={post} openModal={()=>{setModalOpen(true)}} isCreatePost={false}/>
                        </div>
                        
                    ))
                }
                
            </div>
        </div>
        {isOpen && <Modal isOpen={isOpen} close={()=>{setModalOpen(false)}}>
            <Signup close={()=>{setModalOpen(false)}} setLoginOpen={()=>{setLogingOpen((login)=>!login)}}/>
        </Modal>}
        {isLoginOpen && <Modal isOpen={isLoginOpen} close={()=>{setLogingOpen(false)}}>
            <Login close={()=>{setLogingOpen(false)}} openSignup={()=>{setModalOpen(true)}}/>
        </Modal>}
    </div>
  )
}

export default Home