import { mount } from '@vue/test-utils';
import TibberTesting from '/src/TibberTesting.vue';
import { describe, it, expect } from "vitest";

describe("TibberTest", () => {

    it("should renders is page content is correct", () => {
        const message = "Happy People";
        const testMessage = "Happy People";
        const wrapper = mount(TibberTesting, {
            props: { message },
        });

        expect(wrapper.text()).toBe(testMessage);
    });

    it("should render if props value is correct", () => {
        const message = "Happy People";
        const testMessage = "Happy People";
        const wrapper = mount(TibberTesting, {
            props: { message },
        });

        expect(wrapper.vm.message).toBe(testMessage);
    });
    it("should be 2 if a and b is 1", () => {
        const a = 1;
        const b = 1;
        const testSum = 2;
        const wrapper = mount(TibberTesting);

        expect(wrapper.vm.sumOfTwoNumbers(a,b)).toBe(testSum);


    });
});