import { BrowserRouter, Route, Routes } from "react-router-dom"
import { BookProvider } from "./providers/BookProvider";
import Books from "./component/book/Books";
import BookDetails from "./component/book/BookDetails";
import { UserProvider } from "./providers/UserProvider";
import Login from "./component/login/Login";
import Layout from "./component/layout/Layout";
import Home from "./component/home/home";
import Contact from "./component/contact/Contact";
import Profile from "./component/profile/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <BookProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/books" element={<Books />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book/details/:bookId" element={<BookDetails />} />
            </Routes>
          </Layout>
        </BookProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
