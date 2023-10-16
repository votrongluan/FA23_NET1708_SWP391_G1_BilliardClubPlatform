import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Text} from "@chakra-ui/react";
import {CalendarIcon, StarIcon, ViewIcon} from "@chakra-ui/icons";
import {GlobalContext} from "../context/GlobalContext.jsx";
import {useContext} from "react";
import {Link} from "react-router-dom";

function Club({club}) {
    const {districts} = useContext(GlobalContext);
    const district = districts.find((district) => district.id === club.districtId);

    return (
        <Card key={club.id} borderTop="4px" borderColor="blue.500" bg="white">
            <CardHeader pb={0} color="gray.700">
                <Image src={club?.avatarLink} height="200px" width="100%" objectFit="cover"/>
            </CardHeader>

            <CardBody color="gray.500">
                <Text color="black" fontSize="20px">{club?.name}</Text>
                <Text mt={2}>{club?.address}, {district?.name}</Text>
                {Boolean(club?.numberOfRating) ?
                    <Text mt={4} gap={2} display="flex" alignItems="center" justifyContent="flex-end" color="gray.500">
                        <StarIcon color="yellow.500"/>{club.rating} ({club.numberOfRating} đánh giá)
                    </Text> :
                    <Text mt={4} gap={2} display="flex" alignItems="center" justifyContent="flex-end" color="gray.500">
                        <StarIcon color="yellow.500"/>Chưa có đánh giá
                    </Text>}
            </CardBody>

            <Divider borderColor="gray.300"/>

            <CardFooter display="flex" alignItems="center" justifyContent="space-between">
                <Link to={`/clubs/${club.id}`}><Button variant="ghost" leftIcon={<ViewIcon/>}>Chi tiết</Button></Link>
                <Link to={`/book/${club.id}`}><Button colorScheme="yellow" leftIcon={<CalendarIcon/>}>Đặt
                    bàn</Button></Link>
            </CardFooter>
        </Card>
    );
}

export default Club;