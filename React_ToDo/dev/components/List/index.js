import React from "react";

import Item from "../Item";

class List extends React.Component {

  componentWillUpdate(nextProps) {
    localStorage.setItem('todos', JSON.stringify(nextProps.todos));
  }

  render() {
    const { todos, deleteTodo, editTodo, toggleDone } = this.props;

    return (
      <ul className="list">
        {todos.map(({ id, text, isDone }) => (
          <Item
            key={id}
            id={id}
            text={text}
            deleteItem={deleteTodo}
            editItem={editTodo}
            toggleDone={toggleDone}
            isDone={isDone}
          />
        ))}
      </ul>
    );
  }
}

export default List;
