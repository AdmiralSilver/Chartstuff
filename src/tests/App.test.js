import {describe} from "vitest";
import App from '/src/App.vue';
import { mount } from '@vue/test-utils';
//import TibberGraph from "/src/TibberGraph.vue";
import TibberButtons from "/src/TibberButtons.vue";

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
describe("TibberGraph", () => {
    const wrapper = mount(TibberButtons);
    // Test to see if the buttons exist
    it('should find the buttons', function () {
        expect(wrapper.find('#vis').exists()).toBe(true);
        expect(wrapper.find('#fjern').exists()).toBe(true);
        // click the button vis and see if the emit has the property show
        wrapper.find('#vis').trigger('click');
        expect(wrapper.emitted('show')).toBeTruthy();
        // click the button fjern and see if the emit has the property hide
        wrapper.find('#fjern').trigger('click');
        const emitted = wrapper.emitted('show');
        expect(emitted[1]).toEqual([false]);
        //expect(wrapper.find('#onclick').isVisible()).toBe(false);
    });
})







