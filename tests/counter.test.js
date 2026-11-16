import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Counter App", () => {
  it("increments and resets the counter", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({
      url: process.env.APP_URL || "https://demonstration-average-eric-pst.trycloudflare.com",
    });

    const assertInitial = await testdriver.assert("Count is 0");
    expect(assertInitial).toBeTruthy();

    const incButton = await testdriver.find("+1 button");
    await incButton.click();

    const assertCount1 = await testdriver.assert("Count is 1");
    expect(assertCount1).toBeTruthy();

    await incButton.click();

    const assertCount2 = await testdriver.assert("Count is 2");
    expect(assertCount2).toBeTruthy();

    const resetButton = await testdriver.find("Reset button");
    await resetButton.click();

    const assertReset = await testdriver.assert("Count is 0");
    expect(assertReset).toBeTruthy();
  });
});
