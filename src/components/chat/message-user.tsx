interface MessageUserProps {
  text: string;
  timestamp: string;
}

export function MessageUser({ text, timestamp }: MessageUserProps) {
  return (
    <div className="flex items-start justify-end gap-4">
      <div className="max-w-[70%]">
        <div className="rounded-2xl rounded-tr-none bg-[#2563eb] p-4 shadow-xl">
          <p className="text-sm leading-relaxed text-[#eeefff]">{text}</p>
        </div>
        <p className="mt-2 text-right text-[10px] font-medium text-[#8d90a0]">{timestamp}</p>
      </div>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#222a3d]">
        <span className="material-symbols-outlined text-sm text-[#8d90a0]">person</span>
      </div>
    </div>
  );
}
