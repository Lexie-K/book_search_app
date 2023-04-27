import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import BookDetails from 'components/BookDetails/BookDetails';
import PageNotFound from 'components/PageNotFound';
import LoginPage from 'pages/LoginPage';
import SignUp from 'components/SignUp/SignUp';
import FavouritesBooks from 'components/Favourites/FavouritesBooks';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detailspage" element={<BookDetails />} />
        <Route path="/favourites" element={<FavouritesBooks/>} />
        <Route path="/loginpage" element={<LoginPage/>} />
        <Route path="/signuppage" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
