// Container.test.js

import React from 'react';
import Enzyme, {mount} from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import {Container} from './';

Enzyme.configure({adapter: new Adapter()});

describe('<Container />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Container fluid="true" fixed="true">
        Test
      </Container>
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

  it('It renders some text passed by children', () => {
    expect(wrapper.find('Test'));
  });
});
