import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, Product, ProductMutation, ProductWitchCategory} from '../types';
import axiosApi from '../axiosApi';
import {RootState} from '../app/store';
import {isAxiosError} from 'axios';

export const fetchProducts = createAsyncThunk<Product[], string | undefined>('products/fetch', async (categoryId) => {
  const {data: products} = await axiosApi.get<Product[]>('/products', {params: {category: categoryId}});
  return products;
});

export const createProduct = createAsyncThunk<void, ProductMutation, {state: RootState, rejectValue: GlobalError}>('products/create', async (productMutation, {getState, rejectWithValue}) => {
 try {
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
 } catch (e) {
   if(isAxiosError(e) && e.response && e.response.status === 400) {
     return rejectWithValue(e.response.data);
   }
   throw e;
 }
});

export const fetchOneProduct = createAsyncThunk<ProductWitchCategory, string>('products/fetchOne', async (id) => {
  const {data: product} = await axiosApi.get<ProductWitchCategory>(`/products/${id}`);
  return product;
});

export const deleteProduct = createAsyncThunk<void, string, {state: RootState}>('products/delete', async (id, {getState}) => {
  const token = getState().users.user?.token;
  await axiosApi.delete(`/products/${id}`, {headers: {'Authorization' : `Bearer ${token}`}});
});