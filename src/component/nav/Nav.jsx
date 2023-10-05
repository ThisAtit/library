import { Link } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider";

const Nav = () => {

    const { user } = useUserContext();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container ps-5">
                <Link className="navbar-brand" to="/">Library</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#libraryNav" aria-controls="libraryNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="libraryNav">
                    <ul className="navbar-nav me-auto">
                        <Link className="nav-link active" to="/">Home</Link>
                        <Link className="nav-link" to="/books">Books</Link>
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </ul>
                    {
                        user === undefined ?
                            <div>
                                <Link className="btn btn-outline-primary" to="/login">Login</Link>
                            </div>
                            :
                            <div>
                                <Link className="btn btn-outline-success" to="/profile" >{user.user.email}</Link>
                            </div>
                    }
                </div>

            </div>
        </nav>
    );
};

export default Nav;