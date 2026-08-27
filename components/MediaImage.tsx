import Image from "next/image";

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

export function MediaImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
}: MediaImageProps) {
  const remote = src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:");

  if (fill) {
    if (remote) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`} />
      );
    }
    return <Image src={src} alt={alt} fill className={className} sizes={sizes} priority={priority} />;
  }

  if (remote) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} width={width} height={height} className={className} />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
