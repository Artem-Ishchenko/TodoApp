import React, { Component } from 'react';

import './Footer.css';
import TaskFilter from '../TaskFilter';

export default class Footer extends Component {
  static defaultProps = {
    filter: 'all',
    onFilterChange: () => {
      console.log('click onFilterChange default');
    },
    onClearCompleted: () => {
      console.log('click onFilterChange default');
    },
    todo: 999,
  };

  render() {
    const { todo, filter, onFilterChange, onClearCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{todo} items left</span>
        <TaskFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
