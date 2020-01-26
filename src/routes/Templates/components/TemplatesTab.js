import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Row,
} from 'react-bootstrap';
import {Container} from 'components/Container';
import InfoPanel from 'components/InfoPanel';
import format from 'components/util/dataFormat';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import TemplatesSearch from './TemplateSearch';
import {formatName} from '../utils';

const TemplatesTab = memo(({templateList, showModifyClient, getTemplates}) => {
  useEffect(() => {
    getTemplates();
  }, [getTemplates]);

  /**
   * Handle function for button or row click
   * @param {number || null} emailTemplateId
   */
  const handleClick = ({emailTemplateId = null}) => {
    showModifyClient(emailTemplateId);
  };

  const _renderTableHeaderColumn = (id, label, othersProps) =>
    <TableHeaderColumn
      dataField={id}
      dataSort
      {...othersProps}
    >
      {label}
    </TableHeaderColumn>;

  return (
    <Container className="tab-body">
      <Row>
        <TemplatesSearch getTemplates={getTemplates}/>

        <InfoPanel xs={12} static title={`Plantillas (${templateList.length})`}>
          <Button
            bsStyle="danger"
            type="reset"
            onClick={handleClick}
          >
            Nueva
          </Button>
          <BootstrapTable
            striped
            hover
            data={templateList}
            condensed
            pagination={templateList.length > 10}
            trClassName='cursor-pointer'
            options={{onRowClick: handleClick}}
          >
            {_renderTableHeaderColumn('emailTemplateId', 'Id', {isKey: true, hidden: true})}
            {_renderTableHeaderColumn('shortDescription', 'Descripción')}
            {_renderTableHeaderColumn('subject', 'Asunto')}
            {_renderTableHeaderColumn('modDate', 'Fecha de modificación', {dataFormat: format.dateShort})}
            {_renderTableHeaderColumn('modUser', 'Modificado por', {dataFormat: formatName})}
          </BootstrapTable>
        </InfoPanel>
      </Row>
    </Container>
  );
});

TemplatesTab.propTypes = {
  templateList: PropTypes.array.isRequired,
  showModifyClient: PropTypes.func.isRequired,
  getTemplates: PropTypes.func.isRequired,
};

export default TemplatesTab;
