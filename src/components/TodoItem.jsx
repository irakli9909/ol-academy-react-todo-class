import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
class Todoitem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className={this.props.todo.completed ? "todo-row complete" : "todo-row"}
      >
        <input
          type="checkbox"
          onClick={(e) =>
            this.props.isCheckboxed(this.props.todo.id, e.target.checked)
          }
        />
        {this.props.todo.text}
        <div className="iconsConteiner">
          <AiFillEdit
            className="check"
            style={{ marginRight: 5 }}
            onClick={() => this.props.edit(this.props.todo.text,this.props.todo.id)}
          ></AiFillEdit>
          <RiCloseCircleLine
            className="check"
            style={{ marginRight: 5 }}
            onClick={() => this.props.removeTodo(this.props.todo.id)}
          />
          <BiCheckCircle
            className="check"
            onClick={() => this.props.completeTodo(this.props.todo.id)}
          />
        </div>
      </div>
    );
  }
}

export default Todoitem;
