import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import { useRef } from 'react';

export function OrdersActionsMenu({ order, onEdit, onDelete }: any) {
  const menuRef = useRef<Menu | null>(null);

  const items: MenuItem[] = [
    { label: 'Editar', icon: 'pi pi-pencil', command: () => onEdit(order) },
    { label: 'Eliminar', icon: 'pi pi-trash', command: () => onDelete(order), className: 'text-red-500' },
  ];

  return (
    <>
      <Button
        icon="pi pi-ellipsis-v"
        className="p-button-text p-button-rounded"
        onClick={(e) => menuRef.current?.toggle(e)}
      />
      <Menu model={items} popup ref={menuRef} />
    </>
  );
}