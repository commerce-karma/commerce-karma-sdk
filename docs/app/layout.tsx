import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { JSX } from "react";
import "nextra-theme-docs/style.css";

export const metadata = {};

const navbar = (
  <Navbar
    logo={
      <span>
        <b>Commerce Karma</b> for devolopers
      </span>
    }
  />
);
const footer = <Footer>MIT {new Date().getFullYear()} © Commerce Karma.</Footer>;

export default async function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head></Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/commerce-karma/commerce-karma-sdk/docs"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
