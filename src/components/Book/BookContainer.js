import React, { Fragment, useEffect } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, deleteBook, readBook } from "../store/bookSlice";

import "./book.css";

const PostContainer = () => {
  const { isLoading, books, bookinfo } = useSelector((state) => state.books);
    const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks({ id: 1 }));
  }, [dispatch]);

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            isLoading={isLoading}
            books={books}
            isLoggedIn={isLoggedIn}
            deleteBook={deleteBook}
            dispatch={dispatch}
            bookinfo={bookinfo}
            readBook={readBook}
          />
        </div>
        <div className="col side-line">
          <BookInfo bookinfo={bookinfo} dispatch={dispatch} />
        </div>
      </div>
    </Fragment>
  );
};
export default PostContainer;
