import React, {memo} from 'react';
import PropTypes from 'prop-types';

import {
  ListItem,
  Typography,
} from '@material-ui/core';

import {useStyles} from './ItemCard.styles';


const ItemCard = memo(({label, value, divider = true}) => {
  const classes = useStyles();

  return <ListItem
    className={classes.listItem}
    disableGutters
    divider={divider}
  >
    <Typography variant="subtitle2">{label}</Typography>
    <Typography variant="h6">
      {value}
    </Typography>
  </ListItem>
});

ItemCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  divider: PropTypes.bool,
};

ItemCard.displayName = 'ItemCard';

export default ItemCard;
