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
  /** Partnership format options with descriptions. */
  partnershipFormats?: Array<{
    title: string;
    description: string;
  }>;
  /** Bookable services for brand partners. */
  services?: string[];
  /** Core content verticals. */
  contentVerticals?: string[];
  /** Past brand partnerships — logo images in /public. */
  pastCollaborations?: Array<{
    name: string;
    logo: string;
    width: number;
    height: number;
    href?: string;
  }>;
  /** YouTube Studio audience snapshot — update manually. */
  youtubeAudience?: {
    periodLabel: string;
    monthlyAudience: number;
    topGeographies: Array<{ country: string; pct: number }>;
    gender: Array<{ label: string; pct: number }>;
    age: Array<{ label: string; pct: number }>;
  };
};

// Edit follower counts over time to keep stats fresh.
// You can also add/remove items or update links here without touching page code.
const BRANDKIT_DATA: BrandKitData = {
  brandName: "Bryce & Cole Carter",
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
  partnershipFormats: [
    {
      title: "Discovery",
      description:
        "A first-look format introducing your product or brand through real, in-the-moment content — travel, training, or everyday use",
    },
    {
      title: "Challenge",
      description:
        "A test-your-limits concept that puts your gear through real conditions on camera, built for high engagement and shareability",
    },
    {
      title: "Story",
      description:
        "A narrative-driven piece centered on growth, adventure, or transformation — built to resonate emotionally, not just sell",
    },
    {
      title: "YouTube Anchors",
      description:
        "Long-form, evergreen video content designed to drive sustained brand visibility long after the initial release",
    },
    {
      title: "UGC Packages",
      description:
        "Modular photo/video content built specifically for your paid social, email, and site use",
    },
  ],
  services: [
    "Sponsored video (dedicated/integration)",
    "Instagram post/story/reel",
    "TikTok video",
    "Photo content/UGC",
    "Ambassadorship/long-term partnership",
    "Event appearances or trips",
  ],
  contentVerticals: ["Travel/adventure", "Surfing/sport", "Fitness/training", "Streetwear/fashion"],
  pastCollaborations: [
    { name: "Warner Music Group", logo: "/WMG_Logo.webp", width: 2500, height: 1309 },
    { name: "Nude Project", logo: "/nudeProjectLogo.jpeg", width: 738, height: 384 },
    { name: "Thousand Fell", logo: "/thousandFellLogo.webp", width: 974, height: 228 },
  ],
  youtubeAudience: {
    periodLabel: "Views · Last 28 days",
    monthlyAudience: 14700,
    topGeographies: [
      { country: "United States", pct: 42.3 },
      { country: "Canada", pct: 2.8 },
      { country: "United Kingdom", pct: 2.4 },
      { country: "Brazil", pct: 2.2 },
      { country: "Thailand", pct: 1.9 },
    ],
    gender: [
      { label: "Female", pct: 22.7 },
      { label: "Male", pct: 77.4 },
      { label: "User-specified", pct: 0 },
    ],
    age: [
      { label: "3–17 years", pct: 7.3 },
      { label: "18–24 years", pct: 23.8 },
      { label: "25–34 years", pct: 36.0 },
      { label: "35–44 years", pct: 12.8 },
      { label: "45–54 years", pct: 7.5 },
      { label: "55–64 years", pct: 7.4 },
      { label: "65+ years", pct: 5.1 },
    ],
  },
};

export default BRANDKIT_DATA;

