import {Avatar, Card, CardBody, CardHeader, Divider, HStack, Spacer, Stack, Text} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";

function Review({review}) {
    return (
        <Card>
            <CardHeader>
                <Stack>
                    <HStack>
                        <Avatar size="sm" src={review.avatarLink}/>
                        <Text>{review.name}</Text>
                    </HStack>

                    <Spacer/>

                    <HStack>
                        <Text color="gray.400">{review.date}</Text>
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