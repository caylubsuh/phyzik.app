import Image from 'next/image'
import { cn } from '@/lib/utils'

type PhoneFrameProps = {
  screenshot: string
  alt: string
  priority?: boolean
  floatOnHover?: boolean
  className?: string
}

export default function PhoneFrame({
  screenshot,
  alt,
  priority = false,
  floatOnHover = false,
  className,
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        'relative w-full max-w-[320px] aspect-[9/19.5] rounded-[2.5rem] md:rounded-[3rem] bg-[#0A0A0A] p-[3px] shadow-2xl shadow-black/50 ring-1 ring-white/[0.08] transition-transform duration-500 ease-out',
        floatOnHover && 'hover:-translate-y-1 hover:scale-[1.02]',
        className,
      )}
    >
      <div className="relative h-full w-full rounded-[2.3rem] md:rounded-[2.8rem] bg-black p-2">
        <div className="absolute left-1/2 top-3 z-20 h-[22px] w-[35%] -translate-x-1/2 rounded-full bg-black" />
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-bg">
          <Image
            src={screenshot}
            alt={alt}
            priority={priority}
            fill
            sizes="(min-width: 768px) 320px, 80vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-[40%] rounded-t-[2rem] md:rounded-t-[2.5rem] bg-gradient-to-b from-white/[0.04] to-transparent" />
        </div>
      </div>
    </div>
  )
}
