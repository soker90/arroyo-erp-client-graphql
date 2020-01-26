import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {makeStyles} from '@material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
  colors, ListItem, List,
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import {Label} from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    paddingBottom: 0,
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  description: {
    padding: theme.spacing(2, 3, 1, 3),
  },
  tags: {
    padding: theme.spacing(0, 3, 1, 3),
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
  learnMoreButton: {
    marginLeft: theme.spacing(2),
  },
  likedButton: {
    color: colors.red[600],
  },
  shareButton: {
    marginLeft: theme.spacing(1),
  },
  details: {
    padding: theme.spacing(1, 3),
  },
}));

const ProjectCard = props => {
  const {className, ...rest} = props;

  const classes = useStyles();

  const [liked, setLiked] = useState(true);

  const handleLike = () => {
    setLiked(true);
  };

  const handleUnlike = () => {
    setLiked(false);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        className={classes.header}
        disableTypography
        subheader={
          <Typography variant="body2">
            by{' '}
            {'project.author.name'}
            | Updated:
          </Typography>
        }
        title={
          'Titulo'
        }
      />
      <CardContent className={classes.content}>
        <div className={classes.description}>
          <List>
            <ListItem
              className={classes.listItem}
              disableGutters
              divider
            >
              <Typography variant="subtitle2">Deadline</Typography>
              <Typography variant="h6">
                13:00
              </Typography>
            </ListItem>
            <ListItem
              className={classes.listItem}
              disableGutters
              divider
            >
              <Typography variant="subtitle2">Per Project</Typography>
              <Typography variant="h6">
                12€
              </Typography>
            </ListItem>
            <ListItem
              className={classes.listItem}
              disableGutters
              divider
            >
              <Typography variant="subtitle2">Main Technology</Typography>
              <Label color={'#444'}>33</Label>
            </ListItem>
            <ListItem
              className={classes.listItem}
              disableGutters
            >
              <Typography variant="subtitle2">Last Update</Typography>
              <Typography variant="h6">
                12:00
              </Typography>
            </ListItem>
          </List>
        </div>
        <div className={classes.tags}>
          <Label
            color={'#232323'}
            key={'Tag'}
          >
            {'TAG'}
          </Label>
        </div>
        <Divider/>
        <div className={classes.details}>
          <Grid
            alignItems="center"
            container
            justify="space-between"
            spacing={3}
          >
            <Grid item>
              <Tooltip title="Share">
                <IconButton
                  className={classes.shareButton}
                  size="small"
                >
                  <ShareIcon/>
                </IconButton>
              </Tooltip>
              <Button
                className={classes.learnMoreButton}
                component={RouterLink}
                size="small"
                to="/projects/1/overview"
              >
                Learn more
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
