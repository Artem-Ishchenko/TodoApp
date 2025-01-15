import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {
      console.log('check');
    },
  };

  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="search"
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.label}
          onChange={this.onLabelChange}
        />
      </form>
    );
  }
}
