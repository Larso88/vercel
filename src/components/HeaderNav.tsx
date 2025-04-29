import {Link} from "react-router-dom";


function HeaderNav() {
    console.log("I mounted HeaderNav")
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/games">Games</Link>

        </>
    );
}

export default HeaderNav
