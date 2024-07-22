import { ReactNode, createContext, useEffect, useReducer } from "react";


interface Post {
  user: string;
  image: string;
  time: number;
  content: string;
  comments?: string[];
  emoji: string;
  isEdited: boolean,
  id:number

}


interface PostContextType {
  posts: Post[] | [];
  addPost: (post:Post)=> void;
  editPost: (post:Post)=> void;
}


export const PostContext = createContext<PostContextType>({
  posts: [],
  addPost: () => null,
  editPost: ()=>null
});

const Post_ACTION_TYPES = {
  ADD_POST: "ADD_POST",
  EDIT_POST: "EDIT_POST"
};


type PostState = {posts: Post[] | [];}



type PostAction = {
  type: string;
  payload: Post;
};


const postReducer = (state: PostState, action: PostAction): PostState => {
  const { type, payload } = action;
  switch (type) {
    case Post_ACTION_TYPES.ADD_POST:
      return {
        posts: [
            ...state.posts,
            payload
        ]
      };
    case Post_ACTION_TYPES.EDIT_POST:
        for(let i=0; i< state.posts.length; i++){
            if(state.posts[i].id == payload.id){
                state.posts[i] = payload;
            }
        }
        return {
            posts:[...state.posts]
        }
    default:
      return{ posts: [...state.posts]};
  }
};


type PostProviderType = {
  children: ReactNode;
};


const initialState: PostState = {
  posts: [],
};

export const PostProvider = ({ children }: PostProviderType) => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { posts } = state;

  const addPost = (post: Post) => {
    console.log("post to add -> ", post)
    dispatch({ type: Post_ACTION_TYPES.ADD_POST, payload: post });
  };
  const editPost = (post: Post) => {
    dispatch({ type: Post_ACTION_TYPES.EDIT_POST, payload: post });
  };

  useEffect(() => {
    // Here we will write an authentication API call to check if the user is logged in
  }, []);

  const value = { posts, addPost, editPost};

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};