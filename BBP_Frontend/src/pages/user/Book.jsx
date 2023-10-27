import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Book() {
  return (
    <Container maxW="1200px" as="main" py={10}>
      <Box minH="70vh" textAlign="center">
        <Heading mb={10} size="lg" textAlign="center">
          Đặt bàn
        </Heading>
        <Text justifyContent="center" display="flex" alignItems="center">
          Hãy chọn club mà bạn muốn trải nhiệm trên hệ thống của chúng tôi, sau
          đó nhấn vào nút{" "}
          <Button
            _hover={{
              cursor: "default",
            }}
            disabled
            mx={2}
            colorScheme="yellow"
            leftIcon={<CalendarIcon />}
          >
            Đặt bàn
          </Button>
          nhé
        </Text>
        <Link to={"/find"}>
          <Button mt={10}>Chọn club</Button>
        </Link>
      </Box>
    </Container>
  );
}

export default Book;
