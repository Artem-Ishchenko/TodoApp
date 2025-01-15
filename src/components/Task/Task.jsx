import React, { Component } from 'react';

import Clock from '../Clock/clock';
import './Task.css';

export default class Task extends Component {
  state = {
    label: this.props.text,
  };

  onChangeValue = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmitCreate(this.props.id, this.state.label);
  };

  render() {
    const { text, onDeleted, onToggleDone, completed, edit, time, id, onEdit } = this.props;

    let classNames = '';
    let checked = '';

    if (completed) {
      classNames += ' completed';
      checked += 'checked';
    } else if (edit) {
      classNames += ' editing';
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input id={id} className="toggle " type="checkbox" defaultChecked={checked} onClick={onToggleDone} />
          <label htmlFor={id}>
            <span className="description">{text}</span>
            <span className="created">
              <Clock times={time} />
            </span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id={text} type="text" className="edit" defaultValue={text} onChange={this.onChangeValue} />
        </form>
      </li>
    );
  }
}
