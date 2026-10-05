export const site = {
  name: "Creator Mitra",
  tagline: "Your Mitra in the Creator Economy.",
};
export const categories = [
  "Beauty",
  "Fashion",
  "Finance",
  "Fitness",
  "Food",
  "Gaming",
  "Parenting",
  "Technology",
  "Travel",
  "Lifestyle",
];
export const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Gurugram",
  "Hyderabad",
  "Chennai",
];
export const languages = [
  "Hindi",
  "English",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Bengali",
  "Punjabi",
  "Malayalam",
  "Kannada",
];
export type Creator = {
  id: string;
  name: string;
  handle: string;
  category: string;
  city: string;
  languages: string[];
  followers: number;
  subscribers: number;
  views: number;
  engagement: number;
  score: number;
  portrait: number;
  platforms: string[];
  bio: string;
  rate: string;
};
export const creators: Creator[] = [
  {
    id: "aarushi-mehta",
    name: "Aarushi Mehta",
    handle: "@aarushicreates",
    category: "Beauty",
    city: "Mumbai",
    languages: ["Hindi", "English", "Marathi"],
    followers: 82000,
    subscribers: 18000,
    views: 42000,
    engagement: 5.8,
    score: 91,
    portrait: 0,
    platforms: ["Instagram", "YouTube"],
    bio: "Everyday beauty, thoughtful routines, and a little main-character energy. Creating stories that make self-care feel simple.",
    rate: "₹15,000–₹35,000",
  },
  {
    id: "rohan-sharma",
    name: "Rohan Sharma",
    handle: "@rohanunboxed",
    category: "Technology",
    city: "Bangalore",
    languages: ["English", "Hindi", "Kannada"],
    followers: 124000,
    subscribers: 96000,
    views: 68000,
    engagement: 6.2,
    score: 94,
    portrait: 1,
    platforms: ["Instagram", "YouTube"],
    bio: "Tech that makes everyday life better. Honest reviews, useful explainers, and a community of curious people.",
    rate: "₹25,000–₹60,000",
  },
  {
    id: "isha-kapoor",
    name: "Isha Kapoor",
    handle: "@ishaslittlekitchen",
    category: "Food",
    city: "Delhi",
    languages: ["Hindi", "English", "Punjabi"],
    followers: 65000,
    subscribers: 0,
    views: 35000,
    engagement: 7.1,
    score: 92,
    portrait: 2,
    platforms: ["Instagram"],
    bio: "Recipes worth saving. Finding the joy in home cooking, local ingredients, and meals shared with friends.",
    rate: "₹12,000–₹28,000",
  },
  {
    id: "arjun-nair",
    name: "Arjun Nair",
    handle: "@arjunelsewhere",
    category: "Travel",
    city: "Hyderabad",
    languages: ["English", "Hindi", "Malayalam", "Telugu"],
    followers: 156000,
    subscribers: 42000,
    views: 89000,
    engagement: 4.9,
    score: 89,
    portrait: 3,
    platforms: ["Instagram", "YouTube"],
    bio: "Slow journeys. Unexpected places. Travel stories that take you a little closer to the world around you.",
    rate: "₹30,000–₹70,000",
  },
  {
    id: "ananya-rao",
    name: "Ananya Rao",
    handle: "@ananyastyled",
    category: "Fashion",
    city: "Chennai",
    languages: ["Tamil", "English"],
    followers: 43000,
    subscribers: 12000,
    views: 24000,
    engagement: 6.4,
    score: 88,
    portrait: 0,
    platforms: ["Instagram", "YouTube"],
    bio: "Personal style with personality. Mixing thoughtful wardrobe staples with something a little unexpected.",
    rate: "₹10,000–₹25,000",
  },
  {
    id: "kabir-malhotra",
    name: "Kabir Malhotra",
    handle: "@kabirmoves",
    category: "Fitness",
    city: "Gurugram",
    languages: ["Hindi", "English"],
    followers: 97000,
    subscribers: 0,
    views: 51000,
    engagement: 5.4,
    score: 90,
    portrait: 3,
    platforms: ["Instagram"],
    bio: "Sustainable movement for real life. Simple routines, honest progress, and showing up for yourself.",
    rate: "₹18,000–₹40,000",
  },
];
export const formatNumber = (n: number) =>
  n >= 1000000
    ? `${(n / 1000000).toFixed(1)}M`
    : n >= 1000
      ? `${Math.round(n / 1000)}K`
      : String(n);
