import {describe} from "vitest";
import App from '/src/App.vue';
import { mount } from '@vue/test-utils';

describe("App", () => {
    const wrapper = mount(App);
    // Link the constant button to the button with id="vis" in the component TibberButtons
    const button = wrapper.find('#vis');
    // Test to see if the wrapper exists
    test('does a wrapper exist', () => {
        expect(wrapper.exists()).toBe(true);
    });

    // Test to see if title is Temperatures
    it('renders the correct title', () => {
        expect(wrapper.html()).toContain('Temperatures');
    })
    // Test to see if the markup is correct
    it('renders the correct markup', () => {
        expect(wrapper.html()).toContain('Average temperature');
    })

    // Test to see if div with id="onclick" is hidden
    it('onclick is hidden', () => {
        expect(wrapper.find('#onclick').isVisible()).toBe(false);
    })

    // Test to see if div with id="onclick" is visible
    it('click button and make onclick visible',async () => {
        // Check if it finds the right button
        expect(button.exists()).toBe(true);
        // Click the button
        await button.trigger('click');
        // Check if the div is visible
        expect(wrapper.find('#onclick').isVisible()).toBe(true);
    })

})






