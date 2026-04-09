'use client';

import { useState } from 'react';

export function InputBar() {
  const [value, setValue] = useState('');

  return (
    <div className="border-t border-[#434655]/10 bg-[#131b2e]/30 p-6 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-end gap-4 rounded-2xl border border-[#434655]/20 bg-[#222a3d] p-2 transition-all focus-within:border-[#b4c5ff]/50">
        <button
          type="button"
          className="p-2 text-[#8d90a0] transition-colors hover:text-white"
          aria-label="Adjuntar archivo"
        >
          <span className="material-symbols-outlined">attach_file</span>
        </button>
        <textarea
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Pregunta a AxIA sobre cualquier cliente..."
          className="flex-1 resize-none border-none bg-transparent py-2 text-sm text-white placeholder-[#8d90a0] focus:outline-none focus:ring-0"
        />
        <button
          type="button"
          className="rounded-xl bg-linear-to-br from-[#b4c5ff] to-[#2563eb] p-2.5 shadow-[0_0_12px_rgba(37,99,235,0.3)] transition-transform hover:scale-105 active:scale-95"
          aria-label="Enviar mensaje"
        >
          <span
            className="material-symbols-outlined text-white"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            send
          </span>
        </button>
      </div>
      <p className="mt-3 text-center text-[10px] text-[#8d90a0]">
        AxIA puede cometer errores. Verifica la información crítica.
      </p>
    </div>
  );
}
