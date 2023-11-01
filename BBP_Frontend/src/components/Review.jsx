import {Avatar, Card, CardBody, CardHeader, Divider, HStack, Spacer, Stack, Text} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import useAuth from "../hooks/useAuth.js";

function Review({review}) {
    const {auth} = useAuth();

    return (
        <Card>
            <CardHeader>
                <Stack>
                    <HStack>
                        <Avatar size="sm" src={review.avatarLink}/>
                        {review.name == auth?.username ?
                            <HStack>
                                <Text>{review.name}</Text>
                                <Text color="gray.500">(bình luận của bạn)</Text>
                            </HStack> :
                            <Text>{review.name}</Text>}
                    </HStack>

                    <Spacer/>

                    <HStack>
                        <Text color="gray.400">đã chơi ngày {review.date}</Text>
                        <Spacer/>
                        <HStack>
                            <StarIcon color="yellow.500"/>
                            <Text>{review.star}</Text>
                        </HStack>
                    </HStack>
                </Stack>
            </CardHeader>
            <Divider/>
            <CardBody>
                <Text>{review.comment}</Text>
            </CardBody>
        </Card>
    );
}

export default Review;