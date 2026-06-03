import React, { useEffect } from 'react'
import { cn } from '../../lib/utils'

type ImagePhotoProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'onError'
> & {
  src?: string | null
  fallbackSrc?: string
  isCaptured?: boolean
}

const DEFAULT_FALLBACK_SRC = '/img/no-picture.svg'

const sanitizeImageSrc = (value?: string | null): string | null => {
  if (!value) return null

  const normalizedValue = value.trim()
  if (!normalizedValue) return null

  if (normalizedValue.toLowerCase().includes('402 not found')) {
    return null
  }

  return normalizedValue
}

const ImagePhoto = ({
  src,
  alt = 'Photo',
  className,
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  isCaptured = false,
  ...props
}: ImagePhotoProps) => {
  const [displaySrc, setDisplaySrc] = React.useState(
    sanitizeImageSrc(src) ?? fallbackSrc,
  )

  useEffect(() => {
    setDisplaySrc(sanitizeImageSrc(src) ?? fallbackSrc)
  }, [src, fallbackSrc])

  return (
    <img
      {...props}
      src={`${displaySrc}?v=${Date.now()}&c=${isCaptured ? '1' : '0'}`} // Cache buster to ensure latest photo is fetched
      alt={alt}
      loading={props.loading ?? 'lazy'}
      decoding={props.decoding ?? 'async'}
      onError={() => {
        if (displaySrc !== fallbackSrc) {
          setDisplaySrc(fallbackSrc)
        }
      }}
      className={cn('object-cover', className)}
    />
  )
}

export default ImagePhoto
