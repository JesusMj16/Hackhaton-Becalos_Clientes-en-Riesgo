import type { AlertsBannerProps } from '@/types/components';

export function AlertsBanner({ title, subtitle, tags }: AlertsBannerProps) {
  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-[#ef4444]/20 bg-linear-to-r from-[#ef4444]/10 to-[#b91c1c]/5 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ef4444]/20">
            <span
              className="material-symbols-outlined text-2xl text-[#ef4444]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
          </div>
          <div>
            <h4 className="font-heading font-bold text-white">{title}</h4>
            <p className="mt-1 text-sm text-[#c3c6d7]">{subtitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#ef4444]/30 bg-[#ef4444]/10 px-3 py-1 text-xs font-bold text-[#ef4444]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
