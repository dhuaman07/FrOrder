"use client";
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MenuItem } from 'primereact/menuitem';
import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Tag } from 'primereact/tag';

export default function UsersPage() {
  const orders = [
    { orderId: 1,orderDate:'01/01/2026', orderNumber: 'ORD-2026-0001', customerName: 'Mery', status: 'Pending', subTotal: 100, tax: 10, total: 110 },
    { orderId: 2,orderDate:'01/01/2026', orderNumber: 'ORD-2026-0002', customerName: 'Brayan', status: 'Pending', subTotal: 100, tax: 10, total: 110 },
    { orderId: 3,orderDate:'01/01/2026', orderNumber: 'ORD-2026-0003', customerName: 'Diego', status: 'Pending', subTotal: 100, tax: 10, total: 110 },
    { orderId: 4,orderDate:'01/01/2026', orderNumber: 'ORD-2026-0004', customerName: 'Sthefany', status: 'Pending', subTotal: 100, tax: 10, total: 110 },
    { orderId: 5,orderDate:'01/01/2026', orderNumber: 'ORD-2026-0005', customerName: 'Denny', status: 'Pending', subTotal: 100, tax: 10, total: 110 },
    { orderId: 6,orderDate:'01/01/2026', orderNumber: 'ORD-2026-0006', customerName: 'Edwin', status: 'Pending', subTotal: 100, tax: 10, total: 110 },
    { orderId: 7,orderDate:'01/01/2026', orderNumber: 'ORD-2026-0007', customerName: 'Juan', status: 'Pending', subTotal: 100, tax: 10, total: 110 },
    { orderId: 8,orderDate:'01/01/2026', orderNumber: 'ORD-2026-0008', customerName: 'Hans', status: 'Pending', subTotal: 100, tax: 10, total: 110 }
  ];

  const menuRef = useRef<Menu>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleEdit = (order: any) => {
    console.log('Editar orden:', order);

  };

  const handleDelete = (order: any) => {
    console.log('Eliminar orden:', order);
  };

  const handleNewOrder = () => {
    console.log('Nueva orden');
  };

  const statusBodyTemplate = (rowData: any) => {
    const getStatusStyle = (status: string) => {
      switch (status.toLowerCase()) {
        case 'pending':
          return {
            className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            label: 'Pendiente',
            icon: 'pi pi-clock'
          };
        case 'processing':
          return {
            className: 'bg-blue-100 text-blue-800 border-blue-300',
            label: 'Procesando',
            icon: 'pi pi-spin pi-spinner'
          };
        case 'completed':
          return {
            className: 'bg-green-100 text-green-800 border-green-300',
            label: 'Completado',
            icon: 'pi pi-check-circle'
          };
        case 'cancelled':
          return {
            className: 'bg-red-100 text-red-800 border-red-300',
            label: 'Cancelado',
            icon: 'pi pi-times-circle'
          };
        case 'shipped':
          return {
            className: 'bg-purple-100 text-purple-800 border-purple-300',
            label: 'Enviado',
            icon: 'pi pi-send'
          };
        default:
          return {
            className: 'bg-gray-100 text-gray-800 border-gray-300',
            label: status,
            icon: 'pi pi-info-circle'
          };
      }
    };

    const style = getStatusStyle(rowData.status);

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${style.className}`}>
        <i className={style.icon}></i>
        {style.label}
      </span>
    );
  };

  const actionsBodyTemplate = (rowData: any) => {
    const menuItems: MenuItem[] = [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => handleEdit(rowData)
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => handleDelete(rowData),
        className: 'text-red-500'
      }
    ];

    return (
      <div>
        <Button
          icon="pi pi-ellipsis-v"
          className="p-button-text p-button-rounded"
          onClick={(e) => {
            setSelectedOrder(rowData);
            menuRef.current?.toggle(e);
          }}
        />
        <Menu model={menuItems} popup ref={menuRef} />
      </div>
    );
  };

  // Header con botón "Nuevo"
  const tableHeader = (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Listado de Órdenes</h3>
      <Button
        label="Nueva Orden"
        icon="pi pi-plus"
        className="p-button-success"
        onClick={handleNewOrder}
      />
    </div>
  );

  return (
    <div className="p-6">
      <Card title="Orders" className="border border-gray-200 shadow-sm">
        <DataTable
          value={orders}
          className="mt-4"
          header={tableHeader}
          paginator
          rows={10}
          emptyMessage="No hay órdenes para mostrar"
        >
          <Column field="orderNumber" header="# Orden" sortable />
          <Column field="orderDate" header="Fecha" sortable />
          <Column field="customerName" header="Cliente" sortable />
          <Column field="status" header="Estado" body={statusBodyTemplate} sortable />
          <Column field="subTotal" header="SubTotal" sortable />
          <Column field="tax" header="Igv" sortable />
          <Column field="total" header="Total" sortable />
          <Column
            header="Acciones"
            body={actionsBodyTemplate}
            style={{ width: '100px', textAlign: 'center' }}
            frozen
            alignFrozen="right"
          />
        </DataTable>
      </Card>
    </div>
  );
}