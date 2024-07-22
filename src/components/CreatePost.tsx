/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../context/post context';
import { UserContext } from '../context/userContext';


type Post = {
    user: string;
    image: string;
    time: number;
    content: string;
    comments?: string[];
    emoji: string;
    isEdited: boolean,
    id:number
  
  }
interface PostProps {
    isCreatePost: boolean,
    openModal: ()=>void,
    currentPost?: Post
}
const CreatePost = ({isCreatePost, openModal, currentPost}: PostProps) => {
    const {currentUser} = useContext(UserContext)
    const [postContent , setPostContent] = useState<string>("");
    const {posts, addPost, editPost} = useContext(PostContext);
    const [isEdited, setIsEditable] = useState(true);

    useEffect(()=>{
        if(!isCreatePost){
            setIsEditable(false);
            if(currentPost){
                setPostContent(currentPost.content)
            }
        }
    },[])
    const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(e.target.value);
    };
    const createPost = ()=>{
        if(!currentUser){
            openModal();
            return;
        }
        if(postContent.length && postContent.length >0){
            let emoji="😍";
            if(postContent.includes("sad")){
                emoji = '😞'
            }else if(postContent.includes("happy")){
                emoji += '😀'
            }else if(postContent.includes("hii")){
                emoji = "👋"
            }else if (postContent.includes("emotional")){
                emoji = "🥺"
            }else if(postContent.includes("angry")){
                emoji = "😡"
            }
            const postObj = {
                user: currentUser?currentUser.username:"",
                comment: ["THis is a comment"],
                image: 'https://media.istockphoto.com/id/1289138199/photo/two-senior-men-with-arms-outstretched-at-park.jpg?s=2048x2048&w=is&k=20&c=URWMAKQwaDw8ZJXD2Tfiumgq47KTpX0mU766GNcNXg4=',
                time: Date.now(),
                content: postContent,
                isEdited: false,
                emoji,
                id: posts.length + 1
            }
            addPost(postObj);
            setPostContent("")
        }
    }
    const editCurrentPost = (post?:Post)=>{
        if(!currentUser){
            openModal();
            return;
        }
        if(post && post.content.length && postContent){
            let emoji="😍";
            if(postContent.includes("sad")){
                emoji = '😞'
            }else if(postContent.includes("happy")){
                emoji = '😀'
            }else if(postContent.includes("hii")){
                emoji = "👋"
            }else if (postContent.includes("emotional")){
                emoji = "🥺"
            }else if(postContent.includes("angry")){
                emoji = "😡"
            }
            post.emoji= emoji;
            post.content = postContent;
            post.isEdited = true;
            editPost(post);
            setIsEditable(false);
        }
    }
  return (
    <div className='w-[100%] bg-[#35373B] px-5 py-8 rounded-[8px]'>
        <div className='flex justify-between items-center'>
            {isCreatePost && <div className='text-[#C5C7CA] text-[18px] font-medium font-inter leading-[21.78px]'>Create Post</div>}
            {!isCreatePost && currentPost &&
                <div className='flex'>
                    <img className='w-12 h-12 rounded-3xl ' src={currentPost.image} alt="" />
                    <div className='ml-[10px]'>
                        <div className='text-[#C5C7CA] text-[16px] font-medium font-inter leading-[19.36px] mb-[5px]'>{currentPost.user}</div>
                        <div className='text-[#7F8084] text-[14px] font-medium font-inter leading-[16.94px]'>
                            {Math.round((Date.now() - currentPost.time)/60*60*1000) }mins ago 
                            {currentPost.isEdited &&
                                <span>• Edited</span>
                            }
                        </div>
                    </div>
                </div>
            }
            {!isCreatePost && <div onClick={()=> setIsEditable((edit=> !edit))} className='text-[#C5C7CA] text-[18px] font-medium font-inter leading-[21.78px]'>...</div>}
        </div>
        
        <div className='mt-5 w-[100%] bg-[#191920] p-8 rounded-lg '>
            <span className='aboslute mt-10 w-2 h-2 rounded-3xl bg-[#27292D] p-4'>{currentPost && currentPost.emoji ? currentPost.emoji :'💬'}</span>
            <div>
                <textarea 
                    placeholder='How are you feeling today?' 
                    disabled={!isEdited}
                    onChange={inputHandler}
                    rows={3}
                    value={postContent} 
                    className='block ml-[60px] mt-[-25px] w-[85%] text-[#ffffff] text-[16px] font-normal font-inter leading-[19.36px] rounded-sm bg-[#191920] border-none active:border-none focus:outline-none'
                ></textarea>
            </div>
        </div>
        <div className='flex items-end justify-end mt-8' >
            {isCreatePost && <button 
                onClick={createPost} 
                className='bg-[#4A96FF] px-9 py-3 text-[#FFFFFF] text-[16px] font-medium font-inter leading-[19.36px] cursor-pointer rounded-md hover:bg-[#ffffff] hover:text-[#4A96FF]'
            >
                Post
            </button>}
            {!isCreatePost && isEdited && <button 
                onClick={()=>{editCurrentPost(currentPost)}} 
                className='bg-[#4A96FF] px-9 py-3 text-[#FFFFFF] text-[16px] font-medium font-inter leading-[19.36px] cursor-pointer rounded-md hover:bg-[#ffffff] hover:text-[#4A96FF]'
            >
                Edit
            </button>}
        </div>
    </div>
  )
}

export default CreatePost