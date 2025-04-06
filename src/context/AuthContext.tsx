import { useRouter } from "next/router";
import React, {createContext, useState } from "react";

type User = {
    logged: boolean;
}


interface AuthContextProps {
    children : React.ReactNode
}

//Forgot how to make context sorry
export const UserContext = createContext<User | null>(null);

export default function AuthContextComponent({children} : AuthContextProps) {
    const [user , setUser] = useState<User | null>(null)

    return <UserContext.Provider value={user!}>
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