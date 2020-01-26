import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {actions} from '../modules/erp';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import {Container} from 'components/Container';
import InfoPanel from 'components/InfoPanel';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

class ERPTabSC extends PureComponent {
  static propTypes = {
    downloadFile: PropTypes.func,
    erpTypes: PropTypes.object.isRequired,
    executeScript: PropTypes.func.isRequired,
  };

  state = {
    startDate: '',
    endDate: '',
    script: '',
    formCompleted: false,
  };

  componentDidMount() {
    this.props.getDownloadHistory();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.executeScript({
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      script: this.state.script,
    });
    this.setState({formCompleted: false});
  };

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value}, () => this.validateForm());
  };

  validateForm = () => {
    const {startDate, endDate, script} = this.state;
    if (startDate !== '' && endDate !== '' && script !== '') {
      this.setState({formCompleted: true});
    }
  };

  renderDownload = filename => (
    <Button
      onClick={() => this.props.downloadFile(filename)}
      bsStyle="success"
      bsSize="xs"
    >
      {filename}
    </Button>
  );

  render() {
    const {startDate, endDate, formCompleted} = this.state;
    const {erpTypes} = this.props;
    return (
      <HasPermission access={USER_PERMISSIONS.ERP_EXECUTE_EDIT}>
        <Container className="tab-body">
          <Row>
            <Col xs={12}>
              <InfoPanel title="Ejecución de scripts de contabilidad">
                <Form
                  inline
                  className="search-form"
                  onSubmit={this.handleSubmit}
                >
                  <FormGroup>
                    <ControlLabel>Movimiento</ControlLabel>
                    <FormControl
                      componentClass="select"
                      placeholder="select"
                      name="script"
                      onChange={this.handleChange}
                    >
                      <option value="">Selecciona un tipo</option>
                      {erpTypes.valueSeq().map(item => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </FormControl>
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Fecha inicio</ControlLabel>
                    <FormControl
                      type="date"
                      name="startDate"
                      value={startDate}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Fecha fin</ControlLabel>
                    <FormControl
                      type="date"
                      name="endDate"
                      value={endDate}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel> &nbsp;</ControlLabel>
                    <Button
                      disabled={!formCompleted}
                      type="submit"
                      bsStyle="primary"
                    >
                      Ejecutar
                    </Button>
                  </FormGroup>
                </Form>
              </InfoPanel>
            </Col>
          </Row>
        </Container>
      </HasPermission>
    );
  }
}

const mapStateToProps = ({erp}) => ({
  downloadHistory: erp.get('downloadHistory').toJS(),
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ERPTabSC);
