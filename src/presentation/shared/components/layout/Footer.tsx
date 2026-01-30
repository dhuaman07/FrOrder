import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>
          © {new Date().getFullYear()} Todos los derechos reservados.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600 transition-colors">Términos</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Privacidad</a>
        </div>
      </div>
    </footer>
  );
};