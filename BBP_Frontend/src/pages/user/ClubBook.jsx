import {useContext, useEffect, useState} from "react";
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
    Spacer,
    Text,
    useToast,
} from "@chakra-ui/react";
import {CalendarIcon, SearchIcon} from "@chakra-ui/icons";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import axios, {baseURL} from "../../api/axios.js";
import {dateArr} from "../../utils/getThreeDate.js";
import useAuth from "../../hooks/useAuth.js";

function ClubBook() {
    const toast = useToast();
    const navigate = useNavigate();

    const {auth} = useAuth();
    const {id} = useParams();
    const club = useLoaderData();

    const {districtMap, tableTypeMap, slotMap} = useContext(GlobalContext);
    const [selectedHours, setSelectedHours] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState([]);
    const [allowedTables, setAllowedTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedTableType, setSelectedTableType] = useState(Object.keys(tableTypeMap)[0]);
    const [selectedDate, setSelectedDate] = useState(dateArr[0]);
    const [tables, setTables] = useState([]);
    const [prices, setPrices] = useState([]);
    const [price, setPrice] = useState(0);
    const [dayBooking, setDayBooking] = useState([]);

    const allowedHour = (function getCurrentAndCeilNextHour() {
        const now = new Date();
        let currentHour = now.getHours();
        return currentHour + 1;
    })();

    function checkIsTimeHasPrice(slotId) {
        for (let price of prices) {
            if (price.slotId == slotId && price.tableType == selectedTableType) {
                return true;
            }
        }

        return false;
    }

    function calculatePrice() {
        let price = 0;

        for (let slotId of selectedSlot) {
            for (let priceObj of prices) {
                if (priceObj.slotId == slotId && priceObj.tableType == selectedTableType) {
                    price += priceObj.price;
                    break;
                }
            }
        }

        return price;
    }

    // table
    useEffect(() => {
        fetch(`${baseURL}/v1/getTablesByClubId/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setTables(data);
            })
            .catch((error) => {
                console.log(error);
            });

        fetch(`${baseURL}/v1/getPriceByClub/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPrices(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Booking in the selected day
    useEffect(() => {
        setSelectedHours([]);
        setSelectedTable(null);
        setPrice(0);
        setDayBooking([]);

        try {
            const res = axios.post("booking/getByClubIdAndDate", JSON.stringify({
                clubId: id,
                date: selectedDate,
            }), {
                headers: {"Content-Type": "application/json"},
            }).then((res) => {
                const tmp = [];

                if (res.data.data != null) {
                    for (const book of res.data.data) {
                        let firstSlotId = book.firstSlotId;
                        let lastSlotId = book.lastSlotId;
                        for (let i = firstSlotId; i <= lastSlotId; i++) {
                            tmp.push({
                                slotId: i,
                                tableId: book.tableId,
                                tableTypeId: book.tableTypeId
                            });
                        }
                    }
                }

                setDayBooking(tmp);
            })
        } catch {
            console.log("error");
        }
    }, [selectedDate]);

    // Function to change allowed tables and selected table
    useEffect(() => {
        setSelectedTable(null)
        setPrice(0);

        if (selectedHours.length != 0) {
            const tmp = [];

            for (const table of tables) {
                let flag = true;

                if (table.tableTypeId != selectedTableType) continue;


                for (const book of dayBooking) {
                    if (selectedSlot.includes(book.slotId) && table.id == book.tableId) {
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    tmp.push(table);
                }
            }

            setAllowedTables(tmp);
        }
    }, [selectedHours]);

    // Function to handle hour selection
    const handleHourChange = (hour, slotId) => {
        // Check if the hour is already selected
        if (
            (selectedHours.includes(hour) &&
                !selectedHours.includes(hour - 1) &&
                !selectedHours.includes(hour + 1)) ||
            (selectedHours.includes(hour) && !selectedHours.includes(hour - 1)) ||
            (selectedHours.includes(hour) && !selectedHours.includes(hour + 1))
        ) {
            const tmpHours = selectedHours.filter((h) => h !== hour);
            setSelectedHours(tmpHours);

            const tmpSlot = selectedSlot.filter((s) => s !== slotId);
            setSelectedSlot(tmpSlot.sort((a, b) => a - b));
        } else {
            // Check if the selected hour maintains continuity
            if (areHoursContinuous([...selectedHours, hour])) {
                const tmpHours = [...selectedHours, hour];
                setSelectedHours(tmpHours);

                const tmpSlot = [...selectedSlot, slotId];
                setSelectedSlot(tmpSlot.sort((a, b) => a - b));
            } else {
                // Show an error or alert message here
                toast({
                    title: "Lỗi",
                    description: "Không thể chọn giờ không liên tiếp nhau",
                    status: "error",
                    duration: 777,
                    isClosable: true,
                    position: "top-right",
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
            <form onSubmit={async (e) => {
                e.preventDefault();

                if (selectedTable == null || selectedSlot.length == 0) {
                    toast({
                        title: "Lỗi",
                        description: "Bạn chưa chọn bàn hoặc giờ",
                        status: "error",
                        duration: 700,
                        isClosable: true,
                        position: "top-right",
                    });
                    return;
                }

                try {
                    const res = await axios.post("/booking/book", JSON.stringify({
                        clubId: id,
                        tableId: selectedTable.id,
                        tableTypeId: selectedTableType,
                        date: selectedDate,
                        firstSlotId: selectedSlot[0],
                        lastSlotId: selectedSlot[selectedSlot.length - 1],
                        customerId: auth.id,
                    }), {
                        headers: {"Content-Type": "application/json"},
                    })

                    if (res.data.data != null) {
                        navigate(`/history/${id}/${res.data.data}`)
                    } else {
                        toast({
                            title: "Lỗi",
                            description: "Đặt bàn thất bại",
                            status: "error",
                            duration: 700,
                            isClosable: true,
                            position: "top-right",
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }}>
                <FormControl isRequired mb="20px">
                    <FormLabel>1. Chọn club</FormLabel>
                    <Box bgColor="white" borderWidth="1px" p={2}>
                        {club.clubName}
                    </Box>
                    <FormHelperText>
                        {club?.address}, {districtMap[club.districtId]}
                    </FormHelperText>
                </FormControl>

                <FormControl isRequired mb="20px">
                    <FormLabel>2. Chọn loại bàn</FormLabel>
                    <Select
                        onChange={(e) => {
                            setSelectedTable(null);
                            setPrice(0);
                            setSelectedHours([]);
                            setAllowedTables([]);
                            setSelectedTableType(e.target.value);
                        }}
                        bgColor="white"
                        name="tableType"
                    >
                        <option value="1">Phăng</option>
                        <option value="2">Lỗ</option>
                    </Select>
                </FormControl>

                <FormControl isRequired mb="20px">
                    <FormLabel>3. Chọn ngày</FormLabel>
                    <Select
                        bgColor="white"
                        name="date"
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                        }}
                    >
                        <option
                            onClick={(e) => setSelectedDate(e.target.value)}
                            value={dateArr[0]}
                        >
                            Hôm nay, {dateArr[0]}
                        </option>
                        <option value={dateArr[1]}>
                            Ngày mai, {dateArr[1]}
                        </option>
                        <option value={dateArr[2]}>
                            Ngày mốt, {dateArr[2]}
                        </option>
                    </Select>
                </FormControl>

                <FormControl isRequired mb="20px">
                    <FormLabel>4. Chọn giờ</FormLabel>
                    <FormHelperText mb={5}>
                        Mỗi ô có thời lượng là 1 tiếng,{" "}
                        <span style={{fontWeight: "bold"}}>
              không thể chọn giờ không liên tiếp nhau
            </span>
                    </FormHelperText>
                    <Grid
                        maxW="800px"
                        templateColumns="repeat(4, 1fr)"
                        gap={5}
                        justifyItems="center"
                        margin="0 auto"
                    >
                        {Object.entries(slotMap).map(([key, value]) => (
                            <GridItem key={key}>
                                <Button
                                    isDisabled={
                                        (selectedDate === dateArr[0] &&
                                            value < allowedHour) || !checkIsTimeHasPrice(parseInt(key))
                                    }
                                    size="lg"
                                    variant={selectedHours.includes(value) ? "solid" : "outline"}
                                    onClick={() => handleHourChange(value, parseInt(key))}
                                    colorScheme="yellow"
                                    color="black"
                                    minW="200px"
                                    userSelect=""
                                >
                                    {value}h
                                </Button>
                            </GridItem>
                        ))}
                    </Grid>
                </FormControl>

                <FormControl isRequired mb="20px">
                    <FormLabel>5. Chọn bàn trống</FormLabel>
                    <FormHelperText mb={5}>
                        Nếu không hiện ra bàn trống nào, hãy chọn khung giờ khác bạn nhé
                    </FormHelperText>
                    <Flex
                        gap={5}
                        alignItems="center"
                        justifyContent="center"
                        margin="0 auto"
                        wrap="wrap"
                    >
                        {allowedTables.map((table) => (
                            <Box
                                key={table.id}
                                size="lg"
                                onClick={() => {
                                    setSelectedTable(table);
                                    setPrice(calculatePrice());
                                }}
                                minW="100px"
                                bgColor={
                                    selectedTable && selectedTable.id === table.id
                                        ? "yellow.400"
                                        : "white"
                                }
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
                    <Text color="red.500">{price.toLocaleString('en-US')} đồng</Text>
                </HStack>

              <HStack>
              <Button
                    
                    width="100%"
                    mt={2}
                    onClick={()=>{
                        navigate('/')
                    }
                }
                >
                    Trang chủ
                </Button>
                <Spacer />
              <Button
                    type="submit"
                    width="100%"
                    mt={2}
                    colorScheme="yellow"
                    leftIcon={<CalendarIcon/>}
                >
                    Đặt bàn
                </Button>
              </HStack>
            </form>
        </Container>
    );
}

export default ClubBook;
