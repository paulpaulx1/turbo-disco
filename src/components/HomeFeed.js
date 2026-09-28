import Link from "next/link";
import { formatDimensions } from "@/lib/format";
import { ArtworkImage } from "./ArtworkImage";

// One painting per screen, at its own proportions, as large as the screen
// allows: full width on phones, full height (minus header and caption) on
// wide screens. See .feature in globals.css.
export function HomeFeed({ artworks }) {
  const items = (artworks ?? []).filter((a) => a?.image?.asset);
  if (!items.length) {
    return (
      <p className="empty">
        No paintings here yet. Add one in the Studio at /studio and publish it.
      </p>
    );
  }
  return (
    <ol className="home-feed">
      {items.map((art, i) => {
        const ratio =
          art.image.width && art.image.height
            ? art.image.width / art.image.height
            : 1;
        const specs = [formatDimensions(art.dimensions), art.medium]
          .filter(Boolean)
          .join(" | ");
        return (
          <li key={art._id}>
            <figure className="feature" style={{ "--ar": ratio }}>
              <Link href={`/artwork/${art.slug}`} className="feature-link">
                <ArtworkImage
                  image={art.image}
                  sizes="(max-width: 760px) 100vw, 92vw"
                  priority={i === 0}
                />
              </Link>
              <figcaption>
                <Link href={`/artwork/${art.slug}`} className="feature-title">
                  {art.title}
                </Link>
                {specs && <span className="feature-specs"> {specs}</span>}
                {art.availability === "sold" && (
                  <span className="feature-status"> · Sold</span>
                )}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}
