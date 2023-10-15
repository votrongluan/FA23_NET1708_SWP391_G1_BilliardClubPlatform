import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Text} from "@chakra-ui/react";
import {CalendarIcon, ViewIcon} from "@chakra-ui/icons";
import {DistrictContext} from "../context/DistrictContext.jsx";
import {useContext} from "react";
import {Link} from "react-router-dom";

function Club({club}) {
    const {districts} = useContext(DistrictContext);
    const district = districts.find((district) => district.id === club.districtId);

    return (
        // eslint-disable-next-line react/prop-types
        <Card key={club.id} borderTop="4px" borderColor="blue.500" bg="white">
            <CardHeader color="gray.700">
                <Image src={club.avatarLink} height="250px" width="100%" objectFit="cover"/>
            </CardHeader>

            <CardBody color="gray.500">
                <Text color="black" fontSize="20px">{club.name}</Text>
                <Text mt={2}>{club.address}, {district.name}</Text>
            </CardBody>

            <Divider borderColor="gray.300"/>

            <CardFooter display="flex" alignItems="center" justifyContent="space-between">
                <Button variant="ghost" leftIcon={<ViewIcon/>}><Link to={`/clubs/${club.id}`}>Chi tiết</Link></Button>
                <Button colorScheme="yellow" leftIcon={<CalendarIcon/>}>Đặt bàn</Button>
            </CardFooter>
        </Card>
    );
}

export default Club;