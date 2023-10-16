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
    Spacer,
    Spinner,
    Stack,
    Text,
} from "@chakra-ui/react";
import {CalendarIcon, ExternalLinkIcon, StarIcon, TimeIcon} from "@chakra-ui/icons";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {DistrictContext} from "../../context/DistrictContext.jsx";
import {baseURL} from "../../api/axios.js";
import Review from "../../components/Review.jsx";

function ClubDetail() {
    const {id} = useParams();
    const club = useLoaderData();
    const {districts} = useContext(DistrictContext);
    const district = districts.find((district) => district.id === club.districtId);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const hours = Array.from({length: 12}, (_, i) => 9 + i);

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
        <Container maxW="1200px" as="main" py={10}>
            <Grid templateColumns="repeat(6, 1fr)" bg="gray.50" bgColor="white" borderRadius="4px"
                  border="1px solid black">
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
                        <Link to={`/book/${club.id}`}><Button width="100%" mt={2} colorScheme="yellow"
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
                                size="lg" // You can adjust the size here
                                color="black"
                                bgColor="white"
                                borderWidth="1px"
                                textAlign="center"
                                p={5}
                                borderRadius="4px"
                            ><Flex justifyContent="center" alignItems="center" gap={1} color="gray.400"><TimeIcon/>
                                {hour}h: </Flex><Text fontWeight="semibold">Phăng: 29.000 đồng</Text>
                                <Text fontWeight="semibold">Lỗ: 29.000 đồng</Text>
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
    const {id} = params

    const res = await fetch(baseURL + '/clubs/' + id)

    if (!res.ok) {
        throw Error('Không tìm thấy club')
    }

    return res.json()
}