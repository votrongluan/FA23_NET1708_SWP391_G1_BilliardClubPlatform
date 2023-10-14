import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import {ChakraProvider} from "@chakra-ui/react";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout/>}>
                <Route index/>
                <Route path="about"/>
                <Route path="help">
                    <Route path="faq"/>
                    <Route path="contact"/>
                </Route>
            </Route>
        )
    )

    return (
        <ChakraProvider>
            <RouterProvider router={router}/>
        </ChakraProvider>
    )
}

export default App
