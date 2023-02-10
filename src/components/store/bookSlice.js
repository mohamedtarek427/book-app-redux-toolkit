import {
  createAsyncThunk,
  createSlice,
  rejectWithValue,
} from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";
export const getBooks = createAsyncThunk(
  "books/getbooks",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3500/books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//instert thunk
export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      bookData.userName = getState().auth.name;
      //we can use Dispatch here too to make another action
      //dispatch(deletetBook({id:1}))
      const res = await fetch("http://localhost:3500/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      dispatch(logInsert({name: 'insertBook', status: 'success'}));
      return data;
    } catch (error) {
            dispatch(logInsert({ name: "insertBook", status: "failed" }));
      return rejectWithValue(error.message);
    }
  }
);
export const deleteBook = createAsyncThunk(
  "book/deletetBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3500/books/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // const data = await res.json();
      // return data;
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const readBook = createAsyncThunk(
  "book/readBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3500/books/${item.id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // const data = await res.json();
      // return data;
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false, error: null, bookinfo: null },
  extraReducers: {
    //get Books
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      console.log(action);
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
      console.log(action);
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }, //insert books
    [insertBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insertBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //delete book
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((el) => el.id !== action.payload.id);
      state.bookinfo = null;
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //readBook
    [readBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookinfo = action.payload;
    },
  },
});
export default bookSlice.reducer;
