import {SimpleGrid} from "@chakra-ui/react";
import Club from "./Club.jsx";

// eslint-disable-next-line react/prop-types
function Clubs({clubs}) {
    return (
        <SimpleGrid spacing={5} columns={{
            base: 1,
            md: 2,
            lg: 4,
        }}>
            {/* eslint-disable-next-line react/prop-types */}
            {clubs.map(data => (
                <Club key={data.club.clubId} data={data}/>
            ))}
        </SimpleGrid>
    );
}

export default Clubs;
