'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { NAV_ITEMS } from '@/constants/nav';

export function AppsDropdown() {
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-[#8d90a0] transition-colors hover:text-white"
        aria-label="Navegación rápida"
      >
        <span className="material-symbols-outlined">apps</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-[#434655]/20 bg-[#131b2e] p-3 shadow-2xl">
          <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-[#8d90a0]">
            Navegación Rápida
          </p>
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-2 rounded-xl border border-[#434655]/10 bg-[#222a3d]/50 px-3 py-4 text-center transition-all hover:border-[#b4c5ff]/30 hover:bg-[#222a3d]"
              >
                <span className="material-symbols-outlined text-2xl text-[#b4c5ff]">
                  {item.icon}
                </span>
                <span className="text-[10px] font-bold leading-tight text-[#c3c6d7]">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
