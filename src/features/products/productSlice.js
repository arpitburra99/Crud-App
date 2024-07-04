import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    status: 'initial',
    error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('http://localhost:3000/products');
    return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
    const response = await axios.post('http://localhost:3000/products', product);
    return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, product }) => {
    const response = await axios.put(`http://localhost:3000/products/${id}`, product);
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
    return id;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product.id === action.payload.id);
                state.products[index] = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.payload);
            });
    },
});

export default productsSlice.reducer;
