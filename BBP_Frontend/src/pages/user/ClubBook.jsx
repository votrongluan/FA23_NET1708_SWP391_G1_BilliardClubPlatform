import {useContext} from 'react';
import {Box, Button, FormControl, FormHelperText, FormLabel, Heading, Select,} from "@chakra-ui/react";
import {CalendarIcon} from "@chakra-ui/icons";
import {useLoaderData, useParams} from "react-router-dom";
import {DistrictContext} from "../../context/DistrictContext.jsx";

function ClubBook() {
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
    const {districts} = useContext(DistrictContext);
    const district = districts.find((district) => district.id === club.districtId);
    // const [reviews, setReviews] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     // Fetch reviews from the API
    //     fetch(`${baseURL}/reviews`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // Filter reviews by clubId
    //             const clubReviews = data.filter((review) => review.clubId === club.id);
    //             setReviews(clubReviews);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching reviews:", error);
    //             setLoading(false);
    //         });
    // }, [club.id]);

    return (
        <>
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

                <Button width="100%" mt={2} colorScheme="yellow" leftIcon={<CalendarIcon/>}>
                    Đặt bàn
                </Button>
            </form>
        </>
    );
}

export default ClubBook;
