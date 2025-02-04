import { Component } from 'react';
import './timer.css';

export default class Timer extends Component {
  render() {
    const { timeLeft } = this.props;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return (
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    );
  }
}
