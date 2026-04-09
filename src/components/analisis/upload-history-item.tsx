interface UploadHistoryItemProps {
  filename: string;
  timestamp: string;
}

export function UploadHistoryItem({ filename, timestamp }: UploadHistoryItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[#222a3d]/40 p-3">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[#4ae176]">check_circle</span>
        <span className="text-xs text-[#dae2fd]">{filename}</span>
      </div>
      <span className="text-[10px] text-[#8d90a0]">{timestamp}</span>
    </div>
  );
}
