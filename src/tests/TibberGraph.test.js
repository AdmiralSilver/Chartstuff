import {describe, expect} from "vitest";
import TibberGraph from '/src/TibberGraph.vue';
import { mount } from '@vue/test-utils';

describe("TibberGraph", () => {
    // Was just a test to see if I could get the tests to run
    it("test", () => {
        expect(1).toBe(1);
    })
    // Tests that the component has data
    it("has data", () => {
        expect(typeof TibberGraph.data).toBe('function');
    })
});

describe('Mounted App', () => {
    // Mounts the component
    const wrapper = mount(TibberGraph);

    // Tests to see if the wrapper exists AKA if the component has mounted successfully
    test('does a wrapper exist', () => {
        expect(wrapper.exists()).toBe(true);
    });
    // Tests to see if the markup is correct
    it('renders the correct markup', () => {
        expect(wrapper.html()).toContain('Average temperature');
    });
    // Tests to see when the data is updated that the markup is updated
    it('renders correct with different data',async () => {
        wrapper.setData({nowTemp: 13.4});
        await wrapper.vm.$nextTick();
        expect(wrapper.html()).toContain('13.4°');
    })

});


