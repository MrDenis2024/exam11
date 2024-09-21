import {Product} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchProducts} from './productsThunks';

export interface ProductsState {
  products: Product[];
  productsFetching: boolean;
}

const initialState: ProductsState = {
  products: [],
  productsFetching: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state: ProductsState) => {
      state.productsFetching = true;
    }).addCase(fetchProducts.fulfilled, (state: ProductsState, {payload: products}) => {
      state.productsFetching = false;
      state.products = products;
    }).addCase(fetchProducts.rejected, (state: ProductsState) => {
      state.productsFetching = false;
    });
  },
  selectors: {
    selectProducts: (state: ProductsState) => state.products,
    selectProductsFetching: (state: ProductsState) => state.productsFetching,
  },
});

export const productsReducer = productsSlice.reducer;
export const {
  selectProducts,
  selectProductsFetching,
} = productsSlice.selectors;