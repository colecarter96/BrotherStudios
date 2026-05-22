import { describe, expect, it } from "vitest";
import { isValidNewsletterEmail } from "@/lib/newsletter";

describe("isValidNewsletterEmail", () => {
  it("accepts normal addresses", () => {
    expect(isValidNewsletterEmail("a@b.co")).toBe(true);
  });

  it("rejects invalid", () => {
    expect(isValidNewsletterEmail("not-an-email")).toBe(false);
    expect(isValidNewsletterEmail("")).toBe(false);
  });
});
