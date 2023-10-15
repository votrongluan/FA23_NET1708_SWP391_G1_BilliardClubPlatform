import {Box, Text} from "@chakra-ui/react";

function Footer() {
    return (
        <Box as="footer" textAlign="center" py={5} bg="blackAlpha.800" color="white">
            <Text>CÔNG TY CỔ PHẦN TMDV Billiards</Text>
            <Text>
                Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố
                Hồ Chí Minh
            </Text>
            <Text>Copyright 2023 Billiards, Inc. All Rights Reserved</Text>
        </Box>
    );
}

export default Footer;