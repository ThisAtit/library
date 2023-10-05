import { useState } from "react";
import { useBookContext } from "../../providers/BookProvider";
import InfoModal from "../modal/InfoModal";

const AddBook = () => {
    const { addBook } = useBookContext();
    const [book, setBook] = useState({ title: undefined, author: undefined, description: undefined, imageCover: undefined, rating: undefined });
    const [postResult, setPostResult] = useState();

    const handleFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.name === "file" ? event.target.files[0] : event.target.value;

        setBook(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const handleSubmit = async () => {
            const result = await addBook(book);
            setPostResult(result);
            event.target.reset();
            document.getElementById("infoModalButton").click();
        }

        handleSubmit();
    }

    return (
        <>
            <section className="container-fluid">
                <div className="row">
                    <div className="col">
                        <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" id="title" required />
                                <div id="titleHelp" className="form-text">The title of the book.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="author" className="form-label">Author</label>
                                <input type="text" className="form-control" name="author" id="author" required />
                                <div id="authorHelp" className="form-text">The author of the book.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rating" className="form-label">Rating</label>
                                <input type="number" className="form-control" name="rating" id="rating" required />
                                <div id="ratingHelp" className="form-text">The rating of the book.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" name="description" id="description" rows={6} required ></textarea>
                                <div id="descriptionHelp" className="form-text">The description of the book.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control" accept="image/*" id="image" name="file" required></input>
                                <div id="imageHelp" className="form-text">The image of the book.</div>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Save</button>
                        </form>
                    </div>
                </div>
            </section>
            <InfoModal title="Book Added" message={`The Book: "${postResult?.title}" has been added.`} />
        </>

    );
};

export default AddBook;