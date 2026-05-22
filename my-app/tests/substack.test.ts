import { describe, expect, it } from "vitest";
import { parseSubstackRss, slugFromSubstackLink, stripHtml } from "@/lib/substack";

const SAMPLE_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Test Pub</title>
    <item>
      <title><![CDATA[First Post]]></title>
      <link>https://test.substack.com/p/first-post</link>
      <pubDate>Mon, 01 Jan 2024 12:00:00 GMT</pubDate>
      <description><![CDATA[<p>Short excerpt</p>]]></description>
      <content:encoded><![CDATA[<p>Full body</p>]]></content:encoded>
    </item>
  </channel>
</rss>`;

describe("substack RSS", () => {
  it("extracts slug from Substack link", () => {
    expect(slugFromSubstackLink("https://foo.substack.com/p/my-slug")).toBe("my-slug");
  });

  it("parses items from RSS", () => {
    const posts = parseSubstackRss(SAMPLE_RSS);
    expect(posts).toHaveLength(1);
    expect(posts[0].slug).toBe("first-post");
    expect(posts[0].title).toBe("First Post");
    expect(posts[0].contentHtml).toContain("Full body");
    expect(posts[0].excerpt).toContain("Short excerpt");
  });

  it("stripHtml removes tags", () => {
    expect(stripHtml("<p>Hello <strong>world</strong></p>")).toBe("Hello world");
  });
});
