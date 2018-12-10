import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class MovieIcon extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      bubbled: true,
    };

    this.unbubble = this.unbubble.bind(this);
  }

  unbubble() {
    this.setState({ bubbled: false });
  }

  componentDidMount() {
    const randomizer = Math.floor(Math.random() * 300);
    setTimeout(this.unbubble, randomizer);
  }

  render() {
    const { movie: { releaseYear, title, director, hash }, selected, toggleMovie } = this.props;
    const { bubbled } = this.state;

    return (
      <li
        className={`movies__item ${selected} ${bubbled ? 'bubbled' : ''}`}
        onClick={toggleMovie.bind(null, hash)}
        >
        <div className='movies__data movies__side'>
          <span className='release-year'>{releaseYear}</span>
          <span className='title'>{title}</span>
          <span className='director'>by {director}</span>
        </div>
        <div className='movies__actions movies__side'>
          <button className='movies__btn' onClick={(e) => e.stopPropagation()}>
            Go to movie
            <Link to={`/details/${hash.replace(/[^\w]/g, '').toLowerCase()}`} />
          </button>
        </div>
      </li>
    );
  }
}
