// Container.test.js

import React from 'react';
import Enzyme, {mount} from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import DataContent from './DataContent';

Enzyme.configure({adapter: new Adapter()});

describe('<DataContent />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<DataContent title="some title">Some Content</DataContent>);
  });

  it('Renders properly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('It has some title prop', () => {
    expect(wrapper.find({title: 'some title'}));
  });
  it('It renders some content', () => {
    expect(wrapper.find('Some Content'));
  });
});
