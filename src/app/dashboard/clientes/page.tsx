import { ClientsView } from '@/components/dashboard/clients-page/clients-view';

export default function ClientesPage() {
  return (
    <>
      <div>
        <h2 className="font-heading text-4xl font-extrabold tracking-tight text-white">
          Gestión de Clientes
        </h2>
        <p className="mt-2 text-[#c3c6d7]">
          Monitorea, filtra y accede al expediente completo de cada cliente en el portafolio.
        </p>
      </div>
      <ClientsView />
    </>
  );
}
