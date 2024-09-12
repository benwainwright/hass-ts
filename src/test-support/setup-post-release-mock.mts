import { vi } from "vitest";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
// @ts-ignore Post release E2E run installs the current package so its obviously not going to be available at build time
import * as rtmTypescript from "rtm-typescript";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
vi.doMock("../test-support/package-intercept", () => rtmTypescript);
