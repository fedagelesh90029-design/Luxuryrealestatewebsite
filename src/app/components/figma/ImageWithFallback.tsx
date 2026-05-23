import React, { useState } from 'react'

// Base64 encoded professional placeholder (architectural pattern)
const SAFE_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWExYSIvPjxwYXRoIGQ9Ik0wIDBoODAwVjYwMEgwVjB6IiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMzAwIiByPSIxNTAiIHN0cm9rZT0iI2I1OGI1MiIgc3Ryb2tlLXdpZHRoPSIwLjUiIGZpbGw9Im5vbmUiLz48bGluZSB4MT0iNDAwIiB5MT0iMTUwIiB4Mj0iNDAwIiB5Mj0iNDUwIiBzdHJva2U9IiNiNThiNTIiIHN0cm9rZS13aWR0aD0iMC41Ii8+PGxpbmUgeDE9IjI1MCIgeTE9IjMwMCIgeDI9IjU1MCIgeTI9IjMwMCIgc3Ryb2tlPSIjYjU4YjUyIiBzdHJva2Utd2lkdGg9IjAuNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSIjYjU4YjUyIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0ic2VyaWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBzdHlsZT0idGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOjAuMmVtIj7QkdCV0Jst0KHQotCg0J7QmTwvdGV4dD48L3N2Zz4=";

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  // If error or no src, show the unblockable base64 placeholder
  const imageSrc = (didError || !src) ? SAFE_PLACEHOLDER : src;

  return (
    <div className={`relative overflow-hidden bg-[#1A1A1A] ${className ?? ''}`} style={style}>
      <img 
        src={imageSrc} 
        alt={alt} 
        className="w-full h-full object-cover"
        {...rest} 
        onError={handleError} 
      />
      {(didError || !src) && (
        <div className="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-black/50 to-transparent">
          <span className="text-[8px] text-white/40 uppercase tracking-[0.3em] font-medium px-4 text-center">{alt || 'Проект БЕЛ-СТРОЙ'}</span>
        </div>
      )}
    </div>
  )
}
