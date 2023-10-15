import React, {useState} from 'react';
import {Button, FormControl, FormLabel, Heading, Input, Select,} from "@chakra-ui/react";
import {CalendarIcon} from "@chakra-ui/icons";

function Book(props) {
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

    const clubs = [
        "Club A",
        "Club B",
        "Club C",
        "Club D",
        "Club E",
        // Add more club names here
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestedClubs, setSuggestedClubs] = useState([]);

    const handleSearchTermChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        // Filter clubs based on the search term
        const filteredClubs = clubs.filter((club) =>
            club.toLowerCase().includes(term.toLowerCase())
        );
        setSuggestedClubs(filteredClubs);
    };

    return (
        <>
            <Heading mb={10} size="lg" textAlign="center">
                Đặt bàn
            </Heading>
            <form onSubmit={null}>
                <FormControl isRequired mb="20px">
                    <FormLabel>1. Chọn club</FormLabel>
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    />
                    {suggestedClubs.length > 0 && (
                        <ul>
                            {suggestedClubs.map((club, index) => (
                                <li key={index}>{club}</li>
                            ))}
                        </ul>
                    )}
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

export default Book;
