import React from 'react';
import { mount, shallow, unmount } from 'enzyme';
import { act } from '@testing-library/react';
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
    jest.useFakeTimers();
    const testingDateObject1 = new Date(1642330064797);
    const testingTime1 = testingDateObject1.toLocaleTimeString('en-US');
    const testingDateObject2 = new Date(1642421905035);
    const testingTime2 = testingDateObject2.toLocaleTimeString('en-US');
    const spy = jest.spyOn(Date.prototype, 'toLocaleTimeString').mockImplementationOnce(
      () => testingTime1,
    ).mockImplementationOnce(
      () => testingTime2,
    );
    const wrapper = mount(<Component />);
    act(
      () => {
        jest.runOnlyPendingTimers();
      },
    );
    // const wrapper = mount(<Component />);
    const componentTimeDisplay = findByAttribute(wrapper, 'time-display');
    expect(componentTimeDisplay?.text()).toBe(testingTime2);
    spy.mockRestore();
    jest.useRealTimers();
  });
  test('The Clock component should not be updated before 1 minute', () => {
    jest.useFakeTimers();
    const testingDateObject1 = new Date(1642330064797);
    const testingTime1 = testingDateObject1.toLocaleTimeString('en-US');
    const testingDateObject2 = new Date(1642421905035);
    const testingTime2 = testingDateObject2.toLocaleTimeString('en-US');
    const spy = jest.spyOn(Date.prototype, 'toLocaleTimeString').mockImplementationOnce(
      () => testingTime1,
    ).mockImplementationOnce(
      () => testingTime2,
    );
    const wrapper = mount(<Component />);
    act(
      () => {
        jest.advanceTimersByTime(100);
      },
    );
    // const wrapper = mount(<Component />);
    const componentTimeDisplay = findByAttribute(wrapper, 'time-display');
    expect(componentTimeDisplay?.text()).toBe(testingTime1);
    spy.mockRestore();
    jest.useRealTimers();
  });
  test.skip('The timers should be cleared when the Clock component is unmounted', () => {
    const wrapper = mount(<Component />);
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalledWith(expect.any(Number));
  });
});
