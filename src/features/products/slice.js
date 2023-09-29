import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constant';
export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
  const res = await axios(`${BASE_URL}/products`);
  return res.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    filtered: [],
    related: [],
    isLoading: false,
  },
  reducers: {
    filterByPrice(state) {
      state.filtered = state.list.filter(({ price }) => price < 100);
    },
    getRelatedProducts(state, { payload }) {
      const list = state.list.filter(({ category: { id } }) => id === payload);
      state.related = list;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;
