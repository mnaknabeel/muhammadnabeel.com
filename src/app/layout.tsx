import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CursorTracker from "@/components/CursorTracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Nabeel — Finance Engineer",
  description:
    "I build financial systems, automate workflows, and turn messy data into decisions that drive growth. Finance Team Lead at LeapAI Solution.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Muhammad Nabeel — Finance Engineer",
    description:
      "Financial systems, automated workflows, data-driven decisions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        <CursorTracker />
        {children}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `_linkedin_partner_id = "1972850";window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];window._linkedin_data_partner_ids.push(_linkedin_partner_id);`,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `!function(l){if(!l)window.lintrk=function(a,b){window.lintrk.q.push([a,b])},window.lintrk.q=[];var s=document.getElementsByTagName("script")[0],b=document.createElement("script");b.type="text/javascript",b.async=true,b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js",s.parentNode.insertBefore(b,s)}(window.lintrk);`,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: '<img height="1" width="1" style="display:none" alt="" src="https://px.ads.linkedin.com/collect/?pid=1972850&fmt=gif" />',
          }}
        />
      </body>
    </html>
  );
}
