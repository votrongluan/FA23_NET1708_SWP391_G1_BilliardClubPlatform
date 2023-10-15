import {SimpleGrid} from "@chakra-ui/react";
import Club from "./Club.jsx";

// eslint-disable-next-line react/prop-types
function Clubs({clubs}) {
    return (
        <SimpleGrid spacing={5} columns={4}>
            {/* eslint-disable-next-line react/prop-types */}
            {clubs.map(club => (
                <Club key={club.id} club={club}/>
            ))}
        </SimpleGrid>
    );
}

export default Clubs;
