import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button, ButtonToolbar} from 'react-bootstrap';
import WalletTable from './WalletTable';
import AmountBox from './AmountBox';
import {partnerCodes} from 'utils/constants';

class WalletTab extends PureComponent {
  static propTypes = {
    recoveries: PropTypes.object.isRequired,
    recoverFilter: PropTypes.array.isRequired,
    unread: PropTypes.array.isRequired,
  };

  state = {
    detailsBoxExpanded: true,
    ZERO: false,
    THIRTY: false,
    SIXTY: false,
    NINETY: false,
    HUNDRED_EIGHTY: false,
    UNREAD: false,
    type: partnerCodes,
    selected: 0,
  };

  toogleDetails = () => {
    this.setState({detailsBoxExpanded: !this.state.detailsBoxExpanded});
  };

  toogleExpandedBox = item => {
    this.setState({[item]: !this.state[item]});
  };

  handleTableFilters = (type, selected) => this.setState({type, selected});

  render() {
    const {recoveries, recoverFilter, unread} = this.props;
    const {type} = this.state;

    return (
      <div>
        <Row>
          <ButtonToolbar style={{marginBottom: '1.5em', marginLeft: '1.7em'}}>
            {recoverFilter.map((recover, selected) => (
              <Button
                key={recover.text}
                bsStyle={
                  this.state.selected === selected ? 'danger' : 'default'
                }
                onClick={() => this.handleTableFilters(recover.key, selected)}
              >
                {recover.text}
              </Button>
            ))}
          </ButtonToolbar>
          <Col xs={12}>
            {recoveries && (
              <AmountBox
                expanded={this.state.detailsBoxExpanded}
                recoveries={recoveries}
                toogleDetails={this.toogleDetails}
                type={type}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            {recoveries.ZERO && (
              <WalletTable
                type={type}
                expanded={this.state.ZERO}
                header="0-30 días"
                recoveries={recoveries.ZERO}
                toogleBox={() => this.toogleExpandedBox('ZERO')}
              />
            )}
          </Col>
          <Col xs={6} style={{paddingLeft: 0}}>
            {recoveries.THIRTY && (
              <WalletTable
                type={type}
                expanded={this.state.THIRTY}
                header="30-60 días"
                recoveries={recoveries.THIRTY}
                toogleBox={() => this.toogleExpandedBox('THIRTY')}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            {recoveries.SIXTY && (
              <WalletTable
                type={type}
                expanded={this.state.SIXTY}
                header="60-90 días"
                recoveries={recoveries.SIXTY}
                toogleBox={() => this.toogleExpandedBox('SIXTY')}
              />
            )}
          </Col>
          <Col xs={6} style={{paddingLeft: 0}}>
            {recoveries.NINETY && (
              <WalletTable
                type={type}
                expanded={this.state.NINETY}
                header="+90 días"
                recoveries={recoveries.NINETY}
                toogleBox={() => this.toogleExpandedBox('NINETY')}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            {recoveries.HUNDRED_EIGHTY && (
              <WalletTable
                type={type}
                expanded={this.state.HUNDRED_EIGHTY}
                header="+180 días"
                recoveries={recoveries.HUNDRED_EIGHTY}
                toogleBox={() => this.toogleExpandedBox('HUNDRED_EIGHTY')}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            {unread && (
              <WalletTable
                type={type}
                expanded={this.state.UNREAD}
                header="HOY"
                recoveries={unread}
                toogleBox={() => this.toogleExpandedBox('UNREAD')}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default WalletTab;
