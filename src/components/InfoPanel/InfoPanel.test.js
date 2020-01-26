// Container.test.js

import React from 'react';
import Enzyme, {mount} from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import InfoPanel from './InfoPanel';

Enzyme.configure({adapter: new Adapter()});

describe('<InfoPanel />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <InfoPanel hidden fluid="true" fixed="true" title="some title">
        Test
      </InfoPanel>
    );
  });

  it('Renders properly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('It has fluid prop', () => {
    expect(wrapper.find({fluid: true}));
  });
  it('It has fixed prop', () => {
    expect(wrapper.find({fluid: true}));
  });
  it('It has title prop', () => {
    expect(wrapper.find({title: 'some title'}));
  });

  it('It renders some text passed by children', () => {
    expect(wrapper.find('Test'));
  });

  describe('<InfoPanel hidden />', () => {
    let infoHidden;
    beforeAll(() => {
      infoHidden = mount(
        <InfoPanel hidden fluid="true" fixed="true" title="some title">
          Test
        </InfoPanel>
      );
    });

    it('Renders properly', () => {
      expect(toJSON(infoHidden)).toMatchSnapshot();
    });

    it('renders with hidden prop', () => {
      expect(infoHidden.find({hidden: false}));
    });
  });
});
