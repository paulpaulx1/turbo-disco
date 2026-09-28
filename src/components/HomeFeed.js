import Link from "next/link";
import { formatDimensions } from "@/lib/format";
import { ArtworkImage } from "./ArtworkImage";

// One featured painting, at its own proportions, as large as the space left
// on screen allows while keeping the caption visible. See .feature-stage in
// globals.css.
export function HomeFeature({ artwork }) {
  if (!artwork?.image?.asset) {
    return (
      <p className="empty">
        No paintings here yet. Add one in the Studio at /studio and publish it.
      </p>
    );
  }
  const { image } = artwork;
  const ratio = image.width && image.height ? image.width / image.height : 1;
  const specs = [formatDimensions(artwork.dimensions), artwork.medium]
    .filter(Boolean)
    .join(" | ");
  const href = `/artwork/${artwork.slug}`;

  return (
    <div className="feature-stage">
      <figure className="feature" style={{ "--ar": ratio }}>
        <Link href={href} className="feature-link">
          <ArtworkImage
            image={image}
            sizes="(max-width: 760px) 100vw, 92vw"
            priority
          />
        </Link>
        <figcaption>
          <Link href={href} className="feature-title">
            {artwork.title}
          </Link>
          {specs && <span className="feature-specs"> {specs}</span>}
          {artwork.availability === "sold" && (
            <span className="feature-status"> · Sold</span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
