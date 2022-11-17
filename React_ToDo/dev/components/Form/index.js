import React from "react";

class Form extends React.Component {
  state = {
    text: this.props.item?.text || "",
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const {text} = this.state;

    const newTodo = {
      id: this.props.item?.id || Date.now(),
      text,
      isDone: false,
    };

    this.props.submitForm(newTodo);

    this.clearForm();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  clearForm = () => {
    this.setState({
      text: "",
    });
  }

  render() {
    const { text } = this.state; 

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="todo-input"
          type="text"
          name="text"
          placeholder="Type your todo..."
          value={text}
          onChange={this.handleChange}
        />
        <button className="todo-btn" type="submit">
          add
        </button>
        {/* <button className="todo-btn" type="button">show/hide</button> */}
      </form>
    );
  }
}

export default Form;
