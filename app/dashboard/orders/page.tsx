"use client";
import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { OrdersTable } from '@/src/presentation/modules/orders/components/OrdersTable';
import { useOrders } from '@/src/presentation/modules/orders/hooks/useOrders';

export default function OrdersPage() {
  const { orders, loading, getAllOrders } = useOrders({ autoFetch: true });
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (order: any) => console.log("Editar", order);
  const handleDelete = (order: any) => console.log("Eliminar", order);
  const handleNewOrder = () => console.log("Crear nuevo");

  const filteredOrders = orders.filter(order => 
    order.orderNumber?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ProgressSpinner 
          style={{ width: '50px', height: '50px' }} 
          strokeWidth="4" 
          animationDuration="1s"
        />
        <p className="mt-4 text-gray-600">Cargando órdenes...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Listado de Órdenes</h3>
 
      <div className="flex items-center gap-2 mb-4">
        <InputText
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar órdenes..."
          className="flex-1"
        />

        <Button 
          label="Nueva Orden" 
          icon="pi pi-plus" 
          className="p-button-success" 
          onClick={handleNewOrder} 
        />
        <Button 
          label="Actualizar" 
          icon="pi pi-refresh" 
          className="p-button-secondary" 
          onClick={getAllOrders} 
        />
      </div>

      <OrdersTable
        orders={filteredOrders}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}