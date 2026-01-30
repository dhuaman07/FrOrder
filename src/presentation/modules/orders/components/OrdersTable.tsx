import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { OrdersActionsMenu } from './OrdersActionsMenu';
import { OrdersStatus } from './OrdersStatus';
import { formatDate } from '@/src/presentation/shared/utils/formatter';

export function OrdersTable({ orders, onEdit, onDelete }: any) {
  return (
    <DataTable
      value={orders}
      className="mt-4 orders-table"
      paginator
      rows={8}
      emptyMessage="No hay órdenes para mostrar"
      
    >
      <Column field="orderNumber" header="# Orden" sortable />
      <Column
        field="orderDate"
        header="Fecha"
        body={(row: any) => formatDate(row.orderDate)}
        sortable />
      <Column field="customerName" header="Cliente" sortable />
      <Column header="Estado" body={(row: any) => <OrdersStatus status={row.status} />} sortable />
      <Column field="subTotal" header="SubTotal" sortable />
      <Column field="tax" header="Igv" sortable />
      <Column field="total" header="Total" sortable />
      <Column
        header="Acciones"
        body={(row: any) => (
          <OrdersActionsMenu order={row} onEdit={onEdit} onDelete={onDelete} />
        )}
        style={{ width: '100px', textAlign: 'center' }}
      />
    </DataTable>
  );
}
