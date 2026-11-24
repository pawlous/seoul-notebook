// Hand-drawn line illustration of Seoul landmarks (authored SVG, no external source).
// Phones get their own framing (x 400–1040: Namsan Tower, Sungnyemun, Lotte World Tower) instead of a blind centre crop.
import { useEffect, useState } from "react";

const PHONE = "(max-width: 700px)";

export function SeoulSkyline() {
  const [phone, setPhone] = useState(() => typeof window !== "undefined" && window.matchMedia(PHONE).matches);
  useEffect(() => {
    const query = window.matchMedia(PHONE);
    const update = () => setPhone(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <svg
      className="skyline"
      viewBox={phone ? "400 0 640 260" : "0 0 1440 260"}
      preserveAspectRatio={phone ? "xMidYMax meet" : "xMidYMax slice"}
      role="img"
      aria-label="首爾地標線條插畫"
    >
      {/* Bukhansan ridge, far behind */}
      <path className="far" d="M0 168 L60 140 L110 152 L170 112 L215 128 L262 96 L300 118 L350 104 L410 136 L470 120 L520 146 L600 128 L660 150 L720 132 L790 158 L860 126 L910 100 L950 118 L1050 90 L1100 112 L1160 98 L1210 124 L1270 110 L1330 134 L1390 118 L1440 132" />

      {/* Moon and a few winter stars */}
      <path className="line" d="M1188 38 A15 15 0 1 0 1188 66 A12 12 0 0 1 1188 38 Z" />
      <g className="stars">
        <circle cx="96" cy="44" r="1.4" /><circle cx="318" cy="30" r="1.2" /><circle cx="452" cy="62" r="1.4" />
        <circle cx="690" cy="38" r="1.2" /><circle cx="868" cy="54" r="1.4" /><circle cx="1104" cy="28" r="1.2" />
        <circle cx="1300" cy="58" r="1.4" /><circle cx="1396" cy="34" r="1.2" />
      </g>

      {/* Apartment blocks, left */}
      <path className="line" d="M18 230 V170 H62 V230 M68 230 V188 H112 V230" />
      <path className="thin" d="M18 184 H62 M18 198 H62 M18 212 H62 M68 202 H112 M68 216 H112" />

      {/* DDP — Dongdaemun Design Plaza */}
      <path className="line" d="M146 230 C164 192 226 174 290 180 C340 185 372 204 386 230" />
      <path className="thin" d="M178 216 C228 196 300 192 354 208 M164 226 C226 210 312 206 374 222 M214 194 C232 210 244 220 250 230 M286 182 C296 202 302 216 304 230" />

      {/* Namsan hill and N Seoul Tower */}
      <path className="line" d="M424 230 Q560 150 700 230" />
      <path className="line" d="M557 190 L560 100 M573 190 L570 100" />
      <path className="line" d="M550 100 H580 L576 84 H554 Z M556 84 Q565 76 574 84" />
      <path className="line" d="M565 79 V26" />
      <path className="thin" d="M561 62 H569 M562 46 H568" />

      {/* Sungnyemun (Namdaemun) — stone base, arch, two-tier roof */}
      <path className="line" d="M704 230 L712 196 H808 L816 230" />
      <path className="line" d="M746 230 V214 Q760 200 774 214 V230" />
      <path className="line" d="M720 196 V182 H800 V196 M732 168 V160 H788 V168" />
      <path className="line" d="M698 186 Q712 180 722 172 H798 Q808 180 822 186" />
      <path className="line" d="M710 164 Q724 156 736 150 H784 Q796 156 810 164" />
      <path className="thin" d="M736 150 Q760 144 784 150 M722 172 Q760 168 798 172" />

      {/* Mid-rise blocks */}
      <path className="line" d="M852 230 V178 H888 V230 M894 230 V198 H930 V230" />
      <path className="thin" d="M852 192 H888 M852 206 H888 M852 220 H888 M894 212 H930" />

      {/* Lotte World Tower */}
      <path className="line" d="M976 230 Q984 104 997 20 H1003 Q1016 104 1024 230" />
      <path className="thin" d="M1000 230 V24 M988 150 Q1000 146 1012 150 M992 96 Q1000 93 1008 96" />

      <path className="line" d="M1042 230 V162 H1072 V230 M1078 230 V190 H1112 V230" />
      <path className="thin" d="M1042 178 H1072 M1042 194 H1072 M1042 210 H1072 M1078 206 H1112" />

      {/* Hanok roofs */}
      <path className="line" d="M1138 214 Q1148 210 1156 202 H1196 Q1204 210 1214 214 M1150 230 V210 M1202 230 V210" />
      <path className="line" d="M1186 222 Q1194 218 1200 212 H1232 Q1238 218 1246 222 M1196 230 V220 M1238 230 V220" />

      {/* Han River bridge */}
      <path className="line" d="M1252 220 H1440 M1262 220 Q1292 202 1322 220 Q1352 202 1382 220 Q1412 202 1440 216" />
      <path className="thin" d="M1292 210 V220 M1352 210 V220 M1412 210 V220" />

      {/* Ground and river */}
      <path className="line" d="M0 230 H1440" />
      <path className="thin water" d="M40 242 H96 M180 248 H260 M380 242 H420 M520 250 H610 M720 243 H770 M880 249 H960 M1060 242 H1120 M1200 250 H1290 M1350 243 H1410" />
    </svg>
  );
}
