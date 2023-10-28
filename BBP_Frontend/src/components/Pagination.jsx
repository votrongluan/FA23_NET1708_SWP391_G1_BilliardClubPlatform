import React, {useState} from 'react';
import {Button, HStack, Input, Stack, VStack} from '@chakra-ui/react';

const Pagination = ({data, itemsPerPage, DisplayData}) => {
    if (data.length <= itemsPerPage) {
        return <DisplayData currentData={data}/>;
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [customPage, setCustomPage] = useState(''); // State for the custom page input

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const pageRange = 5; // Number of page buttons to show around the current page
    const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(totalPages, startPage + pageRange - 1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    const handleCustomPageChange = (e) => {
        setCustomPage(e.target.value);
    };

    const goToCustomPage = () => {
        const parsedPage = parseInt(customPage, 10);
        if (!isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages) {
            setCurrentPage(parsedPage);
            setCustomPage(''); // Clear the input field
            window.scrollTo(0, 0); // Scroll to the top of the page
        }
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let page = startPage; page <= endPage; page++) {
            buttons.push(
                <Button
                    key={page}
                    variant="solid"
                    colorScheme={currentPage === page ? 'blue' : 'gray'}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </Button>
            );
        }
        return buttons;
    };

    return (
        <>
            <DisplayData currentData={currentData}/>

            {/* Pagination buttons */}
            <VStack direction="row" spacing={2} mt={5} justify="center">
                <HStack>
                    {currentPage > 1 && (
                        <Button variant="solid" colorScheme="blue" onClick={handleFirstPage}>
                            Trang đầu: {1}
                        </Button>
                    )}
                    {renderPageButtons()}
                    {currentPage < totalPages && (
                        <Button variant="solid" colorScheme="blue" onClick={handleLastPage}>
                            Trang cuối: {Math.ceil(data.length / itemsPerPage)}
                        </Button>
                    )}
                </HStack>
                <Stack direction="row" spacing={2} mt={2} justify="center">
                    <Input
                        bgColor={"white"}
                        value={customPage}
                        onChange={handleCustomPageChange}
                        placeholder="Đi tới trang"
                    />
                    <Button variant="solid" colorScheme="blue" onClick={goToCustomPage}>
                        Đi
                    </Button>
                </Stack>
            </VStack>
        </>
    );
};

export default Pagination;
