import React from "react";

const BooksList = ({
  isLoading,
  books,
  isLoggedIn,
  dispatch,
  deleteBook,
  readBook,
  bookinfo
}) => {
  const bookList =
    books.length > 0
      ? books.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex  justify-content-between align-items-center"
          >
            <div>{item.title}</div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                disabled={!isLoggedIn}
                onClick={() =>
                  dispatch(readBook(item))
                    .unwrap()
                    .then((originalPromiseResult) => {
                      // handle result here
                      console.log(originalPromiseResult);
                    })
                    .catch((rejectedValueOrSerializedError) => {
                      // handle error here
                      console.log(rejectedValueOrSerializedError);
                    })
                }
              >
                Read
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={!isLoggedIn}
                onClick={() =>
                  dispatch(deleteBook(item))
                    .unwrap()
                    .then((originalPromiseResult) => {
                      // handle result here
                      console.log(originalPromiseResult);
                    })
                    .catch((rejectedValueOrSerializedError) => {
                      // handle error here
                      console.log(rejectedValueOrSerializedError);
                    })
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))
      : "there's no books available";

  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "Loading..." : <ul className="list-group">{bookList}</ul>}
    </div>
  );
};
export default BooksList;
