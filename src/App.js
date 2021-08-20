import "./App.css";
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./components/UI/Navbar/Navbar";
import Error from "./pages/Error";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";
import {useEffect, useState} from "react";

function App() {

    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if(localStorage.getItem('auth')){
            setIsAuth(true)
        }
        setLoading(false)
    })

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            setLoading
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>

    )
}

export default App;
