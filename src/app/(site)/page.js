import { HomeFeed } from "@/components/HomeFeed";
import { fetchContent } from "@/sanity/lib/fetch";
import { ALL_ARTWORKS_QUERY, HOME_QUERY } from "@/sanity/lib/queries";

export default async function HomePage() {
  const home = await fetchContent(HOME_QUERY);
  const artworks = home?.artworks ?? (await fetchContent(ALL_ARTWORKS_QUERY));
  const heading = (home?.homeHeading || home?.portfolioTitle || "")
    .split("\n")
    .filter(Boolean);

  return (
    <div className="page page-home">
      {(home?.homeEyebrow || heading.length > 0) && (
        <header className="home-intro">
          {home?.homeEyebrow && (
            <p className="home-eyebrow">{home.homeEyebrow}</p>
          )}
          {heading.length > 0 && (
            <h1 className="home-heading">
              {heading.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </h1>
          )}
        </header>
      )}
      <HomeFeed artworks={artworks} />
    </div>
  );
}
