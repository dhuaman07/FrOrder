export function OrdersStatus({ status }: { status: string }) {
  const getStatusStyle = (s: string) => {
    switch (s.toLowerCase()) {
      case 'pending':
        return { className: 'bg-yellow-100 text-yellow-800', label: 'Pendiente', icon: 'pi pi-clock' };
      case 'processing':
        return { className: 'bg-blue-100 text-blue-800', label: 'Procesando', icon: 'pi pi-spin pi-spinner' };
      case 'completed':
        return { className: 'bg-green-100 text-green-800', label: 'Completado', icon: 'pi pi-check-circle' };
      case 'cancelled':
        return { className: 'bg-red-100 text-red-800', label: 'Cancelado', icon: 'pi pi-times-circle' };
      default:
        return { className: 'bg-gray-100 text-gray-800', label: s, icon: 'pi pi-info-circle' };
    }
  };

  const style = getStatusStyle(status);

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${style.className}`}>
      <i className={style.icon}></i>
      {style.label}
    </span>
  );
}