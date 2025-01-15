import React, { Component } from 'react';

import './TaskList.css';
import Task from '../Task';
export default class TaskList extends Component {
  static defaultProps = {
    todoData: [
      {
        text: 'ITEMDEFAULT!',
        id: 1,
        completed: false,
        time: new Date().getTime(),
      },
    ],
    onDeleted: () => {
      console.log('cliced del btn');
    },
    onToggleDone: () => {
      console.log('cliced done btn');
    },
  };

  render() {
    const { todoData, onDeleted, onToggleDone, onEdit, onSubmitCreate } = this.props;
    const elements = todoData.map((item) => {
      const { ...itemProps } = item;
      return (
        <Task
          key={item.id}
          {...itemProps}
          onDeleted={() => onDeleted(item.id)}
          onToggleDone={() => onToggleDone(item.id)}
          onEdit={() => onEdit(item.id)}
          onSubmitCreate={onSubmitCreate}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
