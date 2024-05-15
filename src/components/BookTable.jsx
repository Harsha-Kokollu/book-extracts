import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Table.scss';
import moment from 'moment';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'default',
  });

  useEffect(() => {
    axios
      .get('/getextracts?titlecontains=s')
      .then((response) => {
        setBooks(response.data.Extracts);
      })
      .catch((error) => {
        console.error('There was an error fetching the book extracts!', error);
      });
  }, []);

  const sortedBooks = React.useMemo(() => {
    let sortableBooks = [...books];
    if (sortConfig !== null && sortConfig.key !== null) {
      sortableBooks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBooks;
  }, [books, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === 'descending'
    ) {
      direction = 'default';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Cover</th>
          <th onClick={() => requestSort('author')}>
            Author
            {sortConfig.key === 'author'
              ? sortConfig.direction === 'ascending'
                ? '🔼'
                : '🔽'
              : ''}
          </th>
          <th>Biography</th>
          <th onClick={() => requestSort('title')}>
            Title
            {sortConfig.key === 'title'
              ? sortConfig.direction === 'ascending'
                ? '🔼'
                : '🔽'
              : ''}
          </th>
          <th onClick={() => requestSort('estimatedReadingTimeMinutes')}>
            Reading Time (minutes)
            {sortConfig.key === 'estimatedReadingTimeMinutes'
              ? sortConfig.direction === 'ascending'
                ? '🔼'
                : '🔽'
              : ''}
          </th>
          <th onClick={() => requestSort('publicationDate')}>
            Publication Date
            {sortConfig.key === 'publicationDate'
              ? sortConfig.direction === 'ascending'
                ? '🔼'
                : '🔽'
              : ''}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedBooks.map((book, index) => (
          <tr key={book.isbn}>
            <td>{index + 1}</td>
            <td>
              <a
                href={`https://extracts.panmacmillan.com/extract?isbn=${book.isbn}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={book.jacketUrl}
                  alt={`${book.title} cover`}
                  style={{ width: '50px' }}
                />
              </a>
            </td>
            <td>{book.author}</td>
            <td dangerouslySetInnerHTML={{ __html: book.authorBiography }}></td>
            <td>
              <a
                href={`https://extracts.panmacmillan.com/extract?isbn=${book.isbn}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {book.title}
              </a>
            </td>
            <td>{book.estimatedReadingTimeMinutes}</td>
            <td>{moment(book.publicationDate).format('MM/DD/YY')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
