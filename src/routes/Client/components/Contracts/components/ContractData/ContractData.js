import React, {memo} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ContractDataButtons from './ContractDataButtons';

import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
} from '@material-ui/core';
import {Label} from 'components';
import {totalsProcess, dataProcess, getScoreColor} from '../../utils';
import format from 'components/util/dataFormat';
import {useStyles} from './ContractData.styles';

const ContractData = memo(({className, contract, uploadContract, showModalChangeIban}) => {
  const classes = useStyles();

  /**
   * Render data label with value
   * @param {String} title
   * @param {String} value
   * @param {String} variant
   * @returns {ListItem}
   * @private
   */
  const _renderItem = (title, value, variant) =>
    <ListItem
      divider
    >
      <ListItemText
        primary={title}
        primaryTypographyProps={{variant: variant || 'h6'}}
      />
      <Typography variant="subtitle2">
        {value || 0}
      </Typography>
    </ListItem>;

  /**
   * Render group of data label
   * @param {Array} group
   * @param {Number} idx
   * @returns {Grid}
   * @private
   */
  const _renderGroup = (group, idx) =>
    <Grid item xs={4} key={idx}>
      <List className={idx === 0 ? classes.listFirst : classes.list}>
        {group.map(item => _renderItem(...item))}
      </List>
    </Grid>;

  /**
   * Render tag with PD
   * @returns {Label}
   * @private
   */
  const _renderPDTag = () =>
    <Label color={getScoreColor(contract.score)} className={classes.pd}>
      {`PD: ${contract.scoreValue} (${contract.score})`}
    </Label>;

  /**
   * Render all buttons
   * @returns {Fragment}
   * @private
   */
  const _renderButtons = () =>
    <ContractDataButtons contractId={contract.contractId}
                         uploadContract={uploadContract}
                         showModalChangeIban={showModalChangeIban}/>;

  return (
    contract &&
    <Card
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={_renderButtons()}
        title={<span>Contracto {contract.contractId}{_renderPDTag()}</span>}
      />
      <Divider/>
      <Grid
        container
        spacing={3}
        className={classes.tables}
      >
        {dataProcess(contract).map(_renderGroup)}
        <Divider/>
        {totalsProcess(contract).map(_renderGroup)}
        <Divider/>
        {_renderGroup([['QUITA', format.euro(contract.amortisationCondonation)]], 0)}
      </Grid>
    </Card>
  );
});

ContractData.propTypes = {
  className: PropTypes.string,
  contract: PropTypes.object.isRequired,
  uploadContract: PropTypes.func.isRequired,
  showModalChangeIban: PropTypes.func.isRequired,
};

ContractData.displayName = 'ContractData';

export default ContractData;
