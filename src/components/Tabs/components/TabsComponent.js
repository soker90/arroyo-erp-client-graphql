import React, {PureComponent, memo} from 'react';
import PropTypes from 'prop-types';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import browserHistory from 'redux/history';
import './TabsComponents.scss';
import {navigateTo} from '../../../utils';

const tabListProps = {
  axis: 'x',
  lockAxis: 'x',
  lockOffset: ['0%', '100%'],
  lockToContainerEdges: true,
  pressDelay: 200,
  transitionDuration: 100,
};

class TabItem extends PureComponent {
  static propTypes = {
    tab: PropTypes.object.isRequired,
    removeTab: PropTypes.func.isRequired,
    activateTab: PropTypes.func.isRequired,
  };

  activateTab = () => {
    this.props.activateTab(this.props.tab);
    browserHistory.push(this.props.tab.link);
  };

  removeTab = () => {
    this.props.removeTab(this.props.tab);
  };

  render() {
    const {tab} = this.props;
    const classNames = `tab-item${tab.active ? ' tab-active' : ''}`;

    return (
      <div className={classNames}>
        <div className="tab-text" onClick={this.activateTab}>
          <span>{tab.title}</span>
        </div>
        <div className="tab-close" onClick={this.removeTab}>
          <CloseRoundedIcon fontSize='small'/>
        </div>
      </div>
    );
  }
}

const TabList = memo(function TabListComponent({
                                                 items,
                                                 removeTab,
                                                 activateTab,
                                               }) {
  const tabs = items.map((tab, index) => (
    <TabItem
      key={tab.id}
      index={index}
      tab={tab}
      removeTab={removeTab}
      activateTab={activateTab}
    />
  ));

  return <div className="tab-list">{tabs}</div>;
});

class TabsComponents extends PureComponent {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    activateTab: PropTypes.func.isRequired,
    removeTab: PropTypes.func.isRequired,
    orderTabs: PropTypes.func.isRequired,
  };

  // Me preocupa el rendimiento, no es muy bonito esto tampoco
  _removeTab = tab => {
    this.props.removeTab(tab);
    let tabs = this.props.tabs.slice();
    const tabIndex = tabs.findIndex(t => t.id === tab.id);
    if (tab.active) {
      const nextIndex = tabIndex - 1;
      if (nextIndex !== -1) {
        browserHistory.push(tabs[nextIndex].link);
      } else
        navigateTo('inicio');
    }
  };

  render() {
    return (
      <div className="TabsComponents">
        <TabList
          helperClass="sortableHelper"
          // onSortEnd={this.onSortEnd}
          items={this.props.tabs}
          removeTab={this._removeTab}
          activateTab={this.props.activateTab}
          {...tabListProps}
        />
      </div>
    );
  }
}

export default TabsComponents;

