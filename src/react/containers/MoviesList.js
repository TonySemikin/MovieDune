import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { fetchMovies, resetError } from '../../redux/actions';
import withPagination from '../hoc/withPagination';
import MovieIcon from '../components/MovieIcon';
import Spinner from '../components/Spinner';
import Error from '../components/Error';

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      selectedMovie: '',
    };

    this.tryAgain = this.tryAgain.bind(this);
    this.toggleMovie = this.toggleMovie.bind(this);
  }

  componentDidMount() {
    const { fetchMovies, filteredMovies, feedPagination, status } = this.props;

    if (status === 'initial') {
      fetchMovies();
    } else {
      feedPagination(filteredMovies);
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps) {
    const { feedPagination, filteredMovies, status } = this.props;

    if (prevProps.filteredMovies !== filteredMovies) {
      feedPagination(filteredMovies);
    }

    if (prevProps.status === 'initial' && status !== 'initial') {
      this.setState({ loading: false });
    }

    if (prevProps.status === 'resetError') {
      this.setState({ loading: false });
    }
  }

  tryAgain() {
    const { fetchMovies, resetError } = this.props;

    this.setState({ loading: true });
    resetError();
    fetchMovies();
  }

  toggleMovie(hash) {
    if (this.state.selectedMovie === hash) {
      this.setState({ selectedMovie: '' });
    } else {
      this.setState({ selectedMovie: hash });
    }
  }

  render() {
    const { itemsToShow, status } = this.props;
    const { loading } = this.state;

    return (
      <section className='movies'>
        <Spinner loading={loading} container='movies' />
        {status === 'error' && !this.state.loading
          ? <Error type='fatal' container='movies' tryAgain={this.tryAgain} />
          : null}
        <ul className='movies__list'>
          { itemsToShow.length === 0 && status === 'running'
            ? <Error type='no_match' container='movies' />
            : itemsToShow.map(movie => (
              <MovieIcon
                key={movie.hash}
                selected={this.state.selectedMovie === movie.hash ? 'selected' : ''}
                toggleMovie={this.toggleMovie}
                movie={movie}
                />
            ))
          }
        </ul>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    filteredMovies: state.movies.filteredMovies,
    status: state.status,
  };
}

export default withPagination(
  connect(mapStateToProps, { fetchMovies, resetError })(MoviesList)
);
