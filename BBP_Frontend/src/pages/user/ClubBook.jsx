import {useContext, useState} from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Select,
    useToast,
} from "@chakra-ui/react";
import {CalendarIcon} from "@chakra-ui/icons";
import {useLoaderData, useParams} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";

function ClubBook() {
    // table
    const tables = [
        {
            id: 1,
            type: "Phăng",
            isOk: true,
        },
        {
            id: 2,
            type: "Phăng",
            isOk: false,
        },
        {
            id: 3,
            type: "Lỗ",
            isOk: true,
        },
        {
            id: 4,
            type: "Phăng",
            isOk: false,
        },
        {
            id: 5,
            type: "Lỗ",
            isOk: true,
        },
        {
            id: 6,
            type: "Phăng",
            isOk: true,
        },
        {
            id: 7,
            type: "Lỗ",
            isOk: false,
        },
        {
            id: 8,
            type: "Phăng",
            isOk: true,
        },
        {
            id: 9,
            type: "Lỗ",
            isOk: true,
        },
        {
            id: 10,
            type: "Phăng",
            isOk: false,
        }
    ];

    const [selectedTable, setSelectedTable] = useState(null);

    const toast = useToast();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const formatDate = (date) => {
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const {id} = useParams();
    const club = useLoaderData();
    const {districts} = useContext(GlobalContext);
    const district = districts.find((district) => district.id === club.districtId);

    const hours = Array.from({length: 12}, (_, i) => 9 + i);

    const [selectedHours, setSelectedHours] = useState([]);

    // Function to handle hour selection
    const handleHourChange = (hour) => {
        // Check if the hour is already selected
        if ((selectedHours.includes(hour) && !selectedHours.includes(hour - 1) && !selectedHours.includes(hour + 1)) || (selectedHours.includes(hour) && !selectedHours.includes(hour - 1)) || (selectedHours.includes(hour) && !selectedHours.includes(hour + 1))) {
            setSelectedHours(selectedHours.filter((h) => h !== hour));
        } else {
            // Check if the selected hour maintains continuity
            if (areHoursContinuous([...selectedHours, hour])) {
                setSelectedHours([...selectedHours, hour]);
            } else {
                // Show an error or alert message here
                toast({
                    title: "Lỗi",
                    description: "Không thể chọn giờ không liên tiếp nhau",
                    status: "error",
                    duration: 777,
                    isClosable: true,
                    position: "top-right"
                });
            }
        }
    };

    // Function to check if the selected hours are continuous
    const areHoursContinuous = (selectedHours) => {
        if (selectedHours.length === 0) {
            return true;
        }

        const sortedHours = [...selectedHours].sort((a, b) => a - b);

        for (let i = 0; i < sortedHours.length - 1; i++) {
            if (sortedHours[i] + 1 !== sortedHours[i + 1]) {
                return false;
            }
        }
        return true;
    };

    return (
        <Container maxW="1200px" as="main" py={10}>
            <Heading mb={10} size="lg" textAlign="center">
                Đặt bàn
            </Heading>
            <form onSubmit={null}>
                <FormControl isRequired mb="20px">
                    <FormLabel>1. Chọn club</FormLabel>
                    <Box bgColor="white" borderWidth="1px" p={2}>
                        {club.name}
                    </Box>
                    <FormHelperText>{club?.address}, {district?.name}</FormHelperText>
                </FormControl>

                <FormControl isRequired mb="20px">
                    <FormLabel>2. Chọn loại bàn</FormLabel>
                    <Select bgColor="white" name="tableType">
                        <option value="1">Phăng</option>
                        <option value="2">Lỗ</option>
                    </Select>
                </FormControl>

                <FormControl isRequired mb="20px">
                    <FormLabel>3. Chọn ngày</FormLabel>
                    <Select bgColor="white" name="date">
                        <option value={formatDate(today)}>Hôm nay, {formatDate(today)}</option>
                        <option value={formatDate(tomorrow)}>
                            Ngày mai, {formatDate(tomorrow)}
                        </option>
                        <option value={formatDate(dayAfterTomorrow)}>
                            Ngày mốt, {formatDate(dayAfterTomorrow)}
                        </option>
                    </Select>
                </FormControl>

                <FormControl isRequired mb="20px">
                    <FormLabel>4. Chọn giờ</FormLabel>
                    <FormHelperText mb={5}>Mỗi ô có thời lượng là 1
                        tiếng, <span style={{fontWeight: 'bold'}}>không thể chọn giờ không liên tiếp nhau</span>
                    </FormHelperText>
                    <Grid maxW="800px" templateColumns="repeat(4, 1fr)" gap={5} justifyItems="center" margin="0 auto">
                        {hours.map((hour) => (
                            <GridItem key={hour}>
                                <Button
                                    size="lg" // You can adjust the size here
                                    variant={selectedHours.includes(hour) ? "solid" : "outline"}
                                    onClick={() => handleHourChange(hour)}
                                    colorScheme="yellow"
                                    color="black"
                                    minW="200px"
                                >
                                    {hour}h
                                </Button>
                            </GridItem>
                        ))}
                    </Grid>
                </FormControl>

                <FormControl isRequired mb="20px">
                    <FormLabel>5. Chọn bàn trống</FormLabel>
                    <FormHelperText mb={5}>Nếu không hiện ra bàn trống nào, hãy chọn khung giờ khác bạn
                        nhé</FormHelperText>
                    <Flex gap={5} alignItems="center" justifyContent="center" margin="0 auto">
                        {tables.map((table) => (
                            <Box
                                key={table.id}
                                size="lg" // You can adjust the size here
                                variant={selectedTable?.id === table.id ? "solid" : "outline"}
                                onClick={() => selectedTable(table)}
                                colorScheme="yellow"
                                color="black"
                                minW="200px"
                            >
                                {table.id}
                            </Box>
                        ))}
                    </Flex>
                </FormControl>

                <Button width="100%" mt={2} colorScheme="yellow" leftIcon={<CalendarIcon/>}>
                    Đặt bàn
                </Button>
            </form>
        </Container>
    );
}

export default ClubBook;
