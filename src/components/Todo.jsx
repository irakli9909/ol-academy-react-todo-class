import React from "react";
import TodoForm from "./TodoForm";
import Todoitem from "./TodoItem";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      error: '',
      editText: ''

    };
  }
  edit = (text) => {this.setState({editText: text })}
  editUpdate = (oldText, newText) => {
    let newTodos = this.state.todos.map((todo) =>{
      if(todo.text ===oldText){
        todo.text=newText
      }
    } )
    this.setState({todos:newTodos})
  } 

  isCheckboxed = (id, value) => {
    let newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.checkboxed = value;
      }
    });
    this.setState({ todos: newTodos });
  };

  deleteAll = () => {
    this.setState({ todos: [] });
  };

  addTodo = (text, clear) => {
    const isDublicate = this.state.todos.some((todo) => todo.text === text);
    if (isDublicate) {
      this.setState({error:text + ' ეს ტექსტი უკვე არსებობს'})
      return;
    }
    let id =
      this.state.todos.length === 0
        ? 1
        : this.state.todos[this.state.todos.length - 1].id + 1;
    let todo = { id: id, text: text, completed: false,checkboxed: false };
    let newTodos = [todo, ...this.state.todos];
    this.setState({ todos: newTodos, error:'' });
    clear()
  };

  removeTodo = (id) => {
    let updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: updatedTodos });
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
          edit={this.state.editText}
          editUpdate = {this.editUpdate}

        />
        {this.state.error !== '' && (
          <p className="error-msg">{ this.state.error }</p>
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
      </div>
    );
  }
}

export default Todo;
