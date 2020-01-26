import React, {memo, useReducer} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button, ButtonToolbar} from 'react-bootstrap';

import {partnerCodes} from 'utils/constants';
import CalendarTable from './CalendarTable';

const CalendarTab = memo(function CalendarTab({recoverFilter, recoveries}) {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {type: partnerCodes, selected: 0}
  );

  return (
    <Row>
      <ButtonToolbar style={{marginBottom: '1.5em', marginLeft: '1.7em'}}>
        {recoverFilter.map((item, selected) => (
          <Button
            key={item.key}
            bsStyle={state.selected === selected ? 'danger' : 'default'}
            onClick={() => setState({type: item.key, selected})}
          >
            {item.text}
          </Button>
        ))}
      </ButtonToolbar>
      <Col xs={6}>
        <CalendarTable
          header={`Hoy (${recoveries.TODAY.length})`}
          recoveries={recoveries.TODAY || []}
          type={state.type}
        />
      </Col>
      <Col xs={6} style={{paddingLeft: 0}}>
        <CalendarTable
          header={`Mañana (${recoveries.TOMORROW.length})`}
          recoveries={recoveries.TOMORROW || []}
          type={state.type}
        />
      </Col>
      <Col xs={6}>
        <CalendarTable
          header={`Retrasos (${recoveries.DELAYED.length})`}
          recoveries={recoveries.DELAYED || []}
          type={state.type}
        />
      </Col>
      <Col xs={6} style={{paddingLeft: 0}}>
        <CalendarTable
          header={`Futuro (${recoveries.FUTURE.length})`}
          recoveries={recoveries.FUTURE || []}
          type={state.type}
        />
      </Col>
    </Row>
  );
});

CalendarTab.propTypes = {
  recoveries: PropTypes.object.isRequired,
  recoverFilter: PropTypes.array.isRequired,
};

export default CalendarTab;
