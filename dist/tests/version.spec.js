import { getVersion } from "../utils/index";
describe("Version", () => {
    it("should return the correct application version", () => {
        expect(getVersion()).toBeTruthy();
    });
});
