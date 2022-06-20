import React from "react";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }
  clear = () => {this.setState({ input: "" });}

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.input.length >= 1) {
      this.props.addTodo(this.state.input, this.clear);
    }

  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="todo-form">
        <input
          value={this.props.edit ==='' ? this.state.input:this.props.edit}
          onChange={(e) => this.setState({ input: e.target.value })}
          className="todo-input"
          placeholder="დაამატეთ რამე"
        />
        {this.props.edit !=='' ? (
          <button onClick={() => { this.props.editUpdate(this.props.edit,this.state.input)}} className="todo-button">
          განახლება
        </button>
        ):(<button type="submit" className="todo-button">
          დამატება
        </button>)}
        <button
          className="deleteAll"
          style={{ marginLeft: 5 }}
          onClick={this.props.deleteAll}
        >
          ყველას წაშლა
        </button>
      </form>
    );
  }
}

export default TodoForm;

