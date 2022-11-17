import React from "react";

import Form from "../Form";

class Item extends React.Component {
  state = {
    isShowForm: false,
  }

  handleChange = () => {
    const { isShowForm } = this.state;

    this.setState({
      isShowForm: !isShowForm,
    });
  }

  editTodoItem = (todoItem) => {
    this.handleChange();

    this.props.editItem(todoItem);
  }

  render() {
    const { id, text, isDone, deleteItem, toggleDone } = this.props;
    const {isShowForm} = this.state;

    if (!text) return null;

    return (
      <li className={`list__item item ${isDone ? "item--done" : ""}`}>
        {
          isShowForm ? (
            <Form
              submitForm={this.editTodoItem}
              item={{ text, id }}
            />
          ) : (
            <>
              <span className="item__text"> {text} </span>
              <div className="btn-wrapper">
                <button
                  className="item__btn"
                  type="button"
                  aria-label="done"
                  onClick={() => toggleDone(id)}
                >
                  ✓
                </button>
                <button
                  className="item__btn"
                  type="button"
                  aria-label="edit"
                  onClick={this.handleChange}
                >
                  ✑
                </button>
                <button
                  className="item__btn"
                  type="button"
                  aria-label="delete"
                  onClick={() => deleteItem(id)}
                >
                  ✗
                </button>
              </div>
            </>
          )
        }
      </li>
    );
  }
}

export default Item;
