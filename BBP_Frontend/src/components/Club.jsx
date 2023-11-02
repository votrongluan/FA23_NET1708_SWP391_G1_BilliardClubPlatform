import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Text} from "@chakra-ui/react";
import {CalendarIcon, StarIcon, ViewIcon} from "@chakra-ui/icons";
import {GlobalContext} from "../context/GlobalContext.jsx";
import {useContext} from "react";
import {Link} from "react-router-dom";

function Club({data}) {
    const club = data?.club;
    club.noRating = data?.noRating;
    club.noBooking = data?.noBooking;
    club.rating = data?.rating;

    const {districtMap} = useContext(GlobalContext);

    return (
        <Card key={club.clubId} borderTop="4px" borderColor="blue.500" bg="white">
            <CardHeader pb={0} color="gray.700">
                <Image src={club?.avatarLink} height="200px" width="100%" objectFit="cover"/>
            </CardHeader>

            <CardBody color="gray.500">
                <Text color="black" fontSize="20px">{club?.clubName}</Text>
                <Text height='30px'  mt={2}>{club?.address}, {districtMap[club.districtId]}</Text>
                {Boolean(club?.noRating) ?
                    <Text mt={10} gap={2} display="flex" alignItems="center" justifyContent="flex-start" color="gray.500">
                        <StarIcon color="yellow.500"/>{club.rating.toFixed(1)} ({club.noRating} đánh giá)
                    </Text> :
                    <Text  mt={10} gap={2} display="flex" alignItems="center" justifyContent="flex-start"
                          color="gray.500">
                        <StarIcon color="yellow.500"/>Chưa có đánh giá
                    </Text>}
            </CardBody>

            <Divider borderColor="gray.300"/>

            <CardFooter display="flex" alignItems="center" justifyContent="space-between">
                <Link to={`/clubs/${club.clubId}`}><Button variant="ghost" leftIcon={<ViewIcon/>}>Chi
                    tiết</Button></Link>
                <Link to={`/book/${club.clubId}`}><Button colorScheme="yellow" leftIcon={<CalendarIcon/>}>Đặt
                    bàn</Button></Link>
            </CardFooter>
        </Card>
    );
}

export default Club;