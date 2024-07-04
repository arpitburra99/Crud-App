// src/components/EditProduct.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { addProduct, updateProduct } from '../features/products/productSlice';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (id) {
      dispatch(updateProduct({ id, product: { name, price } })).then(() =>
        navigate('/')
      );
    } else {
      dispatch(addProduct({ name, price })).then(() => navigate('/'));
    }
  };

  useEffect(() => {
    // Fetch the product data by ID if editing
    const fetchProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
      } catch (error) {
        console.error('Failed to fetch the product:', error);
      }
    };

    if (id) {
      fetchProductById();
    }
  }, [id]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
      <TextField
        label='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label='Price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        fullWidth
        sx={{ my: 1 }}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        onClick={handleSave}
        fullWidth
      >
        {id ? 'Update' : 'Save'}
      </Button>
    </form>
  );
};

export default EditProduct;
