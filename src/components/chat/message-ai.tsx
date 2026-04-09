export interface AiMessageItem {
  icon: string;
  iconClass: string;
  title: string;
  description: string;
}

export interface AiMessageProps {
  intro: string;
  detail: string;
  items: AiMessageItem[];
  timestamp: string;
}

export function MessageAi({ intro, detail, items, timestamp }: AiMessageProps) {
  return (
    <div className="flex items-start justify-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#b4c5ff] to-[#2563eb] shadow-[0_0_15px_rgba(37,99,235,0.4)]">
        <span
          className="material-symbols-outlined text-white"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          smart_toy
        </span>
      </div>
      <div className="max-w-[80%]">
        <div className="rounded-2xl rounded-tl-none border border-[#434655]/20 bg-linear-to-br from-[#2563eb]/10 to-[#131b2e]/40 p-5 backdrop-blur-md">
          <p
            className="mb-4 text-sm leading-relaxed text-white"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
          <p
            className="text-sm leading-relaxed text-[#c3c6d7]"
            dangerouslySetInnerHTML={{ __html: detail }}
          />
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-[#434655]/10 bg-[#131b2e]/50 p-3"
              >
                <span className={`material-symbols-outlined text-lg ${item.iconClass}`}>
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs font-bold text-white">{item.title}</p>
                  <p className="text-[11px] text-[#c3c6d7]">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-2 text-[10px] font-medium text-[#8d90a0]">AxIA • {timestamp}</p>
      </div>
    </div>
  );
}
