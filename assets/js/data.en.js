window.DEVPACK = {
  "projects": {
    "procure": {
      "id": "procure",
      "pack": "admin",
      "grade": "impact",
      "title": "Procurement Notice Reviewer",
      "summary": "Compares public procurement notices with clients’ supporting documents, identifies missing requirements and documents, and drafts standard service contracts.",
      "status": "In practical use at an administrative services office",
      "types": [
        "Python",
        "Gemini",
        "RAG"
      ],
      "links": [
        [
          "GitHub",
          "https://github.com/himangga01/wisdom_procurement"
        ]
      ],
      "repo": "wisdom_procurement"
    },
    "humanize": {
      "id": "humanize",
      "pack": "admin",
      "grade": "live",
      "title": "Korean Text Polisher",
      "summary": "Uses Claude Code or Codex to polish unnatural Korean phrasing and restores original sentences when facts change.",
      "status": "Windows app and skill distribution files available · Private repository",
      "types": [
        "TypeScript",
        "Python",
        "Claude"
      ],
      "links": [],
      "repo": null
    },
    "office": {
      "id": "office",
      "pack": "web",
      "grade": "live",
      "title": "Jihye Administrative Services Website",
      "summary": "An office website in Korean, English, Simplified Chinese, and Traditional Chinese, with consultation requests, case studies, and anonymous cookie-free visitor statistics.",
      "status": "Live · Private repository",
      "types": [
        "Node",
        "JavaScript",
        "Claude"
      ],
      "links": [
        [
          "Website",
          "https://jihyeadminoffice.com"
        ]
      ],
      "repo": null
    },
    "school": {
      "id": "school",
      "pack": "web",
      "grade": "live",
      "title": "School Violence Guidance Website",
      "summary": "Explains school violence case-handling and appeal procedures to students and parents, and accepts consultation requests.",
      "status": "Live · Private repository",
      "types": [
        "Node",
        "JavaScript",
        "Cloudflare"
      ],
      "links": [
        [
          "Website",
          "https://jihyeadminschool.co.kr"
        ]
      ],
      "repo": null
    },
    "writer": {
      "id": "writer",
      "pack": "content",
      "grade": "tested",
      "title": "Housing Article Automation",
      "summary": "Collects official housing subscription notices and turns them into articles with linked sources. In an August 2026 operational check, it selected 43 housing notices from 72 notices and produced 19 articles, all of which passed verification.",
      "status": "138 commits · Local operational check completed",
      "types": [
        "Python",
        "Django",
        "Celery"
      ],
      "links": [
        [
          "GitHub",
          "https://github.com/himangga01/wisdome-super-writer"
        ]
      ],
      "repo": "wisdome-super-writer"
    },
    "ssul": {
      "id": "ssul",
      "pack": "content",
      "grade": "tested",
      "title": "Short-Form Video Studio",
      "summary": "A local editor that breaks scripts into scenes, adds images and AI voices, and exports vertical videos.",
      "status": "Stages A–G implemented · Regression tests included",
      "types": [
        "React",
        "FFmpeg",
        "Gemini"
      ],
      "links": [
        [
          "GitHub",
          "https://github.com/himangga01/short-video-service"
        ]
      ],
      "repo": "short-video-service"
    },
    "figma": {
      "id": "figma",
      "pack": "tools",
      "grade": "tested",
      "title": "Figma-to-Code Pipeline",
      "summary": "An MCP server that reads Figma designs without Dev Mode and analyzes existing code to help coding agents implement screens.",
      "status": "62 commits · In development",
      "types": [
        "TypeScript",
        "MCP",
        "Playwright"
      ],
      "links": [
        [
          "GitHub",
          "https://github.com/himangga01/super-figma-pipline"
        ]
      ],
      "repo": "super-figma-pipline"
    },
    "localframe": {
      "id": "localframe",
      "pack": "tools",
      "grade": "tested",
      "title": "Local UI Design Editor",
      "summary": "A single-user local UI editor with pages, frames, auto layout, and components. AI agents can read and edit designs through MCP.",
      "status": "41 commits · July 16–17, 2026",
      "types": [
        "React",
        "Express",
        "MCP"
      ],
      "links": [
        [
          "GitHub",
          "https://github.com/himangga01/wisdom-ux-point"
        ]
      ],
      "repo": "wisdom-ux-point"
    },
    "auction": {
      "id": "auction",
      "pack": "personal",
      "grade": "tested",
      "title": "Court Auction Rights Analysis",
      "summary": "A single-user tool for collecting and preserving court auction records and assisting with rights analysis. Each judgment is designed to link back to original evidence.",
      "status": "231 backend tests passed · In development",
      "types": [
        "Python",
        "FastAPI",
        "React"
      ],
      "links": [
        [
          "GitHub",
          "https://github.com/himangga01/auction-broker-service"
        ]
      ],
      "repo": "auction-broker-service"
    },
    "apt": {
      "id": "apt",
      "pack": "personal",
      "grade": "tested",
      "title": "Apartment Listing Tracker",
      "summary": "Collects sale, jeonse, and monthly-rental listings for an apartment complex from a single URL, merges duplicates, and compares changes by date.",
      "status": "CI passed",
      "types": [
        "FastAPI",
        "PostgreSQL",
        "Playwright"
      ],
      "links": [
        [
          "GitHub",
          "https://github.com/himangga01/wisdom_QJ_auction_service"
        ]
      ],
      "repo": "wisdom_QJ_auction_service"
    },
    "media": {
      "id": "media",
      "pack": "personal",
      "grade": "tested",
      "title": "Media Converter",
      "summary": "A self-hosted tool that saves media the user has rights to use as video or audio and converts it to other formats.",
      "status": "106 commits · Private repository",
      "types": [
        "Kotlin",
        "FastAPI",
        "FFmpeg"
      ],
      "links": [],
      "repo": null
    },
    "observer": {
      "id": "observer",
      "pack": "next",
      "grade": "plan",
      "title": "Unattended Store Monitoring",
      "summary": "A service design for CCTV anomaly detection and alerts for unattended store owners.",
      "status": "Service and implementation plans documented",
      "types": [
        "YOLO",
        "GPT",
        "Next.js"
      ],
      "links": [
        [
          "GitHub",
          "https://github.com/himangga01/wisdom-super-observer"
        ]
      ],
      "repo": "wisdom-super-observer"
    },
    "policy": {
      "id": "policy",
      "pack": "next",
      "grade": "plan",
      "title": "Real Estate Policy Dashboard",
      "summary": "A dashboard design for checking address-specific regulations and estimating acquisition, ownership, and capital-gains taxes.",
      "status": "Policy history organized · Early implementation",
      "types": [
        "PostGIS",
        "pgvector",
        "React"
      ],
      "links": [
        [
          "GitHub",
          "https://github.com/himangga01/what-the-hell-real-estate"
        ]
      ],
      "repo": "what-the-hell-real-estate"
    },
    "shop": {
      "id": "shop",
      "pack": "next",
      "grade": "plan",
      "title": "AI Shopping Videos",
      "summary": "A service design that uses uploaded product photos to generate scripts, video, thumbnails, and narration for promotional videos under one minute long.",
      "status": "Design documents completed · Private repository",
      "types": [
        "Remotion",
        "FFmpeg",
        "PostgreSQL"
      ],
      "links": [],
      "repo": null
    }
  },
  "packs": {
    "admin": {
      "name": "Office automation",
      "items": [
        "procure",
        "humanize"
      ],
      "bg": "linear-gradient(160deg,#e2475b 0%,#a8182f 48%,#5a0916 100%)",
      "creature": "owl"
    },
    "web": {
      "name": "Office websites",
      "items": [
        "office",
        "school"
      ],
      "bg": "linear-gradient(160deg,#d9822b 0%,#a44c08 48%,#5a2603 100%)",
      "creature": "whale"
    },
    "content": {
      "name": "Content automation",
      "items": [
        "writer",
        "ssul"
      ],
      "bg": "linear-gradient(160deg,#1fa58c 0%,#0b6f60 48%,#053a33 100%)",
      "creature": "penguin"
    },
    "tools": {
      "name": "AI developer tools",
      "items": [
        "figma",
        "localframe"
      ],
      "bg": "linear-gradient(160deg,#8466e0 0%,#5a33c4 48%,#2a0f63 100%)",
      "creature": "chameleon"
    },
    "personal": {
      "name": "Personal tools",
      "items": [
        "auction",
        "apt",
        "media"
      ],
      "bg": "linear-gradient(160deg,#3f7fd9 0%,#1f4fb8 48%,#0d1f5a 100%)",
      "creature": "turtle"
    },
    "next": {
      "name": "What’s next",
      "items": [
        "observer",
        "policy",
        "shop"
      ],
      "bg": "linear-gradient(160deg,#6b7a93 0%,#3d4a5f 48%,#141b28 100%)",
      "creature": "firefly"
    }
  },
  "grades": {
    "impact": {
      "code": "IMPACT",
      "label": "Proven impact",
      "rule": "Used in real work with observed before-and-after results"
    },
    "live": {
      "code": "LIVE",
      "label": "Live",
      "rule": "Publicly running or available as a distributable app"
    },
    "tested": {
      "code": "TESTED",
      "label": "Tested",
      "rule": "Core behavior checked through test records"
    },
    "plan": {
      "code": "PLAN",
      "label": "Designed",
      "rule": "Requirements and design documented; implementation preparation"
    }
  },
  "gradeOrder": [
    "plan",
    "tested",
    "live",
    "impact"
  ],
  "featured": {
    "procure": {
      "problem": "Reading notices and attached PDFs, then checking them against clients’ supporting documents, took 1–2 hours per notice.",
      "approach": "I collected notices through public-data APIs, read scanned documents with PaddleOCR, retrieved references with RAG, and used Gemini to organize the requirements. I defined merge rules so an AI ‘Satisfied’ assessment becomes ‘Needs review’ without documentary evidence, and rule-based decisions take precedence when confidence is low.",
      "result": "In practical use, review time fell to about 20 minutes per notice. I added 216 tests for the decision logic.",
      "role": [
        "Requirements and decision-rule design",
        "Defining test criteria",
        "Incorporating practical feedback"
      ]
    },
    "office": {
      "problem": "The office needed an online presence and a reliable way to receive consultation requests.",
      "approach": "I built both sites using Node built-in modules without external packages and published them from one Mac mini through Cloudflare Tunnel. Consultation requests trigger email and Telegram notifications. Visitor statistics are anonymous and use no cookies.",
      "result": "The office website has 56 pages in four languages. The school violence guidance site launched in August 2026. I diagnosed and fixed an external-access failure after a reboot and left a script to recover from the same issue.",
      "role": [
        "Architecture and privacy decisions",
        "Server and domain operations",
        "Incident response"
      ]
    },
    "school": {
      "problem": "The office needed an online presence and a reliable way to receive consultation requests.",
      "approach": "I built both sites using Node built-in modules without external packages and published them from one Mac mini through Cloudflare Tunnel. Consultation requests trigger email and Telegram notifications. Visitor statistics are anonymous and use no cookies.",
      "result": "The office website has 56 pages in four languages. The school violence guidance site launched in August 2026. I diagnosed and fixed an external-access failure after a reboot and left a script to recover from the same issue.",
      "role": [
        "Architecture and privacy decisions",
        "Server and domain operations",
        "Incident response"
      ]
    },
    "humanize": {
      "problem": "AI-written Korean often retained translated phrasing and mechanical lists, making it difficult to use as-is.",
      "approach": "I built a Windows app and skills that use Claude Code or Codex for polishing. A verification step restores the original sentence whenever numbers, quotations, or proper nouns change.",
      "result": "Short-document processing dropped from 262 to 106 seconds. It missed the target of at most 40% of the original time by 0.5 percentage points, so I did not make it the default. I also used this tool to review the wording in this portfolio.",
      "role": [
        "Polishing rules and verification design",
        "Performance measurement criteria",
        "Distribution packaging"
      ]
    }
  }
};
