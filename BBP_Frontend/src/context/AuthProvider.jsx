import {createContext, useEffect, useState} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(() => {
        const localAuth = JSON.parse(localStorage.getItem("auth"));
        return localAuth || null;
    });

    useEffect(() => {
        // Save 'auth' to localStorage whenever it changes
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
