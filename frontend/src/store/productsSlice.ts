import {GlobalError, Product, ProductWitchCategory} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createProduct, deleteProduct, fetchOneProduct, fetchProducts} from './productsThunks';

export interface ProductsState {
  products: Product[];
  productsFetching: boolean;
  productCreating: boolean;
  createError: GlobalError | null;
  oneProduct: ProductWitchCategory | null,
  oneProductLoading: boolean,
  deleteLoading: boolean,
}

const initialState: ProductsState = {
  products: [],
  productsFetching: false,
  productCreating: false,
  oneProduct: null,
  oneProductLoading: false,
  deleteLoading: false,
  createError: null,
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
      state.createError = null;
    }).addCase(createProduct.fulfilled, (state: ProductsState) => {
      state.productCreating = false;
    }).addCase(createProduct.rejected, (state:ProductsState, {payload: error}) => {
      state.productCreating = false;
      state.createError = error || null;
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

    builder.addCase(deleteProduct.pending, (state: ProductsState) => {
      state.deleteLoading = true;
    }).addCase(deleteProduct.fulfilled, (state: ProductsState) => {
      state.deleteLoading = false;
    }).addCase(deleteProduct.rejected, (state: ProductsState) => {
      state.deleteLoading = false;
    });
  },
  selectors: {
    selectProducts: (state: ProductsState) => state.products,
    selectProductsFetching: (state: ProductsState) => state.productsFetching,
    selectProductCreating: (state: ProductsState) => state.productCreating,
    selectOneProduct: (state: ProductsState) => state.oneProduct,
    selectOneProductLoading: (state: ProductsState) => state.oneProductLoading,
    selectDeleteLoading: (state: ProductsState) => state.deleteLoading,
    selectCreateError: (state: ProductsState) => state.createError,
  },
});

export const productsReducer = productsSlice.reducer;
export const {
  selectProducts,
  selectProductsFetching,
  selectProductCreating,
  selectOneProduct,
  selectOneProductLoading,
  selectDeleteLoading,
  selectCreateError
} = productsSlice.selectors;