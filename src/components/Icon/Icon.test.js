// Container.test.js

import React from 'react';
import Enzyme, {mount} from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Icon from './';

Enzyme.configure({adapter: new Adapter()});

describe('<DataContent />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<Icon bundle="fontello" glyph="circle" />);
  });

  it('Renders properly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('It renders an Icon', () => {
    expect(wrapper.find(Icon));
  });
  it('It has some props', () => {
    expect(wrapper.find({bundle: 'fontello', glyph: 'circle'}));
  });
});
