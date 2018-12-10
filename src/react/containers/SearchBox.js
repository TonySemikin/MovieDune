import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { searchMovies } from '../../redux/actions';

class SearchBox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      scrolled: false,
    };

    this.searchField = React.createRef();

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onFormSubmit(event) {
    event.persist();
    event.preventDefault();

    this.props.searchMovies(this.state.search);
    this.searchField.current.focus();
  }

  onInputChange(event) {
    event.persist();

    this.setState((state) => ({
      search: event.target.value,
    }));

    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    };

    this.props.searchMovies(event.target.value);
  }

  onReset() {
    this.setState(() => ({
      search: '',
    }));

    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    };

    this.searchField.current.focus();
  }

  onScroll(event) {
    console.log(event);
    console.log(window);
    if (window.scrollY > 0 && !this.state.scrolled) {
      return this.setState({ scrolled: true });
    } else if (window.scrollY === 0) {
      return this.setState({ scrolled: false });
    }
  }

  render () {
    return (
      <section className={`search ${this.state.scrolled ? 'scrolled' : 'initial'}`}>
        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder="Search for a perfect movies"
            value={this.state.search}
            onChange={this.onInputChange}
            ref={this.searchField}
            />
          <span className="btn reset-btn">
            <button
              type="submit"
              className="btn material-icons icon"
              onClick={this.onReset}>clear</button>
          </span>
          <span className="btn submit-btn">
            <button
              type="submit"
              className="btn material-icons icon">search</button>
          </span>
        </form>
      </section>
    );
  }
}

export default connect(null, { searchMovies })(SearchBox);
