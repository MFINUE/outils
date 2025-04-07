import { useRouter } from "next/router";
import React, {createContext, useContext, useState } from "react";

type User = {
    logged: boolean;
}

interface UserContextValue {
    user : User | null
    setUser : React.Dispatch<React.SetStateAction<User | null>>;
} 

interface UserContextProps {
    children : React.ReactNode
}

//Forgot how to make context sorry
export const UserContext = createContext<UserContextValue | null>(null);

export default function UserContextComponent({children} : UserContextProps) {
    const [user , setUser] = useState<User | null>(null)


    return <UserContext.Provider value={{user , setUser}}>
        {children}
    </UserContext.Provider>

}



//Gonna get passed the auth ct
export function checkUser() {
    const {user , setUser} = useContext(UserContext)!
    const router = useRouter();
    if(!user) {
        router.push("/connexion");
    }
    else { } //If user logged in no need to push them away the componenet may load
}