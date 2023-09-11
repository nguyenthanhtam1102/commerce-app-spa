import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <h1>Home Page</h1>
            <Link to={'/products/1'}>Product 123</Link>
        </>
    )
}

export default HomePage;