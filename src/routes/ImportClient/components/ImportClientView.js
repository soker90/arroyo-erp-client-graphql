import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, Panel} from 'react-bootstrap';

import InputFile from 'components/InputFile';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

class ImportClientView extends PureComponent {
  static propTypes = {
    uploadCSV: PropTypes.func.isRequired,
    payloadErrors: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    uploadJSON: PropTypes.func.isRequired,
  };

  state = {
    file: null,
    json: null,
    uploadedCsv: false,
    uploadedJson: false,
  };

  handleChangeInputFile = event => {
    event.preventDefault();
    if (event.target.files.length === 1) {
      const file = event.target.files[0];
      this.setState({file});
    }
  };

  handleChangeInputJson = event => {
    event.preventDefault();
    if (event.target.files.length === 1) {
      const json = event.target.files[0];
      this.setState({json});
    }
  };

  handleSubmitCsv = event => {
    event.preventDefault();
    /**
     * TODO Si esto sigue aqui o se elimina el csv o se hace bien la chapuza de los errores
     */
    this.setState({
      uploadedCsv: true,
      uploadedJson: false,
    });
    this.props.uploadCSV(this.state.file, this.resetState);
  };

  handleSubmitJson = event => {
    event.preventDefault();
    this.setState({
      uploadedCsv: false,
      uploadedJson: true,
    });
    this.props.uploadJSON(this.state.json, this.resetState);
  };

  resetState = () => {
    this.setState({file: null, json: null});
  };

  renderPayloadErrors = () => {
    const {payloadErrors} = this.props;

    return <div>{`ERROR: ${payloadErrors.message}`}</div>;
  };

  render() {
    return (
      <div className="tab-body">
        <HasPermission access={USER_PERMISSIONS.IMPORT_CSV_EDIT}>
          <Panel header="Importar CSV">
            <InputFile
              name="csv"
              label="Seleccionar CSV"
              onChange={this.handleChangeInputFile}
              accept=".csv"
              bsStyle="primary"
            />
            <Button
              bsStyle="success"
              disabled={this.props.isLoading || !this.state.file}
              onClick={this.handleSubmitCsv}
            >
              Importar CSV
            </Button>
            {this.props.payloadErrors && this.state.uploadedCsv && this.renderPayloadErrors()}
          </Panel>

          <Panel header="Importar JSON">
            <InputFile
              name="json"
              label="Seleccionar JSON"
              onChange={this.handleChangeInputJson}
              accept=".json"
              bsStyle="primary"
            />
            <Button
              bsStyle="success"
              disabled={this.props.isLoading || !this.state.json}
              onClick={this.handleSubmitJson}
            >
              Importar JSON
            </Button>
            {this.props.payloadErrors && this.state.uploadedJson && this.renderPayloadErrors()}
          </Panel>
        </HasPermission>
      </div>
    );
  }
}

export default ImportClientView;
