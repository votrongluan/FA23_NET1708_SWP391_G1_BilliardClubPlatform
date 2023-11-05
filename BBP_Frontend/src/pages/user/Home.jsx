import {useLoaderData, useNavigate} from "react-router-dom";
import Clubs from "../../components/Clubs.jsx";
import {Container, Heading, Image} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth.js";
import banner from '../../../public/Banner.svg';

function Home() {
    const {auth} = useAuth();
    const navigate = useNavigate();

    if (auth?.role == "ADMIN") navigate("/admin/manage");
    if (auth?.role == "STAFF") navigate("/staff/manage");

    const clubs = useLoaderData();

    const mostRatedClubs = clubs.sort((a, b) => b.rating - a.rating).slice(0, 4);
    const mostBookedClubs = clubs
        .sort((a, b) => b.noBooking - a.noBooking)
        .slice(0, 4);
    const mostReviewedClubs = clubs
        .sort((a, b) => b.noRating - a.noRating)
        .slice(0, 4);

    return (
        <>
            <Image src={banner} width="100%"/>
            <Container maxW="1200px" as="main" py={10}>
                <Heading as="h2" size="md" mb={5}>
                    Clubs được đánh giá cao nhất
                </Heading>
                <Clubs clubs={mostRatedClubs}/>
                <Heading as="h2" size="md" mb={5} mt={10}>
                    Clubs được đặt nhiều nhất
                </Heading>
                <Clubs clubs={mostBookedClubs}/>
                <Heading as="h2" size="md" mb={5} mt={10}>
                    Clubs được review nhiều nhất
                </Heading>
                <Clubs clubs={mostReviewedClubs}/>
            </Container></>
    );
}

export default Home;
