import { Link } from "react-router-dom";
import { baseImgUrl, baseUrl, useBookContext } from "../../providers/BookProvider"
import AddBook from "./AddBook";
import ConfirmationModal from "../modal/ConfirmationModal";
import { useState } from "react";
import { useUserContext } from "../../providers/UserProvider";

const Books = () => {
    const { user } = useUserContext();
    const { books, removeBook } = useBookContext();
    const [bookId, setBookId] = useState();

    const handleDeleteItemSelected = (event) => {
        const bookId = event.target.dataset.bookId;
        setBookId(bookId)
        document.getElementById("confirmationModalButton").click();
    }

    const handleDeleteBook = () => {
        const handleDelete = async () => {
            const result = await removeBook(bookId);
        }
        handleDelete();
    }

    return (
        <article className="container p-5">
            <section className="text-center mb-5">
                <h1>Library</h1>
            </section>
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <th>Image</th>
                        <th>Title</th>
                        <th>Rating</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books?.map(b => (
                            <tr key={b.id}>
                                <td className="col-md-2">
                                    <img className="w-100" src={`${baseImgUrl}/${b.imageCover}`} alt="Book's Cover" />
                                </td>
                                <td><h4>{b.title}</h4></td>
                                <td>{b.rating}⭐</td>
                                <td className="col-6">
                                    <section style={{height: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {b.description}
                                    </section>
                                </td>
                                <td className="col-3">
                                    <Link className="btn btn-outline-primary" to={`/book/details/${b.id}`}>Show Book</Link>
                                    {
                                        user?.token === undefined ? <></> :
                                            <button className="btn btn-outline-danger ms-3" data-book-id={b.id} onClick={handleDeleteItemSelected}>Delete</button>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                user?.token === undefined ? <></> :
                    <section className="mt-5">
                        <h1 className="text-center m-5">Add More Book?</h1>
                        <AddBook />
                    </section>
            }
            <ConfirmationModal title="Delete Book" message={`Are you sure you wish to delete the book with an id: ${bookId} ?`} onConfirm={handleDeleteBook} />
        </article>
    );
};

export default Books;