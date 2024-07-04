import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { addProduct } from '../features/products/productSlice';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ name, price })).then(() => navigate('/'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Product</h1>
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
      <Button type='submit' variant='contained' color='primary' fullWidth>
        Add
      </Button>
    </form>
  );
};

export default AddProduct;
