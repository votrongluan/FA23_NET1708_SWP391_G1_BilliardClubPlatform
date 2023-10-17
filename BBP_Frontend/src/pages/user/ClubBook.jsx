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
    HStack,
    Select,
    Text,
    useToast,
} from "@chakra-ui/react";
import {CalendarIcon} from "@chakra-ui/icons";
import {useLoaderData, useParams} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";

function ClubBook() {
    const allowedHour = (function getCurrentAndCeilNextHour() {
        const now = new Date();
        let currentHour = now.getHours();
        return currentHour + 1;
    })()

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
    const {districtMap} = useContext(GlobalContext);

    const hours = Array.from({length: 12}, (_, i) => 9 + i);

    const [selectedHours, setSelectedHours] = useState([]);
    const [allowedTables, setAllowedTables] = useState([])
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedTableType, setSelectedTableType] = useState(1);
    const [selectedDate, setSelectedDate] = useState(formatDate(today));

    // Function to change allowed tables and selected table
    const changeAllowedTable = (hours) => {
        setSelectedTable(null);
        if (hours.length === 0) {
            setAllowedTables([])
        } else {
            setAllowedTables(tables.filter((table) => {
                return Math.random() < 0.5;
            }))
        }
    };

    // Function to handle hour selection
    const handleHourChange = (hour) => {
        // Check if the hour is already selected
        if ((selectedHours.includes(hour) && !selectedHours.includes(hour - 1) && !selectedHours.includes(hour + 1)) || (selectedHours.includes(hour) && !selectedHours.includes(hour - 1)) || (selectedHours.includes(hour) && !selectedHours.includes(hour + 1))) {
            const tmpHours = selectedHours.filter((h) => h !== hour)
            setSelectedHours(tmpHours);
            changeAllowedTable(tmpHours);
        } else {
            // Check if the selected hour maintains continuity
            if (areHoursContinuous([...selectedHours, hour])) {
                const tmpHours = [...selectedHours, hour]
                setSelectedHours(tmpHours);
                changeAllowedTable(tmpHours);
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
                    <FormHelperText>{club?.address}, {districtMap[club.districtId]}</FormHelperText>
                </FormControl>

                <FormControl isRequired mb="20px">
                    <FormLabel>2. Chọn loại bàn</FormLabel>
                    <Select onChange={(e) => setSelectedTableType(e.target.value)} bgColor="white" name="tableType">
                        <option value="1">Phăng</option>
                        <option value="2">Lỗ</option>
                    </Select>
                </FormControl>

                <FormControl isRequired mb="20px">
                    <FormLabel>3. Chọn ngày</FormLabel>
                    <Select bgColor="white" name="date" onChange={(e) => {
                        setSelectedDate(e.target.value)
                    }}>
                        <option onClick={(e) => setSelectedDate(e.target.value)} value={formatDate(today)}>Hôm
                            nay, {formatDate(today)}</option>
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
                                    isDisabled={selectedDate === formatDate(new Date()) && hour < allowedHour}
                                    size="lg" // You can adjust the size here
                                    variant={selectedHours.includes(hour) ? "solid" : "outline"}
                                    onClick={() => handleHourChange(hour)}
                                    colorScheme="yellow"
                                    color="black"
                                    minW="200px"
                                    userSelect=""
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
                    <Flex gap={5} alignItems="center" justifyContent="center" margin="0 auto" wrap="wrap">
                        {allowedTables.map((table) => (
                            <Box
                                key={table.id}
                                size="lg"
                                onClick={() => {
                                    setSelectedTable(table)
                                }}
                                minW="100px"
                                bgColor={selectedTable && selectedTable.id === table.id ? "yellow.400" : "white"}
                                textAlign="center"
                                p={4}
                                cursor="pointer"
                                borderRadius="4px"
                            >
                                <Text color="gray.500">Mã bàn:</Text>
                                {table.id}
                            </Box>
                        ))}
                    </Flex>
                </FormControl>

                <HStack mb={10} alignItems="center" display="flex">
                    <FormLabel margin="0">6. Thành tiền:</FormLabel>
                    <Text color="red.500">69,000 đồng</Text>
                </HStack>

                <Button width="100%" mt={2} colorScheme="yellow" leftIcon={<CalendarIcon/>}>
                    Đặt bàn
                </Button>
            </form>
        </Container>
    );
}

export default ClubBook;

