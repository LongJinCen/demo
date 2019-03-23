import React, { Component, Fragment } from 'react'
import TodoItem from './TodoItem'
import style from './style.css'

class TodoList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: '',
      list: []
    }
  }

  handleAdd = (event) => {
    const { list, value } = this.state
    list.push(value)
    this.setState({
      list: list,
      value: '',
    })
  }
  
  handleChange = (event) => {
    const target = event.target
    this.setState({
      value: target.value
    })
  }

  handleDelete = (index) => {
    let { list } = this.state
    list = list.filter((value, curIndex) => {
      return curIndex !== index
    })
    this.setState({
      list: list
    })
  }
  render () {
    const { list, value } = this.state
    const ulList = list.map((value, index) => {
      return (
        <TodoItem 
          value={value}
          key={index}
          handleDelete={ this.handleDelete.bind(this, index)}
        />
      )
    }) 
    return (
      <div>
        <input onChange={this.handleChange} value={value}/>
        <button onClick={this.handleAdd}>添加</button>
        <ul>
          {ulList}
        </ul>
      </div>
    )
  }
}

export default TodoList