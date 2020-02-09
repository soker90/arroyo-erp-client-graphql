import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Typography, Grid, Button} from '@material-ui/core';

const HeaderGeneric = ({className, title, category, actions}) => {
  const _renderButtons = (item, index) =>
    <Button {...item} key={index}>
      {item?.label}
    </Button>;

  return <div
    className={className}
  >
    <Grid
      alignItems="flex-end"
      container
      justify="space-between"
      spacing={3}
    >
      <Grid item>
        <Typography
          component="h2"
          gutterBottom
          variant="overline"
        >
          {category}
        </Typography>
        <Typography
          component="h1"
          variant="h3"
        >
          {title}
        </Typography>
      </Grid>
      <Grid item>
        {actions?.map(_renderButtons)}
      </Grid>
    </Grid>
  </div>
};

/**
 * actions={[
            {
              icon: AddIcon,
              tooltip: 'Nueva plantilla',
              isFreeAction: true,
              onClick: handleClick,
            },
          ]}
 */

HeaderGeneric.propTypes = {
  className: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string.isRequired,
};

HeaderGeneric.displayName = 'HeaderGeneric';

export default memo(HeaderGeneric);
