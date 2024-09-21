import {createAsyncThunk} from '@reduxjs/toolkit';
import {Product, ProductMutation, ProductWitchCategory} from '../types';
import axiosApi from '../axiosApi';
import {RootState} from '../app/store';

export const fetchProducts = createAsyncThunk<Product[], string | undefined>('products/fetch', async (categoryId) => {
  const {data: products} = await axiosApi.get<Product[]>('/products', {params: {category: categoryId}});
  return products;
});

export const createProduct = createAsyncThunk<void, ProductMutation, {state: RootState}>('products/create', async (productMutation, {getState}) => {
  const token = getState().users.user?.token;
  const formData = new FormData();
  formData.append('title', productMutation.title);
  formData.append('description', productMutation.description);
  if(productMutation.image) {
    formData.append('image', productMutation.image);
  }
  formData.append('category', productMutation.category);
  formData.append('price', productMutation.price);

  await axiosApi.post('/products', formData, {headers: {'Authorization' : `Bearer ${token}`}});
});

export const fetchOneProduct = createAsyncThunk<ProductWitchCategory, string>('products/fetchOne', async (id) => {
  const {data: product} = await axiosApi.get<ProductWitchCategory>(`/products/${id}`);
  return product;
});