import React, {useContext, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    GridItem,
    Heading,
    HStack,
    Link as ChakraLink,
    Spacer,
    Spinner,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import {CalendarIcon, ExternalLinkIcon, StarIcon,} from "@chakra-ui/icons";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import axios, {baseURL} from "../../api/axios.js";
import Review from "../../components/Review.jsx";

function ClubDetail() {
    const {id} = useParams();
    const club = useLoaderData();
    const {districtMap, slotMap, tableTypeMap} = useContext(GlobalContext);
    const [reviews, setReviews] = useState([]);
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);

    function findPrice(tableType, slotId) {
        const price = prices.find((price) => {
            return price.tableType == tableType && price.slotId == slotId;
        });

        if (price) {
            return price.price;
        }

        return -1;
    }

    useEffect(() => {
        fetch(`${baseURL}/v1/getReviews/${club.clubId}`)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });

        fetch(`${baseURL}/v1/getPriceByClub/${club.clubId}`)
            .then((response) => response.json())
            .then((data) => {
                setPrices(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
                setLoading(false);
            });
    }, [club.id]);

    return (
        <Container maxW="1200px" as="main" py={10}>
            <Grid
                templateColumns="repeat(6, 1fr)"
                bg="gray.50"
                bgColor="white"
                borderRadius="4px"
                border="1px solid black"
            >
                <GridItem colSpan={1} height="300px" p={10}>
                    <Avatar height="270px" width="270px" src={club.avatarLink}/>
                </GridItem>

                <GridItem colSpan={5} p={10}>
                    <Stack>
                        <HStack>
                            <Heading size="md">{club.clubName}</Heading>
                            <Spacer/>
                            <Text gap={2} display="flex" alignItems="center" color="gray.500">
                                <StarIcon color="yellow.500"/> Đánh giá:{" "}
                                {club.rating !== 0.0 ? club.rating : "Chưa có đánh giá"} (
                                {club.noRating} đánh giá)
                            </Text>
                        </HStack>
                        <HStack mt={5}>
                            <Text>Địa chỉ:</Text>
                            <Text fontWeight="medium">{club.address}, {districtMap[club.districtId]}</Text>
                        </HStack>
                        <HStack>
                            <Text>Giờ hoạt động:</Text>
                            <Text fontWeight="medium">{club.openTime}h - {club.closeTime}h</Text>
                        </HStack>
                        <HStack>
                            <Text>Email:</Text>
                            <Text fontWeight="medium">{club.email ? club.email :
                                <Text fontWeight="normal" color="gray.500">(Chưa có thông tin)</Text>}</Text>
                        </HStack>
                        <HStack>
                            <Text>Số điện thoại:</Text>
                            <Text fontWeight="medium">{club.phone}</Text>
                        </HStack>
                        <HStack>
                            <Text>Tổng lượt đặt bàn:</Text>
                            <Text fontWeight="medium">{club.noBooking}</Text>
                        </HStack>
                        <HStack>
                            <Text>Fanpage:{" "}</Text>
                            {club.fanpageLink ? <ChakraLink color="blue.500" href={club.fanpageLink} isExternal>
                                {club.fanpageLink}
                                <ExternalLinkIcon mx="2px"/>
                            </ChakraLink> : <Text fontWeight="normal" color="gray.500">(Chưa có thông tin)</Text>}
                        </HStack>
                        <Link to={`/book/${club.clubId}`}>
                            <Button
                                width="100%"
                                mt={2}
                                colorScheme="yellow"
                                leftIcon={<CalendarIcon/>}
                            >
                                Đặt bàn
                            </Button>
                        </Link>
                    </Stack>
                </GridItem>
            </Grid>
            <Grid mt={10} templateColumns="repeat(10, 1fr)" gap={10}>
                <GridItem colSpan={4}>
                    {Object.entries(tableTypeMap).map(([typeKey, typeValue]) => (
                        <Box key={typeKey}>
                            <Heading as="h3" size="md">
                                Bảng giá bàn loại {typeValue}
                            </Heading>
                            <TableContainer mt={5} mb={5} bgColor="white" borderRadius="4px">
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>Giờ</Th>
                                            <Th textAlign="center">Giá</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {Object.entries(slotMap).map(([key, value]) => (
                                            <Tr key={key}>
                                                <Td>{value} giờ</Td>
                                                <Td textAlign="center">
                                                    {findPrice(typeKey, key) != -1 ? (
                                                        <Text fontWeight="medium">
                                                            {findPrice(typeKey, key).toLocaleString("vn-VN")}{" "}
                                                            đồng
                                                        </Text>
                                                    ) : (
                                                        <Text color="gray.400">(không đặt được)</Text>
                                                    )}
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    ))}
                </GridItem>
                <GridItem colSpan={6}>
                    <Stack spacing={5}>
                        <Heading as="h3" size="md">
                            Đánh giá của khách hàng đã trải nghiệm club
                        </Heading>
                        <Text color="gray.400">
                            (Để được đánh giá hãy trải nghiệm club trước bạn nhé)
                        </Text>
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
        const res = await axios.get("/v1/club/" + id);

        const club = res.data.data.club;
        club.noRating = res.data.data.noRating;
        club.rating = res.data.data.rating;
        club.noBooking = res.data.data.noBooking;

        return club;
    } catch (error) {
        console.error("Error:", error);
    }
};
