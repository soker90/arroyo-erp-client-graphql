import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Col} from 'react-bootstrap';
import FA from 'react-fontawesome';

/**
 * @name InfoPanel
 * @description Render a Panel wrapper with custom styling
 *
 */
class InfoPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hidden: this.props.hidden
        ? this.props.hidden && !this.props.static
        : false,
    };
  }

  handleHidden = () => {
    if (!this.props.static) {
      this.setState({
        hidden: !this.state.hidden,
      });
    }
  };

  render() {
    const _props = {};
    if (this.props.xs) {
      _props.xs = this.props.xs;
    }
    if (this.props.sm) {
      _props.sm = this.props.sm;
    }
    if (this.props.xs) {
      _props.md = this.props.md;
    }
    if (this.props.lg) {
      _props.lg = this.props.lg;
    }
    const barstyle = {
      cursor: this.props.static ? 'default' : 'pointer',
    };
    return (
      <Col {..._props} className="arroyo_box">
        <div className="arroyo_box_content">
          <div
            onClick={this.handleHidden}
            style={barstyle}
            className={`arroyo_box_header ${
              this.props.static ? '' : 'arroyo_box_header_hover'
            }`}
          >
            {this.props.title}
            {!this.props.static && (
              <FA name={`angle-${this.state.hidden ? 'down' : 'up'}`} />
            )}
          </div>

          <div
            className="arroyo_box_body"
            style={{
              display: this.state.hidden ? 'none' : 'block',
              width: '100%',
              padding: '10px',
              minHeight: this.props.height
                ? `${this.props.height}px`
                : 'inherit',
            }}
          >
            {this.props.children}
          </div>
        </div>
      </Col>
    );
  }
}

InfoPanel.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  static: PropTypes.bool,
  height: PropTypes.number,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

export default InfoPanel;
