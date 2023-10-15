import {useContext, useEffect, useState} from "react";
import {Avatar, Button, Grid, GridItem, Heading, HStack, Link, Spacer, Spinner, Stack, Text,} from "@chakra-ui/react";
import {CalendarIcon, ExternalLinkIcon, StarIcon} from "@chakra-ui/icons";
import {useLoaderData, useParams} from "react-router-dom";
import {DistrictContext} from "../../context/DistrictContext.jsx";
import {baseURL} from "../../api/axios.js";

function ClubDetail() {
    const {id} = useParams();
    const club = useLoaderData();
    const {districts} = useContext(DistrictContext);
    const district = districts.find((district) => district.id === club.districtId);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch reviews from the API
        fetch(`${baseURL}/reviews`)
            .then((response) => response.json())
            .then((data) => {
                // Filter reviews by clubId
                const clubReviews = data.filter((review) => review.clubId === club.id);
                setReviews(clubReviews);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
                setLoading(false);
            });
    }, [club.id]);

    return (
        <>
            <Grid templateColumns="repeat(6, 1fr)" bg="gray.50" bgColor="white" borderRadius="20px">
                <GridItem colSpan={1} Height="300px" p={10}>
                    <Avatar height="200px" width="200px" src={club.avatarLink}/>
                </GridItem>

                <GridItem colSpan={5} p={10}>
                    <Stack>
                        <HStack>
                            <Heading size="md">{club.name}</Heading>
                            <Spacer/>
                            <Text gap={2} display="flex" alignItems="center" color="gray.500">
                                <StarIcon color="yellow.500"/> Đánh giá: {club.rating} ({club.numberOfRating} đánh giá)
                            </Text>
                        </HStack>
                        <Text>Địa chỉ: {club.address}, {district?.name}</Text>
                        <Text>Giờ hoạt động: {club.openTime}h - {club.closeTime}h</Text>
                        <Text>Email: {club.email}</Text>
                        <Text>Số điện thoại: {club.phone}</Text>
                        <Text>Fanpage: <Link color="blue.500" href={club.fanpageLink}
                                             isExternal>{club.fanpageLink}<ExternalLinkIcon mx='2px'/></Link></Text>
                        <Button mt={2} colorScheme="yellow" leftIcon={<CalendarIcon/>}>Đặt bàn</Button>
                    </Stack>
                </GridItem>
            </Grid>
            <Stack mt={10}>
                <Heading as="h3" size="md">Đánh giá của khách hàng</Heading>
                {loading ? (
                    <Spinner size="lg"/>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id}>
                            {/* Display each review */}
                            {/* You can customize the display of each review here */}
                            <Text>{`Star Rating: ${review.star}`}</Text>
                            <Text>{`Comment: ${review.comment}`}</Text>
                            <Text>{`Date: ${review.date}`}</Text>
                        </div>
                    ))
                )}
            </Stack>
        </>
    );
}

export default ClubDetail;


export const clubLoader = async ({params}) => {
    const {id} = params

    const res = await fetch(baseURL + '/clubs/' + id)

    if (!res.ok) {
        throw Error('Không tìm thấy club')
    }

    return res.json()
}