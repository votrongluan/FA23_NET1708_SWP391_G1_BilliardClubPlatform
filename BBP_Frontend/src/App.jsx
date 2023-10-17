import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import {ChakraProvider} from "@chakra-ui/react";
import Home from "./pages/user/Home.jsx";
import NotFound from "./pages/all/NotFound.jsx";
import ElementError from "./pages/all/ElementError.jsx";
import {GlobalProvider} from "./context/GlobalContext.jsx";
import AllClubs, {clubsLoader} from "./pages/user/AllClubs.jsx";
import ClubDetail, {clubLoader} from "./pages/user/ClubDetail.jsx";
import Auth from "./pages/all/Auth.jsx";
import {AuthProvider} from "./context/AuthProvider.jsx";
import Account, {userLoader} from "./pages/all/Account.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Unauthorized from "./pages/all/Unauthorized.jsx";
import Find from "./pages/user/Find.jsx";
import Book from "./pages/user/Book.jsx";
import ClubBook from "./pages/user/ClubBook.jsx";
import OwnClub from "./pages/staff/OwnClub.jsx";
import ClubTable from "./pages/staff/ClubTable.jsx";
import ClubSlot, {slotLoader} from "./pages/staff/ClubSlot.jsx";
import ClubBooking from "./pages/staff/ClubBooking.jsx";
import StaffLayout from "./layouts/StaffLayout.jsx";
import {useEffect} from "react";

function App() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout/>} errorElement={<ElementError/>}>
                {/* Staff page route */}
                <Route path={"staff"} element={<RequireAuth allowedRoles={"Staff"}/>}>
                    <Route index element={<NotFound/>}/>
                    <Route path="manage" element={<StaffLayout/>}>
                        <Route path="club/:id" element={<OwnClub/>} loader={clubLoader}/>
                        <Route path="table/:id" element={<ClubTable/>}/>
                        <Route path="slot/:id" element={<ClubSlot/>} loader={slotLoader}/>
                        <Route path="booking/:id" element={<ClubBooking/>}/>
                    </Route>
                </Route>

                {/* Index page route */}
                <Route
                    index
                    element={<Home/>}
                    loader={clubsLoader}
                />

                {/* Clubs, club detail page route */}
                <Route
                    path="clubs"
                    loader={clubsLoader}
                >
                    <Route index element={<AllClubs/>}/>
                    <Route path=":id" element={<ClubDetail/>} loader={clubLoader}/>
                </Route>

                {/* Find club route */}
                <Route
                    path="find"
                    loader={clubsLoader}
                    element={<Find/>}
                />

                {/* Booking route */}
                <Route
                    path="book"
                    element={<RequireAuth allowedRoles={"User"}/>}
                >
                    <Route index element={<Book/>}/>
                    <Route path=":id" loader={clubLoader} element={<ClubBook/>}/>
                </Route>

                <Route
                    path="users"
                >
                    <Route index element={<NotFound/>}/>
                    <Route path=":id" element={<Account/>} loader={userLoader}/>
                </Route>

                <Route path="auth" element={<Auth/>}/>

                <Route path="unauthorized" element={<Unauthorized/>}/>

                <Route path="*" element={<NotFound/>}/>
            </Route>
        )
    )

    return (
        <AuthProvider>
            <GlobalProvider>
                <ChakraProvider>
                    <RouterProvider router={router}/>
                </ChakraProvider>
            </GlobalProvider>
        </AuthProvider>
    )
}

export default App
