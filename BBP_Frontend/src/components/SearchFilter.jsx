import React, {useEffect, useState} from 'react';
import {HStack, Input, InputGroup, InputLeftElement, Select, Spacer, Text} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import unorm from "unorm";

function SearchFilter({data, methods, DisplayData}) {
    const normalize = (text) => {
        return unorm.nfkd(text).replace(/[\u0300-\u036F]/g, "");
    };

    const [filteredData, setFilteredData] = useState(data);
    const [search, setSearch] = useState("");
    const [sortMethod, setSortMethod] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const filterAndSort = () => {
        let filtered = [...data];

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

        setFilteredData(filtered);
    };

    const filtersData = (query) => {
        query = normalize(query.toLowerCase()); // Normalize and convert to lowercase

        return data.filter((el) => {
            return Object.values(el).some((field) => {
                const normalizedFieldData = normalize(field.toString().toLowerCase());
                return normalizedFieldData.includes(query);
            });
        });
    };

    const handleSearchChange = (e) => {
        const newSearch = e.target.value;
        setSearch(newSearch);
        console.log(newSearch);
        setFilteredData(filtersData(newSearch));
    };

    useEffect(() => {
        filterAndSort();
    }, [sortMethod, sortOrder]);

    return (
        <>
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
                <Spacer/>

                <Select
                    bgColor="white"
                    maxW="200px"
                    placeholder="Sắp xếp theo"
                    value={sortMethod}
                    onChange={(e) => setSortMethod(e.target.value)}
                >
                    {methods.map((method) => (
                        <option key={method.value} value={method.value}>{method.label}</option>
                    ))}
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

            <Text color="gray.500" mb={5}>Tìm thấy {filteredData.length} kết quả</Text>

            <DisplayData filteredData={filteredData}/>
        </>
    );
}

export default SearchFilter;