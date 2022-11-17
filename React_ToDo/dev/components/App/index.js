import React from "react";

import Title from "../Title";
import Form from "../Form";
import List from "../List";

const todoList = [];

class App extends React.Component {
  state = {
    todos: todoList,
  }

  componentWillMount() {
    localStorage.getItem('todos') && this.setState({
      todos: JSON.parse(localStorage.getItem('todos')),
    })
  }

  addTodo = (newTodo) => {
    const { todos } = this.state;

    this.setState({
      todos: [newTodo, ...todos],
    });
  }

  deleteTodo = (id) => {
    const { todos } = this.state;

    this.setState({
      todos: todos.filter((item) => item.id !== id),
    });
  }

  toggleDone = (id) => {
    const { todos } = this.state;

    this.setState({
      todos: todos.map(item => {
        if (item.id === id) {
          item.isDone = !item.isDone
        }

        return item;
      })
    });
  }

  editTodo = (todoItem) => {
    const { todos } = this.state;

    this.setState({
      todos: todos.map(item =>
        item.id === todoItem.id ? todoItem : item
      )
    })
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="container">
        <div className="wrapper">
          <Title />
          <Form submitForm={this.addTodo} />
          <List 
            todos={todos} 
            deleteTodo={this.deleteTodo} 
            editTodo={this.editTodo}
            toggleDone={this.toggleDone} 
          />
        </div>
      </div>
    );
  }
}

export default App;
