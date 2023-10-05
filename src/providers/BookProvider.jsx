import { createContext, useContext, useEffect, useState } from "react";

export const baseUrl = "https://localhost:7155/api";
export const baseImgUrl = "https://localhost:7155";

const BookContext = createContext();

export const useBookContext = () => {
    const context = useContext(BookContext);
    return context;
};

const getBooks = async () => {
    const result = await fetch(`${baseUrl}/book`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });
    return await result.json();
}

const getBookById = async (id) => {
    const result = await fetch(`${baseUrl}/book/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });
    return await result.json();
}

const postBook = async (book) => {
    const form = new FormData();
    for (const [key, value] of Object.entries(book)) {
        form.append(key, value);
    }

    const result = await fetch(`${baseUrl}/book`, {
        method: "POST",
        headers: {
            "authorization": `bearer ${localStorage.getItem("token")}`
        },
        body: form
    });

    return await result.json();
}

const deleteBook = async (id) => {
    const result = await fetch(`${baseUrl}/book/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });
    return await result.json();
}

export const BookProvider = ({children}) => {
    const [books, setBooks] = useState();

    const findBookById = async (id) => {
        return await getBookById(id);
    }

    const addBook = async (book) => {
        const newBook = await postBook(book);
        setBooks (prevValue => ([
            ...prevValue,
            newBook
        ]));

        return newBook;
    }

    const removeBook = async (id) => {
        const deletedBook = await deleteBook(id);
        setBooks (prevValue => prevValue.filter(b => b.id !== deletedBook.id));
        return deleteBook;
    }

    useEffect (() => {
        const fetchData = async () => {
            setBooks (await getBooks());
            
        }

        fetchData();
    }, [])

    return (
        <BookContext.Provider value={{books, findBookById, addBook, removeBook}}>
            {children}
        </BookContext.Provider>
    )
    
}