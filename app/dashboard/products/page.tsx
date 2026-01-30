import { Card } from 'primereact/card';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
          <p className="text-gray-600 mt-1">Gestiona tus productos</p>
        </div>
      </div>

      <Card className="shadow">
        <p className="text-gray-600">Lista de productos aquí...</p>
      </Card>
    </div>
  );
}