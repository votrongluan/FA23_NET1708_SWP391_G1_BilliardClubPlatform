import React from 'react';
import {Box, Button, FormControl, FormLabel, HStack, Spacer, Text} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";

function EditFieldBox({title, value, onEditClick}) {
    return (
        <FormControl mb="20px">
            <FormLabel>{title}</FormLabel>
            <Box borderRadius="4px" bgColor="white" borderWidth="1px" p={2}>
                <HStack>
                    <Text>{value}</Text>
                    <Spacer/>
                    <Button onClick={onEditClick} size="sm"><EditIcon mr={1}/>Chỉnh sửa</Button>
                </HStack>
            </Box>
        </FormControl>
    );
}

export default EditFieldBox;