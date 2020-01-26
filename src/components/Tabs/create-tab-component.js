import React, {memo, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {actions} from 'components/Tabs/modules/tabs';
import PropTypes from 'prop-types';
import Layout from 'layouts/Layout';
import {Container} from 'components/Container';
import browserHistory from 'redux/history';

export default (tab, ActiveTabContent) => {
  const TabsContainerComponent = memo(props => {
    const preTabSizeRef = useRef();
    useEffect(() => {
      preTabSizeRef.current = props.tabs.size;
      props.activateTab({
        ...tab,
        id: props.location.pathname,
        link: props.location.pathname,
      });
      //eslint-disable-next-line
    }, [props.activateTab]);

    useEffect(() => {
      if (preTabSizeRef.current  > props.tabs.size) {
        const tabs = props.tabs.toJS();
        const activeTab = tabs.find(t => t.active);
        if (activeTab && activeTab.link !== props.location.pathname) {
          browserHistory.push(activeTab.id);
        }
      }
      preTabSizeRef.current = props.tabs.size;
      // eslint-disable-next-line
    }, [props.tabs.size]);


    const _renderTab = activeTab => <ActiveTabContent {...props} activeTab={activeTab} />;

    const _renderEmpty = () => <div style={{backgroundColor: '#273135', height: '100vh'}} />;

      const activeTab = props.tabs.toJS().find(t => t.active);
      const showTab =
        activeTab && activeTab.link === props.location.pathname;

      return (
        <Layout>
          <Container id="body">
            {showTab ? _renderTab(activeTab) : _renderEmpty()}
          </Container>
        </Layout>
      );
  });

  TabsContainerComponent.propTypes = {
    auth: PropTypes.object.isRequired,
    tabs: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    activateTab: PropTypes.func.isRequired,
  };

  const mapStateToProps = ({tabs, router, auth}) => ({
    tabs,
    location: router.location,
    auth,
  });

  const mapDispatchToProps = {...actions};

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(TabsContainerComponent);
};
