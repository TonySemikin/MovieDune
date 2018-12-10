import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SearchPage from './components/SearchPage';
import MovieDetails from './components/MovieDetails';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <div className={`container ${this.props.theme}`}>
          <Route exact path='/' component={SearchPage} />
          <Route path='/details' component={MovieDetails} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return (
    { theme: state.theme }
  );
}

export default connect(mapStateToProps)(App);
