import React, {PureComponent, memo} from 'react';
import PropTypes from 'prop-types';
import browserHistory from 'redux/history';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import './TabsComponents.scss';

const tabListProps = {
  axis: 'x',
  lockAxis: 'x',
  lockOffset: ['0%', '100%'],
  lockToContainerEdges: true,
  pressDelay: 200,
  transitionDuration: 100,
};

class TabItemComponent extends PureComponent {
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
          <FontAwesomeIcon icon={faTimes}/>
        </div>
      </div>
    );
  }
}

const TabItem = SortableElement(TabItemComponent);

const TabListComponent = (
  {
    items,
    removeTab,
    activateTab,
  }) => {
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
};

const TabList = SortableContainer(memo(TabListComponent));

class TabsComponents extends PureComponent {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    activateTab: PropTypes.func.isRequired,
    removeTab: PropTypes.func.isRequired,
    orderTabs: PropTypes.func.isRequired,
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.orderTabs({oldIndex, newIndex});
    this.props.activateTab(this.props.tabs[newIndex]);
    browserHistory.push(this.props.tabs[newIndex].link);
  };

  render() {
    return (
      <div className="TabsComponents">
        <TabList
          helperClass="sortableHelper"
          onSortEnd={this.onSortEnd}
          items={this.props.tabs}
          removeTab={this.props.removeTab}
          activateTab={this.props.activateTab}
          {...tabListProps}
        />
      </div>
    );
  }
}

export default TabsComponents;

