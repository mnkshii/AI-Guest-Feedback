import { Link } from "react-router-dom";
function Navbar(){
    return(
        <nav>
        <h1>AI Guest Feedback Analyzer</h1>
    <p>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/login">Login</Link>
    </p>
    </nav>
    
    );
}
export default Navbar;