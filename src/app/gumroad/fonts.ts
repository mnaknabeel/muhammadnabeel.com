import localFont from "next/font/local";

// Gumroad's brand face is ABC Favorit (commercial, Dinamo).
// General Sans (Fontshare, free for commercial use) is the closest licensed stand-in.
// ponytail: one family, four weights — Gumroad's whole type system is a single font.
export const favorit = localFont({
  src: [
    { path: "../../../public/fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../../../public/fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "../../../public/fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-favorit",
  display: "swap",
});
