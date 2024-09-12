import { mock } from "vitest-mock-extended";
import { getLogger } from "./get-logger.js";
import { Logger } from "@types";
import { vi } from "vitest";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getLogger", () => {
  it("returns the logger passed in if one is provided", () => {
    const mockLogger = mock<Logger>();
    const logger = getLogger(mockLogger);
    expect(logger).toBe(mockLogger);
  });

  describe("if no logger is provided", () => {
    it("the returned logger uses console.log for info", () => {
      vi.stubGlobal("console", {
        log: vi.fn(),
      });

      const logger = getLogger(undefined);
      logger.info("test");
      expect(console.log).toHaveBeenCalledWith("test");
    });

    it("the returned logger uses console.log for warn", () => {
      vi.stubGlobal("console", {
        log: vi.fn(),
      });

      const logger = getLogger(undefined);
      logger.warn("test");
      expect(console.log).toHaveBeenCalledWith("test");
    });

    it("the returned logger uses console.log for error", () => {
      vi.stubGlobal("console", {
        log: vi.fn(),
      });

      const logger = getLogger(undefined);
      logger.error("test");
      expect(console.log).toHaveBeenCalledWith("test");
    });

    it("the returned logger uses console.log for fatal", () => {
      vi.stubGlobal("console", {
        log: vi.fn(),
      });

      const logger = getLogger(undefined);
      logger.fatal("test");
      expect(console.log).toHaveBeenCalledWith("test");
    });

    it("the returned logger does nothing for debug", () => {
      vi.stubGlobal("console", {
        log: vi.fn(),
      });

      const logger = getLogger(undefined);
      logger.debug("test");
      expect(console.log).not.toHaveBeenCalled();
    });

    it("the returned logger does nothing for trace", () => {
      vi.stubGlobal("console", {
        log: vi.fn(),
      });

      const logger = getLogger(undefined);
      logger.trace("test");
      expect(console.log).not.toHaveBeenCalled();
    });
  });
});
