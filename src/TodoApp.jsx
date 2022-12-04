import * as React from 'react';

// Create a TodoApp component
class TodoApp extends React.Component {
  // Set the initial state of the component
  state = {
    todos: [],
    newTodo: ''
  };

  // When the component is mounted, load the existing to-dos from local storage
  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.setState({ todos });
  }

  // When the state of the component is updated, save the to-dos to local storage
  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  // Handle changes to the input field
  handleChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  // Handle submission of the form
  handleSubmit = (event) => {
    event.preventDefault();

    // Add the new to-do to the list
    this.setState({
      todos: [...this.state.todos, this.state.newTodo],
      newTodo: ''
    });
  };

  // Handle clicking on a to-do to mark it as completed
  handleComplete = (todo) => {
    // Find the index of the to-do in the list
    const index = this.state.todos.indexOf(todo);

    // Create a new list of to-dos with the completed to-do removed
    const todos = [
      ...this.state.todos.slice(0, index),
      ...this.state.todos.slice(index + 1)
    ];

    // Update the state with the new list of to-dos
    this.setState({ todos });
  };

  // Render the TodoApp component
  render() {
    // Destructure the state object
    const { todos, newTodo } = this.state;

    // Create an array of React elements for each to-do
    const todoElements = todos.map((todo) => (
      <li key={todo}>
        {todo}
        <button onClick={() => this.handleComplete(todo)}>
          Mark as Completed
        </button>
      </li>
    ));

    return (
      <div>
        <h1>To-Do App</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={newTodo}
            onChange={this.handleChange}
          />
          <button type="submit">Add To-Do</button>
        </form>
        <ul>
          {todoElements}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
