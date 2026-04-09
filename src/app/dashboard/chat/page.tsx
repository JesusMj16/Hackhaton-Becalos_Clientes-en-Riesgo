import { HistoryPanel } from '@/components/chat/history-panel';
import { MessageUser } from '@/components/chat/message-user';
import { MessageAi, type AiMessageProps } from '@/components/chat/message-ai';
import { TypingIndicator } from '@/components/chat/typing-indicator';
import { InputBar } from '@/components/chat/input-bar';
import { ContextPanel } from '@/components/chat/context-panel';

const AI_MESSAGE: AiMessageProps = {
  intro: 'Analizando los datos operativos de <span class="text-[#b4c5ff] font-bold">Grupo Industrial Norteño</span> en tiempo real...',
  detail: 'El cliente presenta un <span class="text-[#ef4444] font-bold">Riesgo Crítico</span> debido a tres factores fundamentales detectados en los últimos 30 días:',
  items: [
    {
      icon: 'trending_down',
      iconClass: 'text-[#ef4444]',
      title: 'Puntualidad Operativa',
      description: 'Caída del 12% en las ventanas de entrega programadas.',
    },
    {
      icon: 'sentiment_very_dissatisfied',
      iconClass: 'text-[#ef4444]',
      title: 'Satisfacción (NPS)',
      description: 'NPS negativo (-8) detectado tras la última encuesta de servicio.',
    },
    {
      icon: 'warning',
      iconClass: 'text-[#ef4444]',
      title: 'Volumen de Quejas',
      description: 'La tendencia de quejas ha subido un 24% este trimestre respecto al anterior.',
    },
  ],
  timestamp: 'Justo ahora',
};

export default function ChatPage() {
  return (
    // Bleed out of the dashboard layout's px-8 pb-12 and remove extra top spacing
    <div className="-mx-8 -mb-12 -mt-8 flex h-[calc(100vh-4rem)] overflow-hidden">
      <HistoryPanel />

      {/* Chat window */}
      <section className="relative flex flex-1 flex-col bg-[#0b1326]">
        {/* Chat header */}
        <div className="flex h-14 items-center justify-between border-b border-[#434655]/10 px-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-[#b4c5ff]">auto_awesome</span>
            <span className="font-heading text-sm font-bold tracking-tight text-white">
              Conversación con AxIA
            </span>
          </div>
          <span className="rounded bg-[#222a3d] px-2 py-1 text-[10px] font-bold uppercase text-[#8d90a0]">
            Modelo v4.2 Elite
          </span>
        </div>

        {/* Messages */}
        <div className="custom-scrollbar flex-1 space-y-8 overflow-y-auto p-8">
          <MessageUser
            text="¿Por qué está en riesgo crítico Grupo Industrial Norteño?"
            timestamp="10:42 AM"
          />
          <MessageAi {...AI_MESSAGE} />
          <TypingIndicator />
        </div>

        <InputBar />
      </section>

      <ContextPanel />
    </div>
  );
}
