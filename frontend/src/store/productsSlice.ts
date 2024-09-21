import {Product} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createProduct, fetchProducts} from './productsThunks';

export interface ProductsState {
  products: Product[];
  productsFetching: boolean;
  productCreating: boolean;
}

const initialState: ProductsState = {
  products: [],
  productsFetching: false,
  productCreating: false,
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

    builder.addCase(createProduct.pending, (state: ProductsState) => {
      state.productCreating = true;
    }).addCase(createProduct.fulfilled, (state: ProductsState) => {
      state.productCreating = false;
    }).addCase(createProduct.rejected, (state:ProductsState) => {
      state.productCreating = false;
    });
  },
  selectors: {
    selectProducts: (state: ProductsState) => state.products,
    selectProductsFetching: (state: ProductsState) => state.productsFetching,
    selectProductCreating: (state: ProductsState) => state.productCreating,
  },
});

export const productsReducer = productsSlice.reducer;
export const {
  selectProducts,
  selectProductsFetching,
  selectProductCreating,
} = productsSlice.selectors;