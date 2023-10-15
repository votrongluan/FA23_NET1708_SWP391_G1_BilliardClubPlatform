import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import {ChakraProvider} from "@chakra-ui/react";
import Home from "./pages/user/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ElementError from "./pages/ElementError.jsx";
import {DistrictProvider} from "./context/DistrictContext.jsx";
import AllClubs, {clubsLoader} from "./pages/user/AllClubs.jsx";
import ClubDetail, {clubLoader} from "./pages/user/ClubDetail.jsx";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout/>} errorElement={<ElementError/>}>
                <Route
                    index
                    element={<Home/>}
                    loader={clubsLoader}
                />

                <Route
                    path="clubs"
                    loader={clubsLoader}
                >
                    <Route index element={<AllClubs/>}/>
                    <Route path=":id" element={<ClubDetail/>} loader={clubLoader}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        )
    )

    return (
        <DistrictProvider>
            <ChakraProvider>
                <RouterProvider router={router}/>
            </ChakraProvider>
        </DistrictProvider>
    )
}

export default App
