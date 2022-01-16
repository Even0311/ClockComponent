import React from 'react';
import { mount, shallow } from 'enzyme';
import Component from '..';
import findByAttribute from '../../../test/utils';

describe('Testing the Clock Component', () => {
  test('The Clock component renders without errors', () => {
    const wrapper = shallow(<Component />);
    const ClockComponent = findByAttribute(wrapper, 'clock-component');
    expect(ClockComponent.length).toBe(1);
  });
  test('The Clock component should display the correct time', () => {
    // Provide a mocking date
    const testingDateObject = new Date(1642330064797);
    // Obtain the mocked time according to the mocking date
    const testingTime = testingDateObject.toLocaleTimeString('en-us');
    // mock the new Date method used by the component
    const spy = jest.spyOn(global, 'Date')
      .mockImplementation(() => (testingDateObject as unknown) as string);
    const wrapper = shallow(<Component />);
    const componentTimeDisplay = findByAttribute(wrapper, 'time-display');
    expect(componentTimeDisplay.text()).toBe(testingTime);
    // clear up the Date method
    spy.mockRestore();
  });
  test('The Clock component should be updated correctly', () => {
    const testingDateObject = new Date(1642330064797);
    // Obtain the mocked time according to the mocking date
    const testingTime = testingDateObject.toLocaleTimeString('en-us');
    // mock the new Date method used by the component
    const spy = jest.spyOn(global, 'Date')
      .mockImplementation(() => (testingDateObject as unknown) as string);
    const wrapper = shallow(<Component />);
    // Provide a mocking date
    jest.runOnlyPendingTimers();
    const componentTimeDisplay = findByAttribute(wrapper, 'time-display');
    expect(componentTimeDisplay.text()).toBe(testingTime);
    // clear up the Date method
    spy.mockRestore();
  });
  test('The Clock component should not be updated before 1 minute', () => {
  });
  test('The timers should be cleared when the Clock component is unmounted', () => {
  });
});
