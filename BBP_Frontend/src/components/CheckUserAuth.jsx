import useAuth from "../hooks/useAuth.js";
import {useNavigate, useParams} from "react-router-dom";

function CheckUserAuth({children}) {
    const {auth} = useAuth();
    const {id} = useParams();
    const navigate = useNavigate();

    if (auth.id != id) {
        navigate('/unauthorized');
    } else {
        return children;
    }
}

export default CheckUserAuth;