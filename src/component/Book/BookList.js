import BookItem from './BookItem';
const BookList = ({ books }) => (
  <div className="book-list">
    {books.map(book => (
      <BookItem key={book.id} book={book} />
    ))}
  </div>
);

export default BookList;
