import { useRouter } from "next/router";
import React, { useState } from "react";
import { createContext } from "vm";

type User = {
    logged: boolean;
}

interface AuthContextValues{
    user: User | null
}

interface AuthContextProps {
    children : React.ReactNode
}

//Forgot how to make context sorry
export const UserContext = createContext<AuthContextValues | null>(null);

export default function AuthContextComponent({children} : AuthContextProps) {
    const [user , setUser] = useState<User | null>(null)

    return <UserContext.Provider value={{user}}>
        {children}
    </UserContext.Provider>

}



//Gonna get passed the auth ct
export function checkUser(user:User) {
    const router = useRouter()
    if(!user) {
        router.push("/connexion")
    }
    else { } //If user logged in no need to push them away the componenet may load
}