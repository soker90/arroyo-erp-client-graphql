import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  ButtonToolbar,
  Button,
  Panel,
} from 'react-bootstrap';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

import ResultsTable from './ResultsTable';
import './SearchView.scss';

class SearchView extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    clients: PropTypes.object.isRequired,
    searchClients: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.ORIGINS = [
      {value: 'null', text: 'Todos'},
      {value: '001', text: 'Fintonic'},
      {value: '004', text: 'P3'},
    ];

    this.state = initialState;
  }

  resetState = () => {
    this.setState(initialState);
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    const formData = {
      ...this.state,
      contractId: Number(this.state.contractId || 0),
    };

    this.props.searchClients(formData);
    this.resetState();
  };

  renderSearchFooter() {
    const {isLoading} = this.props;

    return (
      <ButtonToolbar>
        <Button disabled={isLoading} type="submit" bsStyle="primary">
          Buscar
        </Button>
        <Button
          disabled={isLoading}
          bsStyle="default"
          onClick={this.resetState}
        >
          Limpiar campos
        </Button>
      </ButtonToolbar>
    );
  }

  renderFormInput(name, label) {
    return (
      <FormGroup controlId={name}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          type="text"
          name={name}
          value={this.state[name]}
          onChange={this.handleChange}
        />
      </FormGroup>
    );
  }

  renderForm() {
    return (
      <Form inline onSubmit={this.handleSubmit} className="search-client-form">
        <Panel header="Buscar" footer={this.renderSearchFooter()}>
          {this.renderFormInput('dni', 'DNI')}
          {this.renderFormInput('contractId', 'ID del Préstamo')}
          {this.renderFormInput('client_id', 'Client ID')}
          {this.renderFormInput('prospect_id_extern', 'Prospect ID extern')}
          {this.renderFormInput('name', 'Nombre')}
          {this.renderFormInput('lastname', 'Apellidos')}
          {this.renderFormInput('mobile', 'Teléfono')}
          {this.renderFormInput('email', 'Email')}
        </Panel>
      </Form>
    );
  }

  render() {
    const {clients} = this.props;

    return (
      <div className="tab-body">
        <HasPermission access={USER_PERMISSIONS.SEARCH_CLIENTS_READ}>
          {this.renderForm()}
          <ResultsTable clients={clients} />
        </HasPermission>
      </div>
    );
  }
}

export default SearchView;
