import {describe, expect} from "vitest";
import TibberGraph from './src/TibberGraph.vue';
import { mount } from '@vue/test-utils';

describe("TibberGraph", () => {
    it("test", () => {
        expect(1).toBe(1);
    })

   it("has data", () => {
       expect(typeof TibberGraph.data).toBe('function');
   })
});

describe('Mounted App', () => {
    const wrapper = mount(TibberGraph);

    test('does a wrapper exist', () => {
        expect(wrapper.exists()).toBe(true);
    });
    it('renders the correct markup', () => {
        expect(wrapper.html()).toContain('Average temperature');
    });
    it('renders correct with different data',async () => {
        wrapper.setData({nowTemp: 13});
        await wrapper.vm.$nextTick();
        expect(wrapper.html()).toContain('13');
    })

});


