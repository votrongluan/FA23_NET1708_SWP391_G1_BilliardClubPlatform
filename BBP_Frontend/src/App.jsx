import {Route, Routes} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./sections/Home.jsx";

export default function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
            <Footer/>
        </>
    )
}
