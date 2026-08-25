function OptimizedImage({
  src,
  alt = "",
  width = 400,
  quality = 70,
  className,
  loading = "lazy",
  fetchPriority = "auto",
  ...rest
}) {
  if (!src) return null;

  const targetWidth = Math.round(width * 1.5);

  const params = new URLSearchParams({
    url: src,
    w: String(targetWidth),
    q: String(quality),
    output: "webp",
    fit: "cover",
  });

  const optimizedSrc = `https://wsrv.nl/?${params.toString()}`;

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      className={className}
      {...rest}
    />
  );
}

export default OptimizedImage;
