import React from 'react';
import { graphql } from 'react-apollo';
import { getBookDetailsQuery } from '../queries/queries';

class BookDetails extends React.Component {
  render() {
    console.log('This props', this.props)
    return (
      <div id="details">
        {this.props.data.loading && <p>loading.....</p>}
        {this.props.data.book !== null ? (
          <div>
            <h2>Book Name: {this.props.data.book && this.props.data.book.name}</h2>
            <p>Book ID: {this.props.data.book && this.props.data.book.id}</p>
            <p>Book Author: {this.props.data.book && this.props.data.book.author.name}</p>
            <p>Author Age: {this.props.data.book && this.props.data.book.author.age}</p>
            <p>Other Books by author</p>
            <ul className="other-books">
            {
              this.props.data.book && this.props.data.book.author.books.map(book => {
                return <li key={book.id}>{book.name}</li>
              })
            }
            </ul>
          </div>
        ): (<p>No book selected yet</p>)}
      </div>
    )
  }
}

export default graphql(getBookDetailsQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
