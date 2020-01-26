import React from 'react';
import {List} from '@material-ui/core';
import PropTypes from 'prop-types';
import {matchPath} from 'react-router-dom';
import {NavigationListItem} from '../index';

const NavigationList = ({pages, permissions, ...rest}) => {

    const reduceChildRoutes = props => {
      const {items, page} = props;
      (page.children) ? _addSection(props) : _addItem(props);
      return items;
    };

    const _addSection = ({router, items, page, depth}) => {
      const open = matchPath(router.location.pathname, {
        path: page.href,
        exact: false,
      });
      const hasSectionAccess = permissions
        .map(permission => page.permissions.includes(permission))
        .some(check => !!check);

      if (hasSectionAccess)
        items.push(
          <NavigationListItem
            depth={depth}
            icon={page.icon}
            key={page.title}
            label={page.label}
            open={Boolean(open)}
            title={page.title}
          >
            <NavigationList
              depth={depth + 1}
              pages={page.children}
              router={router}
              permissions={permissions}
            />
          </NavigationListItem>,
        );
    };

    const _addItem = ({items, page, depth}) => {
      const hasItemAccess = permissions.includes(page.permission);

      if (hasItemAccess)
        items.push(
          <NavigationListItem
            depth={depth}
            href={page.href}
            icon={page.icon}
            key={page.title}
            label={page.label}
            title={page.title}
          />,
        );
    };

    return (
      <List>
        {pages.reduce(
          (items, page) => reduceChildRoutes({items, page, ...rest}),
          [],
        )}
      </List>
    );
  }
;

NavigationList.propTypes = {
  depth: PropTypes.number,
  pages: PropTypes.array,
};

export default NavigationList;
