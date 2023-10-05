import { Link } from "react-router-dom";
import { baseImgUrl, useBookContext } from "../../providers/BookProvider"

const Home = () => {
    const { books } = useBookContext();

    return (
        <article className="container p-5">
            <section className="text-center mb-5">
                <h1>Library</h1>
            </section>
            <article className="row">
                {
                    books?.map(b => (
                        <section className="col-md-3 text-center" key={b.id}>
                            <figure className="mt-5">
                                <Link className="btn" to={`/book/details/${b.id}`}>
                                    <img className="w-100" src={`${baseImgUrl}/${b.imageCover}`} alt="Book's Cover" />
                                </Link>
                            </figure>
                            <h3>{b.title}</h3>
                            <p>Rating: {b.rating}⭐</p>
                        </section>
                    ))
                }
            </article>
        </article>
    );
};

export default Home;