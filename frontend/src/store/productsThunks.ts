import {createAsyncThunk} from '@reduxjs/toolkit';
import {Product} from '../types';
import axiosApi from '../axiosApi';

export const fetchProducts = createAsyncThunk<Product[], string | undefined>('products/fetch', async (categoryId) => {
  const {data: products} = await axiosApi.get<Product[]>('/products', {params: {category: categoryId}});
  return products;
});