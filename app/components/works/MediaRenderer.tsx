import type { MediaItem } from "@/lib/works";

type MediaRendererProps = {
  media: MediaItem[];
};

export function MediaRenderer({ media }: MediaRendererProps) {
  if (media.length === 0) return null;

  return (
    <section className="workInfoCard">
      <h2>媒体内容</h2>
      <div className="workMediaStack">
        {media.map((item, index) => {
          if (item.type === "image") {
            return (
              <figure className="workMediaCard" key={`${item.src}-${index}`}>
                <img src={item.src} alt={item.alt} loading="lazy" />
                {item.caption ? <figcaption>{item.caption}</figcaption> : null}
              </figure>
            );
          }

          if (item.type === "gallery") {
            return (
              <section className="workGallery" key={`${item.title}-${index}`}>
                {item.title ? <h3>{item.title}</h3> : null}
                <div className="workMediaGrid">
                  {item.images.map((image) => (
                    <figure className="workMediaCard" key={image.src}>
                      <img src={image.src} alt={image.alt} loading="lazy" />
                      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              </section>
            );
          }

          return (
            <figure className="workMediaCard" key={`${item.src}-${index}`}>
              <video controls preload="metadata" poster={item.poster || undefined}>
                <source src={item.src} type="video/mp4" />
              </video>
              <figcaption>
                <strong>{item.title}</strong>
                {item.description ? <span>{item.description}</span> : null}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
