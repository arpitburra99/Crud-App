import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './components/Navbar';

const ProductList = lazy(() => import('./components/ProductList'));
const AddProduct = lazy(() => import('./components/AddProducts'));
const EditProduct = lazy(() => import('./components/EditProduct'));

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container style={{ padding: '60px' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/edit/:id' element={<EditProduct />} />
          </Routes>
        </Suspense>
      </Container>
    </Router>
  );
}

export default App;
