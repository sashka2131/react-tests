import List from "@material-ui/core/List";
import React from "react";

const TodoList = ({ todos, deleteTodo }) => (
  <List>
    {/* {todos.map((todo, index) => (
      <ListItem key={index.toString()} dense button>
        <Checkbox tabIndex={-1} disableRipple />
        <ListItemText primary={todo} />
      </ListItem>
    ))} */}
  </List>
);

export default TodoList;
