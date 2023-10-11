import {Container} from "@mui/material";
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Container sx={
                {
                    maxWidth: '1200px',
                }
            }>
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-list__item">
                            <h1 className="heading">
                                <Link to="/">Billiards</Link>
                            </h1>
                        </li>
                        <li className="nav-list__item">
                            <a href="page/search.html">Tìm club</a>
                        </li>
                        <li className="nav-list__item">
                            <a href="page/booking.html">Đặt lịch</a>
                        </li>
                        <li className="nav-list__item">
                            <button className="login-btn">Đăng nhập</button>
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    )
}