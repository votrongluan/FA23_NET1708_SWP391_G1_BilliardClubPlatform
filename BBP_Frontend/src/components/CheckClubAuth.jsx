import useAuth from "../hooks/useAuth.js";
import {useNavigate, useParams} from "react-router-dom";

function CheckClubAuth({children}) {
    const {auth} = useAuth();
    const {id} = useParams();
    const navigate = useNavigate();

    if (auth.clubId != id) {
        navigate('/staff/manage');
    } else {
        return children;
    }
}

export default CheckClubAuth;