import {SimpleGrid} from "@chakra-ui/react";
import Club from "./Club.jsx";
import Pagination from "./Pagination.jsx";

function Clubs({clubs}) {
    return (
        <Pagination data={clubs} itemsPerPage={16} DisplayData={({currentData}) => (
            <SimpleGrid spacing={5} columns={{
                base: 1,
                md: 2,
                lg: 4,
            }}>
                {currentData.map(data => (
                    <Club key={data.club.clubId} data={data}/>
                ))}
            </SimpleGrid>
        )}/>
    );
}

export default Clubs;
