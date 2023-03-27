import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import BookDetails from './components/BookDetails/BookDetails';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detailspage" element={<BookDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
