import { useParams } from "react-router-dom"
import { baseImgUrl, baseUrl, useBookContext } from "../../providers/BookProvider";
import { useEffect, useState } from "react";


const BookDetails = () => {
    const { bookId } = useParams();
    const { findBookById } = useBookContext();

    const [book, setBook] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setBook(await findBookById(bookId));
        }
        fetchData();
    }, [])

    return (
        <article className="container">
            <article className="row p-5">
                <figure className="col-md-6 text-center">
                    <img className="w-75" src={`${baseImgUrl}/${book?.imageCover}`} alt="Book's Cover" />
                </figure>
                <section className="col-md-6">
                    <h1>{book?.title}</h1>
                    <p><strong>Author:</strong> {book?.author}</p>
                    <p><strong>Rating:</strong> {book?.rating} ⭐</p>
                    <p>{book?.description}</p>
                </section>
            </article>
        </article>
    );
};

export default BookDetails;