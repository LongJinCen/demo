import React, { Component, Fragment } from 'react'

class TodoItem extends Component {

  render () {
    const { value, handleDelete } = this.props
    return (
      <Fragment>
        <li onClick={handleDelete}>{value}</li>
      </Fragment>
    )
  }
}

export default TodoItem