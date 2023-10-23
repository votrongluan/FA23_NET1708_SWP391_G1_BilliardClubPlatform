import {useContext, useEffect, useState} from "react";
import {
    Avatar,
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Link as ChakraLink,
    Spacer,
    Spinner,
    Stack,
    Text
} from "@chakra-ui/react";
import {CalendarIcon, ExternalLinkIcon, StarIcon, TimeIcon} from "@chakra-ui/icons";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import axios, {baseURL} from "../../api/axios.js";
import Review from "../../components/Review.jsx";

function ClubDetail() {
    const {id} = useParams();
    const club = useLoaderData();
    const {districtMap} = useContext(GlobalContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const hours = Array.from({length: 12}, (_, i) => 9 + i);

    useEffect(() => {
        fetch(`${baseURL}/getReviews/${club.id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setReviews(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
                setLoading(false);
            });
    }, [club.id]);

    return (
        <Container maxW="1200px" as="main" py={10}>
            <Grid templateColumns="repeat(6, 1fr)" bg="gray.50" bgColor="white" borderRadius="4px"
                  border="1px solid black">
                <GridItem colSpan={1} height="300px" p={10}>
                    <Avatar height="200px" width="200px" src={club.avatarLink}/>
                </GridItem>

                <GridItem colSpan={5} p={10}>
                    <Stack>
                        <HStack>
                            <Heading size="md">{club.clubName}</Heading>
                            <Spacer/>
                            <Text gap={2} display="flex" alignItems="center" color="gray.500">
                                <StarIcon color="yellow.500"/> Đánh
                                giá: {club.rating !== 0.0 ? club.rating : "Chưa có đánh giá"} ({club.noRating} đánh giá)
                            </Text>
                        </HStack>
                        <Text>Địa chỉ: {club.address}, {districtMap[club.districtId]}</Text>
                        <Text>Giờ hoạt động: {club.openTime}h - {club.closeTime}h</Text>
                        <Text>Email: {club.email}</Text>
                        <Text>Số điện thoại: {club.phone}</Text>
                        <Text>Fanpage: <ChakraLink color="blue.500" href={club.fanpageLink}
                                                   isExternal>{club.fanpageLink}<ExternalLinkIcon
                            mx='2px'/></ChakraLink></Text>
                        <Link to={`/book/${club.clubId}`}><Button width="100%" mt={2} colorScheme="yellow"
                                                                  leftIcon={<CalendarIcon/>}>Đặt
                            bàn</Button></Link>
                    </Stack>
                </GridItem>
            </Grid>
            <Grid mt={10} templateColumns="repeat(10, 1fr)" gap={20}>
                <GridItem colSpan={4}>
                    <Heading as="h3" size="md">Bảng giá</Heading>
                    <Grid templateColumns="repeat(2, 1fr)" gap={5} justifyItems="center" margin="0 auto"
                          maxW="800px"
                          mt={10}>
                        {hours.map((hour) => (
                            <GridItem
                                key={hour}
                                size="lg" // You can adjust the size here
                                color="black"
                                bgColor="white"
                                borderWidth="1px"
                                textAlign="center"
                                p={5}
                                borderRadius="4px"
                            ><Flex justifyContent="center" alignItems="center" gap={1} color="gray.400"><TimeIcon/>
                                {hour}h: </Flex><Text fontWeight="semibold">Phăng: <span
                                style={{color: '#85bf4b'}}>{(29000).toLocaleString('en-US')} đồng</span></Text>
                                <Text fontWeight="semibold">Lỗ: <span
                                    style={{color: '#85bf4b'}}>{(29000).toLocaleString('en-US')} đồng</span></Text>
                            </GridItem>
                        ))}
                    </Grid>
                </GridItem>
                <GridItem colSpan={6}>
                    <Stack spacing={5}>
                        <Heading as="h3" size="md">Đánh giá của khách hàng đã trải nghiệm club</Heading>
                        {loading ? (
                            <Spinner size="lg"/>
                        ) : (
                            reviews.map((review) => (
                                <Review key={review.id} review={review}/>
                            ))
                        )}
                    </Stack>
                </GridItem>
            </Grid>
        </Container>
    );
}

export default ClubDetail;


export const clubLoader = async ({params}) => {
    const {id} = params;

    try {
        const res = await axios.get('/v1/club/' + id);

        const club = res.data.data.club;
        club.noRating = res.data.data.noRating;
        club.rating = res.data.data.rating;
        club.noBooking = res.data.data.noBooking;

        return club;
    } catch (error) {
        console.error('Error:', error);
    }
}