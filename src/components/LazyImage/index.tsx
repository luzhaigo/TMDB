import { FC, useRef, useEffect, ImgHTMLAttributes, ElementRef } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  options?: IntersectionObserverInit;
};

const LazyImage: FC<Props> = ({
  src,
  alt,
  loading = 'lazy',
  options,
  ...rest
}) => {
  const ref = useRef<ElementRef<'img'>>(null);
  const isLazy = loading === 'lazy';

  useEffect(() => {
    if (!ref.current || !isLazy) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          image.src = image.dataset.src!;
          image.alt = image.dataset.alt!;
          observer.unobserve(image);
        }
      });
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLazy, options?.root, options?.rootMargin, options?.threshold]);

  return (
    <img
      ref={ref}
      {...rest}
      src={isLazy ? undefined : src}
      data-src={src}
      alt={isLazy ? '' : alt}
      data-alt={alt}
      loading={loading}
    />
  );
};

export default LazyImage;
