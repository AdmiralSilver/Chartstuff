import {describe, expect} from "vitest";
import App from '/src/App.vue';
import { mount } from '@vue/test-utils';
//import TibberGraph from "/src/TibberGraph.vue";
import TibberButtons from "/src/TibberButtons.vue";
import TibberText from "/src/TibberText.vue";

describe("App", () => {
    const wrapper = mount(App);

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

})
describe("TibberButtons", () => {
    const wrapper = mount(TibberButtons);
    // Test to see if the buttons exist, and that show is emitted when clicked
    it('should find the buttons, and click them and the events should be emitted', function () {
        expect(wrapper.find('#vis').exists()).toBe(true);
        expect(wrapper.find('#fjern').exists()).toBe(true);
        // click the button vis and see if the emitted has the property show
        wrapper.find('#vis').trigger('click');
        // Only one value
        expect(wrapper.emitted('show')).toBeTruthy();
        // click the button fjern and see if the emitted has the property hide
        wrapper.find('#fjern').trigger('click');
        // It's now two values, since it's been clicked twice
        const emitted = wrapper.emitted('show');
        expect(emitted[1]).toEqual([false]);
    });
})
describe("TibberText", () => {
    const wrapper = mount(TibberText);

    // Tests to see if the wrapper exists AKA if the component has mounted successfully
    test('does a wrapper exist', () => {
        expect(wrapper.exists()).toBe(true);
    });
    // Tests to see if the markup is correct
    it('renders the correct markup', () => {
        expect(wrapper.html()).toContain('Assets traction angel investor user');
    });
    // Dont need more test since it's just a text component
})







