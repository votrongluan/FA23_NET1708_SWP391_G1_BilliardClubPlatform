import {useContext, useEffect, useState} from "react";
import {useLoaderData} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import {Container, Heading, HStack, Input, InputGroup, InputLeftElement, Select, Spacer, Text,} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import Clubs from "../../components/Clubs.jsx";

function Find() {
    const clubs = useLoaderData();
    const [search, setSearch] = useState("");
    const {districtMap} = useContext(GlobalContext);

    const normalize = (text) => {
        return text
            .normalize("NFKD")
            .replace(/[\u0300-\u036F]/g, "")
            .replace(/đ/g, "d");
    };

    const [sortMethod, setSortMethod] = useState("rating");
    const [sortOrder, setSortOrder] = useState("desc");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const properties = ["clubName", "address"];
    const [filteredClubs, setFilteredClubs] = useState(clubs);

    const sortData = (dataNeedSortedByMethod) => {
        let filtered = [...dataNeedSortedByMethod];

        if (selectedDistrict) {
            filtered = filtered.filter((data) => {
                const club = data?.club;
                club.noRating = data?.noRating;
                club.noBooking = data?.noBooking;
                club.rating = data?.rating;
                return club.districtId == selectedDistrict;
            });
        }

        filtered.sort((a, b) => {
            if (sortMethod) {
                const valueA = a[sortMethod].toString();
                const valueB = b[sortMethod].toString();

                if (sortOrder === "asc") {
                    return valueA.localeCompare(valueB);
                } else {
                    return valueB.localeCompare(valueA);
                }
            }
        });

        return filtered;
    };

    const filtersData = (query) => {
        query = normalize(query.toLowerCase()); // Normalize and convert to lowercase

        return clubs.filter((el) => {
            return properties.some((property) => {
                const normalizedPropertyData = normalize(el.club[property].toString().toLowerCase());
                return normalizedPropertyData.includes(query);
            });
        });
    };

    const handleSearchChange = (e) => {
        const newSearch = e.target.value;
        setSearch(newSearch);
    };

    useEffect(() => {
        const dataAfterFilterBySearch = filtersData(search);
        const sortedData = sortData(dataAfterFilterBySearch);
        setFilteredClubs(sortedData);
    }, [sortMethod, sortOrder, search, selectedDistrict]);

    return (
        <Container maxW="1200px" as="main" py={10}>
            <Heading as="h2" size="lg" textAlign="center">
                Tìm club
            </Heading>
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
                    {Object.entries(districtMap).map(([id, name]) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
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
                    <option value="noBooking">Lượt đặt</option>
                    <option value="noRating">Lượt review</option>
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

            <Text color="gray.500" mb={5}>
                Tìm thấy {filteredClubs.length} clubs
            </Text>
            <Clubs clubs={filteredClubs}/>
        </Container>
    );
}

export default Find;