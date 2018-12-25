import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import toastr from 'toastr';

class AddBook extends React.Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  }

  displayAuthors = () => {
    console.log('Props', this.props)
    const { getAuthorsQuery } = this.props;
    return getAuthorsQuery.loading ? (<option>Loading authors...</option>) :
    getAuthorsQuery.authors.map(author => {
        return <option key={author.id} value={author.id}>{author.name}</option>
      })
  }

  onNameChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ [event.target.name]: inputValue })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { name, genre, authorId } = this.state;
    this.props.addBookMutation({
      variables: {
        name, 
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
    toastr.info('Book added successfully')
  }

  render() {
    return (
      <form id="add-book">
        <div className="field">
          <label>Book Name:</label>
          <input name="name" type="text" onChange={(event) => this.setState({ name: event.target.value })} />
        </div>
        <div className="field">
          <label>Genre</label>
          <input type="text" name="genre" onChange={(event) => this.setState({ genre: event.target.value })} />
        </div>
        <div className="field">
          <label>Select Author</label>
          <select name="authorId" value={this.state.authorId} onChange={(event) => this.setState({ authorId: event.target.value })}>
            {this.displayAuthors()}
          </select>
        </div>
        <button onClick={this.onSubmit}>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(addBookMutation, { name: 'addBookMutation' }),
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' })
)(AddBook)