export const services = [
  {
    slug: "influencer-marketing",
    name: "Influencer Marketing",
    eyebrow: "Meaningful connections",
    title: "The right voices. A real connection.",
    description:
      "Build campaigns with creators who understand your audience and make your brand feel at home.",
    icon: "Sparkles",
    includes: [
      "Audience-first creator discovery",
      "Campaign briefs and coordination",
      "Content review and approvals",
      "Clear performance reporting",
    ],
  },
  {
    slug: "instagram-influencer-marketing",
    name: "Instagram Campaigns",
    eyebrow: "Made for the feed",
    title: "Turn a scroll into a connection.",
    description:
      "Reels, stories, and posts that bring your brand into the conversations that matter.",
    icon: "Instagram",
    includes: [
      "Reels and story campaigns",
      "Niche creator shortlists",
      "Content usage planning",
      "Reach and engagement reporting",
    ],
  },
  {
    slug: "youtube-influencer-marketing",
    name: "YouTube Campaigns",
    eyebrow: "Stories with staying power",
    title: "Give your story a little more time.",
    description:
      "Reach engaged communities through honest reviews, thoughtful integrations, and useful creator content.",
    icon: "Youtube",
    includes: [
      "Long-form brand integrations",
      "YouTube Shorts",
      "Product reviews and tutorials",
      "Views and retention reporting",
    ],
  },
  {
    slug: "ugc",
    name: "UGC Content",
    eyebrow: "Content that feels human",
    title: "Real voices. Content worth watching.",
    description:
      "Work with creators to make authentic content for your social channels, ads, and product pages.",
    icon: "Clapperboard",
    includes: [
      "Product demos and unboxings",
      "Creator-led reviews",
      "Lifestyle videos and ad creatives",
      "Clear usage rights and deliverables",
    ],
  },
  {
    slug: "product-launch-campaigns",
    name: "Product Launch Campaigns",
    eyebrow: "Make an entrance",
    title: "A launch people want to talk about.",
    description:
      "Bring the right creators together to introduce your next big thing with a little more impact.",
    icon: "Rocket",
    includes: [
      "Pre-launch campaign strategy",
      "Coordinated creator content",
      "Launch-day publishing plan",
      "Post-launch performance review",
    ],
  },
  {
    slug: "micro-influencer-marketing",
    name: "Micro Influencer Campaigns",
    eyebrow: "Small communities, strong connections",
    title: "Closer communities. Better conversations.",
    description:
      "Meet niche creators with engaged audiences and a genuine connection to what they share.",
    icon: "Users",
    includes: [
      "Niche audience mapping",
      "Local and specialist creators",
      "Scalable creator coordination",
      "Community engagement tracking",
    ],
  },
  {
    slug: "regional-influencer-marketing",
    name: "Regional Creator Campaigns",
    eyebrow: "Speak their language",
    title: "Local voices. A lasting connection.",
    description:
      "Work with creators who understand your audience, their language, and the culture they call home.",
    icon: "Languages",
    includes: [
      "Language-specific creator discovery",
      "City and region targeting",
      "Culturally relevant content briefs",
      "Regional campaign reporting",
    ],
  },
  {
    slug: "performance-creator-campaigns",
    name: "Performance Creator Campaigns",
    eyebrow: "Creative meets clarity",
    title: "Know what your campaign delivered.",
    description:
      "Connect creator content with clear goals, practical measurement, and learnings for your next campaign.",
    icon: "ChartNoAxesCombined",
    includes: [
      "Goal-led creator selection",
      "Tracked campaign links",
      "Content and audience insights",
      "Campaign learning reports",
    ],
  },
];
export const caseStudies = [
  {
    slug: "everyday-beauty",
    category: "Beauty · Instagram",
    name: "A fresh approach to everyday beauty.",
    brand: "Sample beauty brand",
    portrait: 0,
    metrics: ["24 creators", "2.8M views", "185K engagements"],
    summary:
      "An illustrative launch campaign built around everyday routines and relatable creator stories.",
    challenge:
      "Introduce a new skincare routine to an audience that values honest, practical beauty advice.",
    approach:
      "A mix of beauty and lifestyle creators demonstrates the routine in their own style, with a clear brief and space for an authentic voice.",
  },
  {
    slug: "a-taste-of-home",
    category: "Food · UGC",
    name: "Good food. Even better stories.",
    brand: "Sample food brand",
    portrait: 2,
    metrics: ["18 creators", "1.4M views", "96K engagements"],
    summary:
      "A sample content programme bringing a pantry essential into real kitchens.",
    challenge:
      "Make a familiar pantry product feel useful and fresh for home cooks.",
    approach:
      "Regional food creators build simple recipes around the product. The content can be adapted for social, paid ads, and product pages with agreed usage rights.",
  },
  {
    slug: "tech-for-everyday",
    category: "Technology · YouTube",
    name: "Making everyday tech make sense.",
    brand: "Sample technology brand",
    portrait: 1,
    metrics: ["12 creators", "980K views", "72K engagements"],
    summary:
      "An example of audience-first tech storytelling, from useful reviews to everyday demos.",
    challenge:
      "Explain a new product clearly and help customers decide whether it fits their needs.",
    approach:
      "Tech creators combine practical tutorials with long-form reviews, supported by a concise brief, a coordinated launch plan, and tracked links.",
  },
];
export const articles = [
  {
    slug: "finding-the-right-creators",
    tag: "Creator discovery",
    title: "A good creator fit starts with your audience.",
    excerpt:
      "A practical guide to looking beyond follower counts and choosing creators with context.",
    readTime: "5 min read",
    portrait: 0,
    sections: [
      [
        "Start with the people you want to reach",
        "Before building a shortlist, define your audience in plain language. Where do they live? What do they care about? Which languages do they use? A smaller creator whose audience closely matches your customers can be more useful than a larger account with broad reach.",
      ],
      [
        "Look at the conversation, not just the count",
        "Read comments across several recent posts. Look for relevant questions and thoughtful responses. Compare views and engagement over time rather than picking the one post that went viral. None of these signals alone proves audience quality.",
      ],
      [
        "Make room for a natural brand fit",
        "Look at how a creator talks about products they already use. Consider their style, format, and usual topics. A good brief gives direction while leaving room for the creator’s own voice.",
      ],
      [
        "Build a balanced shortlist",
        "Include creators across audience sizes and content styles. Document why each one fits, what you expect them to create, and how success will be measured. Start small, review results, and use what you learn.",
      ],
    ],
  },
  {
    slug: "writing-a-creator-brief",
    tag: "Campaign playbook",
    title: "Write a brief that leaves room for creativity.",
    excerpt:
      "The essentials your creators need, and the freedom that helps great content happen.",
    readTime: "4 min read",
    portrait: 2,
    sections: [
      [
        "Make the goal clear",
        "Explain the purpose of the campaign in one sentence. Share the audience, the product, and the single message that matters most. Separate essential claims from optional inspiration.",
      ],
      [
        "Agree on the practical details",
        "List formats, deadlines, review rounds, disclosure requirements, payment terms, and usage rights. Everyone should know where the content will be published and how long it may be used.",
      ],
      [
        "Share direction, not a script",
        "Reference the feeling and information the content should convey. Invite the creator to propose an angle in their own voice. A natural delivery starts with a brief that respects their audience.",
      ],
      [
        "Keep feedback specific",
        "Bring feedback into one clear review round where possible. Distinguish factual corrections from personal preferences. Set timelines that give everyone enough space to do good work.",
      ],
    ],
  },
  {
    slug: "measuring-creator-campaigns",
    tag: "Insights",
    title: "Measure what matters to your campaign.",
    excerpt:
      "Connect your campaign goals with useful metrics, without getting lost in a spreadsheet.",
    readTime: "6 min read",
    portrait: 1,
    sections: [
      [
        "Choose the goal before the metric",
        "Awareness, consideration, and conversion campaigns need different measures. Views might support an awareness goal. Relevant comments, saves, or qualified traffic might help explain consideration. Sales require reliable attribution, not assumptions.",
      ],
      [
        "Capture a useful baseline",
        "Agree on reporting windows and ask for creator analytics in a consistent format. Record campaign costs and any additional paid distribution. Different platforms define views and engagement differently, so compare like with like.",
      ],
      [
        "Add tracking carefully",
        "Use campaign links or codes when appropriate. Be clear about attribution windows and the limits of each method. Link clicks and codes can miss customers who discover a product through a creator and buy later.",
      ],
      [
        "Turn results into your next brief",
        "Summarise what worked by creator, format, and audience. Include qualitative observations as well as numbers. The most useful report helps you make the next campaign better.",
      ],
    ],
  },
];
