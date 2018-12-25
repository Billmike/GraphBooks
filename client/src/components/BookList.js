import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetail from './BookDetail';
import Spinner from './Spinner/Spinner';

class BookList extends React.Component {
  state = {
    selected: null
  }

  displayBook = () => {
    const { data } = this.props;
    return data.books.map(book => {
      return (
          <li key={book.id} onClick={event => this.setState({ selected: book.id })}>{book.name}</li>
      )
    })
  }
  render() {
    return (
      <div>
        <ul id="book-list">
          {this.props.data.loading ? (<Spinner />) :
          this.displayBook()}
        </ul>
        <BookDetail bookId={this.state.selected} />
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);
