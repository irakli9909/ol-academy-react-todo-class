import React from "react";
import TodoForm from "./TodoForm";
import Todoitem from "./TodoItem";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      error: "",
      editText: "",
      editId: "",
    };
  }
  edit = (text, id) => {
    this.setState({ editText: text, editId: id });
  };
  isCheckboxed = (id, value) => {
    let newTodos = [];
    this.state.todos.forEach((todo) => {
      if (todo.id === id) {
        todo.checkboxed = value;
      }
      newTodos.push(todo);
    });
    this.setState({ todos: newTodos });
  };

  deleteAll = () => {
    this.setState({ todos: [] });
  };

  addTodo = (text, clear) => {
    const isDublicate = this.state.todos.some((todo) => todo.text === text);
    if (isDublicate) {
      this.setState({ error: text + " ეს ტექსტი უკვე არსებობს" });
      return;
    }
    let id =
      this.state.todos.length === 0
        ? 1
        : this.state.todos[this.state.todos.length - 1].id + 1;
    let todo = { id: id, text: text, completed: false, checkboxed: false };
    let newTodos = [todo, ...this.state.todos];
    this.setState({ todos: newTodos, error: "" });
    clear();
  };

  removeTodo = (id) => {
    let updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: updatedTodos });
  };
  editDone = () => {
    const isDublicate = this.state.todos.some(
      (todo) => todo.text === this.state.editText
    );
    if (isDublicate) {
      this.setState({
        error: this.state.editText + " ეს ტექსტი უკვე არსებობს",
      });
      return;
    }

    let newTodos = [];
    this.state.todos.forEach((todo) => {
      if (todo.id === this.state.editId) {
        todo.text = this.state.editText;
      }
      newTodos.push(todo);
    });
    this.setState({ todos: newTodos, editText: "", editedText: "", error: "" });
  };
  deleteFinished = () => {
    let newTodos = this.state.todos.filter((todo) => todo.completed !== true);
    this.setState({ todos: newTodos });
  };

  deleteChekboxed = () => {
    let newTodos = this.state.todos.filter((todo) => todo.checkboxed !== true);
    this.setState({ todos: newTodos });
  };

  completeTodo = (id) => {
    let updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };
  render() {
    return (
      <div>
        <TodoForm
          todos={this.state.todos}
          deleteAll={this.deleteAll}
          addTodo={this.addTodo}
        />
        {this.state.error !== "" && (
          <p className="error-msg">{this.state.error}</p>
        )}
        <hr className="seperator" />
        {this.state.todos.map((todo) => {
          return (
            <Todoitem
              removeTodo={this.removeTodo}
              completeTodo={this.completeTodo}
              todo={todo}
              key={todo.id}
              isCheckboxed={this.isCheckboxed}
              edit={this.edit}
            />
          );
        })}
        {this.state.editText !== "" && (
          <div>
            <input
              className="todo-input"
              type="text"
              value={this.state.editText}
              onChange={(e) => this.setState({ editText: e.target.value })}
            />
            <button className="todo-button" onClick={() => this.editDone()}>
              განახლება
            </button>
          </div>
        )}
        <div>
          <button className="todo-button" onClick={()=> this.deleteFinished()} style={{marginRight: '5px'}}>დასრულებულების წაშლა</button>
          <button className="todo-button" onClick={()=> this.deleteChekboxed()}>მონიშნულების წაშლა</button>
        </div>
      </div>
    );
  }
}

export default Todo;
