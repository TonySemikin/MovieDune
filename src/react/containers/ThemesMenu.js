import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { themes } from '../../constants/themes';
import { changeTheme } from '../../redux/actions';

class ThemesMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  toggleMenu() {
    this.setState((state) => ({ opened: !state.opened }));
  }

  onSelect(event) {
    event.persist();
    this.toggleMenu();

    this.props.changeTheme(event.target.id);
  }

  renderMenuItem(theme) {
    return (
      <span
        onClick={this.onSelect}
        key={theme.key}
        id={theme.key}
      >{theme.displayName}</span>
    );
  }

  render () {
    return (
      <div className={`menu ${this.state.opened ? 'menu--opened' : 'menu--closed'}`}>
        <div className='menu__icon' onClick={this.toggleMenu}>
          <span>&nbsp;</span>
        </div>
        <div className='menu__content'>
          {Object.values(themes).map(theme => this.renderMenuItem(theme))}
        </div>
      </div>
    );
  }
}

export default connect(null, { changeTheme })(ThemesMenu);
