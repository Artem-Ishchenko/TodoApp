import React, { Component } from 'react';

import Clock from '../Clock/clock';
import './Task.css';
import Timer from '../Timer';

export default class Task extends Component {
  state = {
    label: this.props.text,
    initialLabel: this.props.text,
  };

  inputRef = React.createRef();

  componentDidUpdate(prevProps) {
    if (!prevProps.edit && this.props.edit) {
      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('mousedown', this.handleClickOutside);
      this.inputRef.current.focus();
    }
    if (prevProps.edit && !this.props.edit) {
      document.removeEventListener('keydown', this.handleKeyDown);
      document.removeEventListener('mousedown', this.handleClickOutside);
      this.inputRef.current.blur();
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.props.onEdit();
      this.setState({ label: this.state.initialLabel });
    } else if (e.key === 'Enter') {
      this.props.onSubmitCreate(this.props.id, this.state.label);
      this.setState({ initialLabel: this.state.label });
    }
  };

  handleClickOutside = (e) => {
    if (this.inputRef.current && !this.inputRef.current.contains(e.target)) {
      this.props.onEdit();
      this.setState({ label: this.state.initialLabel });
    }
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
    const { text, onDeleted, onToggleDone, completed, edit, time, id, onEdit, onStopTimer, onResumeTimer, timeLeft } =
      this.props;

    let classNames = '';

    const buttonsTimer = (
      <span className="description-timer">
        <button className="icon icon-play" onClick={onResumeTimer}></button>
        <button className="icon icon-pause" onClick={onStopTimer}></button>
        <Timer timeLeft={timeLeft} />
      </span>
    );

    if (completed) {
      classNames += ' completed';
    } else if (edit) {
      classNames += ' editing';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input id={id} className="toggle " type="checkbox" checked={completed} onChange={onToggleDone} />
          <label htmlFor={id}>
            <span className="description">{text}</span>
            {timeLeft > 0 && buttonsTimer}
            <span className="created">
              <Clock times={time} />
            </span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id={text}
            type="text"
            className="edit"
            value={this.state.label}
            onChange={this.onChangeValue}
            ref={this.inputRef}
          />
        </form>
      </li>
    );
  }
}
