import { ReactNode, createContext, useEffect, useReducer } from "react";

// Define the User interface
interface User {
  username: string;
  email: string;
  password: string;
  isLoggedIn: boolean
}

// Define the UserContextType interface
interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user:User)=> void;
  loginCurrentUser: (user:User)=> void;
}

// Create the UserContext with initial values
export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
  loginCurrentUser: () => null
});

// Define action types
const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  UPDATE_CURRENT_USER: "UPDATE_CURRENT_USER"
};

// Define UserState type
type UserState = {
  currentUser: User | null;
};

// Define UserAction type
type UserAction = {
  type: string;
  payload?: User;
};

// User reducer function
const userReducer = (state: UserState, action: UserAction): UserState => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload?payload:null,
      };
    case USER_ACTION_TYPES.UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: payload?payload:null
      }
    default:
      return state;
  }
};

// Define UserProviderType
type UserProviderType = {
  children: ReactNode;
};

// Initial state for the reducer
const initialState: UserState = {
  currentUser: null,
};

// UserProvider component
export const UserProvider = ({ children }: UserProviderType) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { currentUser } = state;

  const setCurrentUser = (user: User) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };
  const loginCurrentUser = (user:User) => {
    user.isLoggedIn = true;
    dispatch({ type: USER_ACTION_TYPES.UPDATE_CURRENT_USER, payload: user });
  };

  useEffect(() => {
    // Here we will write an authentication API call to check if the user is logged in
  }, []);

  const value = { currentUser, setCurrentUser, loginCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};