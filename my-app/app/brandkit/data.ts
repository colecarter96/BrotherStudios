export type PlatformAccount = {
  handle: string;
  url: string;
  /** Manually maintained follower/subscriber count; use integers (e.g., 12345). */
  followers?: number | null;
  /** Optional total likes (e.g., TikTok). */
  likes?: number | null;
};

export type BrandKitData = {
  brandName: string;
  tagline?: string;
  /** Optional hero background image. Provide later; gradient fallback used if absent. */
  heroImage?: string;
  location?: string;
  availability?: string;
  about?: string;
  tags?: string[]; // e.g., ["Travel", "Adventure", "Fashion", "Surf", "Culture", "Lifestyle"]
  contacts: {
    email: string;
  };
  accounts: {
    tiktok: PlatformAccount[];
    instagram: PlatformAccount[];
    youtube: PlatformAccount[];
  };
  /** Optional curated content (thumbnails or external links). */
  featured?: Array<{
    title?: string;
    image?: string;
    href?: string;
  }>;
  pillars?: Array<{
    title: string;
    blurb: string;
  }>;
  offerings?: string[]; // “Ways we can build a trip around your brand”
  industries?: string[]; // “Who we want to work with”
};

// Edit follower counts over time to keep stats fresh.
// You can also add/remove items or update links here without touching page code.
const BRANDKIT_DATA: BrandKitData = {
  brandName: "Two Brothers",
  tagline: "Creators, storytellers, and brand partners.",
  heroImage: "/BryceColePhoto.webp",
  location: "San Diego, California",
  availability: "Available for travel worldwide",
  about:
    "Hi! We're Bryce and Cole. We're two brothers from San Diego, CA. We're building a world around travel, new experiences, and everyday growth together. \n Our shortform content focuses on culture, dances, fashion, and personality. While on YouTube documents longer form adventure and travel stories. \n We work with brands that want to be a part of the experience, not just placed in an ad.",
  tags: ["Travel", "Adventure", "Fashion", "Surf", "Culture", "Lifestyle"],
  contacts: {
    email: "the.twobrothers.studios@gmail.com",
  },
  accounts: {
    tiktok: [
      { handle: "colecartr", url: "https://www.tiktok.com/@colecartr", followers: 19500, likes: 696000 },
      { handle: "b_ricee", url: "https://www.tiktok.com/@b_ricee", followers: 40000, likes: 4500000 },
    ],
    youtube: [
      {
        handle: "bryceandcolecarter",
        url: "https://www.youtube.com/@bryceandcolecarter",
        followers: 1600, // subscribers
      },
    ],
    instagram: [
      { handle: "colecartr", url: "https://www.instagram.com/colecartr", followers: 2100 },
      { handle: "b_riccee", url: "https://www.instagram.com/b_riccee", followers: 1500 },
    ],
    
  },
  featured: [
    // Add up to 3–6 items (optional). Use internal images or external links.
    // { title: "Our latest", image: "/drop1/visuals/blackFlagFront.jpg", href: "https://www.youtube.com/@bryceandcolecarter" },
  ],
  pillars: [
    { title: "Short-form Culture", blurb: "TikTok & Reels across travel, fashion, humor; fast, high‑velocity moments." },
    { title: "Adventure Stories", blurb: "Surf trips, road adventures, sport, outdoors; compelling short narratives." },
    { title: "Long‑form YouTube", blurb: "Weekly vlogs and destination stories with memorable arcs." },
    { title: "Brand Assets", blurb: "Versatile imagery, vertically‑native edits, and usage across your channels." },
  ],
  offerings: ["Discovery", "Challenge", "Story", "YouTube Anchors", "UGC Packages", "Whitelisting"],
  industries: ["Travel", "Adventure", "Lifestyle", "Fashion", "Food & Beverage", "Culture"],
};

export default BRANDKIT_DATA;

