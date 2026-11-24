import decemberStops from "@/lib/december-itinerary.json";
import octoberStops from "@/lib/itinerary.json";
import { dayPlan, periods } from "@/lib/day-plan";

export const tripPeriods = [...periods, "晚間・交通"] as const;

export type Stop = {
  id: string;
  day: string;
  name: string;
  region: string;
  category: string;
  notes: string;
  hint: string;
  period: string;
  time?: string;
  map?: string;
  mapLinks: { label: string; url: string }[];
};

const october = {
  title: "首爾，慢慢走。",
  dates: "2026.10.13 — 10.17",
  duration: "五天四夜",
  scheduleNote: "依行程類型與原始備註安排建議時段，同餐餐廳可擇一。",
  storageKey: "seoul-notebook-2026-notes-v1",
  otherTrip: { href: "./", label: "12 月行程" },
  days: [
    { date: "2026-10-13", weekday: "週二", title: "抵達首爾，隨心逛逛" },
    { date: "2026-10-14", weekday: "週三", title: "聖水的甜點與城市小旅行" },
    { date: "2026-10-15", weekday: "週四", title: "走進宮殿與安國街巷" },
    { date: "2026-10-16", weekday: "週五", title: "弘大散步，收集喜歡的小店" },
    { date: "2026-10-17", weekday: "週六", title: "早餐之後，帶回首爾的回憶" },
  ],
  stops: octoberStops.map((stop) => ({
    ...stop,
    ...dayPlan[stop.id],
    mapLinks: stop.map ? [{ label: "開啟地圖", url: stop.map }] : [],
  })).sort((a, b) => a.order - b.order),
};

const december = {
  title: "冬日首爾，慢慢走。",
  dates: "2026.12.26 — 12.29",
  duration: "四天三夜",
  scheduleNote: "時間以當地時間為準，未標時間的行程可彈性安排。",
  storageKey: "seoul-notebook-2026-december-notes-v1",
  otherTrip: { href: "?trip=october", label: "10 月行程" },
  days: [
    { date: "2026-12-26", weekday: "週六", title: "抵達首爾，從乙支路逛到明洞" },
    { date: "2026-12-27", weekday: "週日", title: "早餐、漢南洞與 Unpage" },
    { date: "2026-12-28", weekday: "週一", title: "聖水洞逛街與咖啡" },
    { date: "2026-12-29", weekday: "週二", title: "仁川出發，飛回桃園" },
  ],
  stops: decemberStops,
};

export const trip = new URLSearchParams(window.location.search).get("trip") === "october"
  ? october
  : december;
