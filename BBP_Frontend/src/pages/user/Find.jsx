import React, {useContext} from 'react';
import {useLoaderData} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import {Container, Heading, HStack, Input, InputGroup, InputLeftElement, Select, Spacer, Text,} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import Clubs from "../../components/Clubs.jsx";

import unorm from "unorm"; // Import the unorm library

function Find(props) {
    const clubs = useLoaderData();
    const [search, setSearch] = React.useState("");
    const {districts} = useContext(GlobalContext);

    const normalize = (text) => {
        return unorm.nfkd(text).replace(/[\u0300-\u036F]/g, ""); // Normalize and remove diacritics
    };

    const [sortMethod, setSortMethod] = React.useState("rating");
    const [sortOrder, setSortOrder] = React.useState("desc");
    const [selectedDistrict, setSelectedDistrict] = React.useState(""); // State variable for selected district

    const filterAndSortClubs = () => {
        let filtered = [...clubs];

        if (selectedDistrict) {
            filtered = filtered.filter((club) => club.districtId == selectedDistrict);
        }

        filtered.sort((a, b) => {
            if (sortOrder === "asc") {
                return a[sortMethod] - b[sortMethod];
            } else {
                return b[sortMethod] - a[sortMethod];
            }
        });

        setFilteredClubs(filtered);
    };

    // Create a function to filter clubs based on the search query
    const filterClubs = (query) => {
        query = normalize(query.toLowerCase()); // Normalize and convert to lowercase

        return clubs.filter((club) => {
            const normalizedClubName = normalize(club.name.toLowerCase()); // Normalize and convert club name to lowercase
            return normalizedClubName.includes(query);
        });
    };

    const [filteredClubs, setFilteredClubs] = React.useState(clubs);

    const handleSearchChange = (e) => {
        const newSearch = e.target.value;
        setSearch(newSearch);
        setFilteredClubs(filterClubs(newSearch));
    };

    React.useEffect(() => {
        filterAndSortClubs();
    }, [selectedDistrict, sortMethod, sortOrder]);

    return (
        <Container maxW="1200px" as="main" py={10}>
            <Heading as="h2" size="lg" textAlign="center">Tìm club</Heading>
            <InputGroup my={5}>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300"/>}
                />
                <Input
                    bgColor="white"
                    type="text"
                    placeholder="Tìm kiếm"
                    value={search}
                    onChange={handleSearchChange}
                />
            </InputGroup>

            <HStack mb={10}>
                <Select
                    bgColor="white"
                    maxW="200px"
                    placeholder="Chọn quận/huyện"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                    {districts.map((district) => (
                        <option key={district.id} value={district.id}>{district.name}</option>
                    ))}
                </Select>
                <Spacer/>

                <Select
                    bgColor="white"
                    maxW="200px"
                    placeholder="Sắp xếp theo"
                    value={sortMethod}
                    onChange={(e) => setSortMethod(e.target.value)}
                >
                    <option value="rating">Đánh giá</option>
                    <option value="numberOfBooking">Lượt đặt</option>
                    <option value="numberOfRating">Lượt review</option>
                </Select>

                <Select
                    bgColor="white"
                    maxW="150px"
                    placeholder="Thứ tự"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Tăng dần</option>
                    <option value="desc">Giảm dần</option>
                </Select>
            </HStack>

            <Text color="gray.500" mb={5}>Tìm thấy {filteredClubs.length} clubs</Text>
            <Clubs clubs={filteredClubs}/>
        </Container>
    );
}

export default Find;
