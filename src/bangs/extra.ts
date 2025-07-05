export const extraBangs: Record<
  string,
  {
    c?: string;
    d: string;
    r: number;
    s: string;
    sc?: string;
    t: string;
    u: string;
  }
> = {
  gpt: {
    c: "AI",
    d: "chatgpt.com",
    r: 0,
    s: "ChatGPT",
    sc: "AI",
    t: "gpt",
    u: "https://chat.openai.com/?model=gpt-4&q={{{s}}}",
  },
  t3: {
    c: "AI",
    d: "www.t3.chat",
    r: 0,
    s: "T3 Chat",
    sc: "AI",
    t: "t3",
    u: "https://www.t3.chat/new?q={{{s}}}",
  },
  m2: {
    c: "Online Services",
    d: "meta.dunkirk.sh",
    r: 0,
    s: "metasearch2",
    sc: "Search",
    t: "m2",
    u: "https://meta.dunkirk.sh/search?q={{{s}}}",
  },
  tiktok: {
    c: "Multimedia",
    sc: "Video",
    d: "www.tiktok.com",
    r: 0,
    s: "TikTok",
    t: "tiktok",
    u: "https://www.tiktok.com/search?q={{{s}}}",
  },
};
