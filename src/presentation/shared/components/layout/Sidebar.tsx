import React, { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import { useRouter, usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  submenu?: MenuItem[];
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

interface SidebarProps {
  visible: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ visible, onToggle }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});

  const menuItems: MenuSection[] = [
    {
      section: 'Principal',
      items: [
        { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' }
      ]
    },    
    {
      section: 'Procesos',
      items: [
        { 
          label: 'Pedidos', 
          icon: 'pi pi-box',
          submenu: [
            { label: 'Lista de Pedidos', icon: 'pi pi-list', route: '/dashboard/orders' }
          ]
        }
      ]
    }
  ];

  const toggleSubmenu = (menuLabel: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuLabel]: !prev[menuLabel]
    }));
  };

  const isActive = (route?: string) => {
    if (!route) return false;
    return pathname === route;
  };

  const isParentActive = (submenu?: MenuItem[]) => {
    if (!submenu) return false;
    return submenu.some(item => pathname === item.route);
  };

  const renderMenuItem = (item: MenuItem, itemIdx: number, level: number = 0, sectionIdx: number = 0) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedMenus[item.label];
    const active = isActive(item.route);
    const parentActive = isParentActive(item.submenu);
    const tooltipId = `menu-tooltip-${sectionIdx}-${itemIdx}-${level}`;

    return (
      <div key={itemIdx} className="relative">        
        {!visible && (
          <Tooltip target={`.${tooltipId}`} position="right" />
        )}
        
        <div 
          className={`relative group rounded-lg transition-all duration-200 ${
            active || parentActive
              ? 'bg-blue-50'
              : 'hover:bg-blue-50'
          } ${level > 0 ? '' : 'mb-1'} ${tooltipId}`}
          data-pr-tooltip={item.label}
        >          
          {(active || parentActive) && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full transition-all duration-300" />
          )}
          
          <button
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-200 ${
              active || parentActive
                ? 'text-blue-600 font-medium'
                : 'text-gray-700 group-hover:text-blue-600'
            } ${level > 0 ? 'pl-8' : 'pl-5'} ${!visible ? 'justify-center' : ''}`}
            onClick={() => {
              if (hasSubmenu) {
                if (visible) {
                  toggleSubmenu(item.label);
                }
              } else if (item.route) {
                router.push(item.route);
              }
            }}
          >
            <i 
              className={`${item.icon} transition-all duration-200 ${
                active || parentActive 
                  ? 'scale-110' 
                  : 'group-hover:scale-110'
              }`}
            />
            
            {visible && (
              <>
                <span className="flex-1 transition-all duration-200">
                  {item.label}
                </span>
                
                {hasSubmenu && (
                  <i 
                    className={`pi pi-chevron-right text-xs transition-all duration-300 ${
                      isExpanded ? 'rotate-90' : 'rotate-0'
                    } ${
                      active || parentActive 
                        ? 'text-blue-600' 
                        : 'text-gray-400 group-hover:text-blue-600'
                    }`}
                  />
                )}
              </>
            )}
          </button>
        </div>
        
        {hasSubmenu && visible && (
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="ml-4 mt-1 mb-2 space-y-0.5 border-l-2 border-gray-200 pl-2">
              {item.submenu!.map((subItem, subIdx) => (
                <div
                  key={subIdx}
                  className={`transition-all duration-300 ease-out ${
                    isExpanded 
                      ? 'translate-x-0 opacity-100' 
                      : '-translate-x-4 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isExpanded ? `${subIdx * 40}ms` : '0ms'
                  }}
                >
                  {renderMenuItem(subItem, subIdx, level + 1, sectionIdx)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-full ${visible ? 'w-64' : 'w-20'}`}>
      {/* Header */}
      <div className={`p-4 border-b border-gray-200 flex items-center ${visible ? 'justify-between' : 'justify-center'}`}>
        {visible ? (
          <>
            <div className="flex items-center gap-3">
              <Avatar icon="pi pi-building" className="bg-blue-500" size="large" shape="circle" />
              <div>
                <div className="font-semibold text-gray-900">Mi Empresa</div>
                <div className="text-xs text-gray-500">Panel Admin</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Tooltip target=".company-avatar" content="Mi Empresa" position="right" />
            <Avatar 
              icon="pi pi-building" 
              className="bg-blue-500 company-avatar cursor-pointer" 
              size="large" 
              shape="circle" 
            />
          </>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-3">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-4">
            {visible && (
              <div className="text-xs font-semibold text-gray-400 uppercase px-3 py-2">
                {section.section}
              </div>
            )}
            {!visible && idx > 0 && (
              <div className="border-t border-gray-200 my-2" />
            )}
            <div className="space-y-1">
              {section.items.map((item, itemIdx) => renderMenuItem(item, itemIdx, 0, idx))}
            </div>
          </div>
        ))}
      </div>
  
      <div className="p-3 border-t border-gray-200">
        <Tooltip target=".toggle-sidebar-btn" content={visible ? "Colapsar menú" : "Expandir menú"} position="right" />
        <button
          className="toggle-sidebar-btn w-full p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 flex items-center justify-center"
          onClick={onToggle}
        >
          <i className={`pi ${visible ? 'pi-angle-left' : 'pi-angle-right'} text-gray-600 transition-transform duration-300`} />
        </button>
      </div>
    </div>
  );
};