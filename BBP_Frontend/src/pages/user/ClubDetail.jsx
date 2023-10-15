import {baseURL} from "../../api/axios.js";
import {useLoaderData, useParams} from "react-router-dom";
import {Avatar, Button, Grid, GridItem, Heading, HStack, Link, Stack, Text} from "@chakra-ui/react";
import {useContext} from "react";
import {DistrictContext} from "../../context/DistrictContext.jsx";
import {CalendarIcon, ExternalLinkIcon, StarIcon} from "@chakra-ui/icons";

function ClubDetail() {
    const {id} = useParams();
    const club = useLoaderData();
    const {districts} = useContext(DistrictContext);
    const district = districts.find((district) => district.id === club.districtId);

    return (
        <Grid templateColumns="repeat(6, 1fr)" bg="gray.50" bgColor="white">
            <GridItem
                colSpan={1}
                Height="300px"
                p={10}
            >
                <Avatar height="200px" width="200px" src={club.avatarLink}/>
            </GridItem>

            <GridItem
                colSpan={5}
                p={10}
            >
                <Stack>
                    <HStack>
                        <Heading size="md">{club.name}</Heading>
                        <Text ml="auto" gap={2} display="flex" alignItems="center" color="gray.500"><StarIcon
                            color="yellow.500"/> Đánh
                            giá: {club.rating} ({club.numberOfRating} đánh giá)
                        </Text>
                    </HStack>
                    <Text>Địa chỉ: {club.address}, {district.name}</Text>
                    <Text>Giờ hoạt động: {club.openTime}h - {club.closeTime}h</Text>
                    <Text>Email: {club.email}</Text>
                    <Text>Số điện thoại: {club.phone}</Text>
                    <Text>Fanpage: <Link color="blue.500" href={club.fanpageLink} isExternal>{club.fanpageLink}
                        <ExternalLinkIcon
                            mx='2px'/></Link></Text>
                    <Button mt={2} colorScheme="yellow" leftIcon={<CalendarIcon/>}>Đặt bàn</Button>
                </Stack>
            </GridItem>
        </Grid>
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