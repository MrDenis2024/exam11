import {Category} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchCategories} from './categoriesThunks';

export interface CategoriesState {
  categories: Category[];
  categoriesFetching: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  categoriesFetching: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state: CategoriesState) => {
      state.categoriesFetching = true;
    }).addCase(fetchCategories.fulfilled, (state: CategoriesState, {payload: categories}) => {
      state.categoriesFetching = false;
      state.categories = categories;
    }).addCase(fetchCategories.rejected, (state: CategoriesState) => {
      state.categoriesFetching = false;
    });
  },
  selectors: {
    selectCategories: (state: CategoriesState) => state.categories,
    selectCategoriesFetching: (state: CategoriesState) => state.categoriesFetching,
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const {
  selectCategories,
  selectCategoriesFetching,
} = categoriesSlice.selectors;