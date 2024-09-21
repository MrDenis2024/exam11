import {Product, ProductWitchCategory} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createProduct, fetchOneProduct, fetchProducts} from './productsThunks';

export interface ProductsState {
  products: Product[];
  productsFetching: boolean;
  productCreating: boolean;
  oneProduct: ProductWitchCategory | null,
  oneProductLoading: boolean,
}

const initialState: ProductsState = {
  products: [],
  productsFetching: false,
  productCreating: false,
  oneProduct: null,
  oneProductLoading: false,
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

    builder.addCase(fetchOneProduct.pending, (state: ProductsState) => {
      state.oneProductLoading = true;
      state.oneProduct = null;
    }).addCase(fetchOneProduct.fulfilled, (state: ProductsState, {payload: product}) => {
      state.oneProductLoading = false;
      state.oneProduct = product;
    }).addCase(fetchOneProduct.rejected, (state: ProductsState) => {
      state.oneProductLoading = false;
    });
  },
  selectors: {
    selectProducts: (state: ProductsState) => state.products,
    selectProductsFetching: (state: ProductsState) => state.productsFetching,
    selectProductCreating: (state: ProductsState) => state.productCreating,
    selectOneProduct: (state: ProductsState) => state.oneProduct,
    selectOneProductLoading: (state: ProductsState) => state.oneProductLoading,
  },
});

export const productsReducer = productsSlice.reducer;
export const {
  selectProducts,
  selectProductsFetching,
  selectProductCreating,
  selectOneProduct,
  selectOneProductLoading,
} = productsSlice.selectors;