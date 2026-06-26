import { cn } from '@/lib/utils'

/** Inline success/error line shared by the admin action components. */
export default function ActionFeedback({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'text-[12.5px] font-medium',
        ok ? 'text-[#9FC4AC]' : 'text-red-300',
      )}
    >
      {children}
    </span>
  )
}
