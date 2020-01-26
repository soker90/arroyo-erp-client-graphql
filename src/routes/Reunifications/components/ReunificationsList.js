import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonToolbar, Panel} from 'react-bootstrap';
import browserHistory from 'redux/history';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import format from 'components/util/dataFormat';

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

/**
 * Reunification Status set default
 * selected item [0] All
 * selected item [1] pendientes
 * selected item [2] validadas
 * selected item [3] rechazadas
 * selected item [4] desistidas
 */
const ReunificationsList = memo(
  ({reunifications, reunificationsFilter, setReunificationsSelected, selected: {selectedItem, selectedIndex}},
  ) => {
    const [reunificationsFiltered, setReunificationsFiltered] = useState([]);
    useEffect(() => {
      reunifications && _filterTable();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex, reunifications]);

    const _filterTable = () => {
      const items = reunifications.filter(r =>
        selectedItem.includes(r.statusCod),
      );

      setReunificationsFiltered(items);
    };

    const _handleTableFilters = (item, selected) => {
      setReunificationsSelected(selected, item);
    };

    const _selectRow = selectedRow => {
      const path = `${BASE_PATH}/customercare/reunification/${
        selectedRow.reunificationId
      }`;
      browserHistory.push(path);
    };

    const reunificationsListTableProps = {
      striped: true,
      hover: true,
      condensed: true,
      trClassName: 'cursor-pointer',
      pagination: true,
      options: {
        onRowClick: _selectRow,
        sortName: 'operationDate',
        sortOrder: 'desc',
      },
      selectRow: {
        className: 'row-selected',
      },
    };

    /**
     * Render TableHeaderColumn item
     * @param {string} id
     * @param {string} label
     * @param {Object} others
     * @returns {TableHeaderColumn}
     * @private
     */
    const _renderTableHeaderColumn = (id, label, others = {}) =>
      <TableHeaderColumn
        dataField={id} {...others} dataSort
        filter={{type: 'TextFilter', delay: 300}}
        dataAlign="right">
        {label}
      </TableHeaderColumn>;

    /**
     * Render the button toolbar
     * @returns {ButtonToolbar}
     * @private
     */
    const _renderButtonToolbar = () =>
      <ButtonToolbar style={{marginBottom: '1.5em', marginLeft: '1.7em'}}>
        {reunificationsFilter.map((itemFilter, selectedFilter) => (
          <Button
            key={itemFilter.type}
            bsStyle={selectedIndex === selectedFilter ? 'danger' : 'default'}
            onClick={() => _handleTableFilters(itemFilter.type, selectedFilter)}
          >
            {itemFilter.text}
          </Button>
        ))}
      </ButtonToolbar>;


    return (
      <Panel header={`Listado de Reunificaciones (${reunificationsFiltered.length})`}>
        {_renderButtonToolbar()}
        <BootstrapTable
          {...reunificationsListTableProps}
          data={reunificationsFiltered}
        >
          {_renderTableHeaderColumn('clientId', 'ClientId', {isKey: true, width: '100'})}
          {_renderTableHeaderColumn('fullname', 'Nombre Y Apellidos')}
          {_renderTableHeaderColumn('email', 'Email')}
          {_renderTableHeaderColumn('amount', 'Importe Solicitado', {dataFormat: format.euro})}
          {_renderTableHeaderColumn('operationDate', 'Fecha de Operación', {dataFormat: format.dateShort})}
          {_renderTableHeaderColumn('modifiedDate', 'Fecha de Modificación', {dataFormat: format.dateShort})}
        </BootstrapTable>
      </Panel>
    );
  });

ReunificationsList.propTypes = {
  reunifications: PropTypes.array.isRequired,
  reunificationsFilter: PropTypes.array.isRequired,
  setReunificationsSelected: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    selectedIndex: PropTypes.number.isRequired,
    selectedItem: PropTypes.array.isRequired,
  }).isRequired,
};

export default ReunificationsList;
