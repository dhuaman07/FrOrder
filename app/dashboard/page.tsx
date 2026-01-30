"use client";

import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { label: 'Esta semana', value: 'week' },
    { label: 'Este mes', value: 'month' },
    { label: 'Este año', value: 'year' }
  ];

  const chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ingresos',
        data: [65, 59, 80, 81, 56, 95],
        fill: true,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: number) {
            return '$' + value + 'K';
          }
        }
      }
    }
  };

  const statsCards = [
    { value: '9.3k', label: 'Usuarios activos', icon: 'pi-users', color: 'blue' },
    { value: '24k', label: 'Vistas totales', icon: 'pi-eye', color: 'red' },
    { value: '608', label: 'Nuevos suscriptores', icon: 'pi-user-plus', color: 'pink' },
    { value: '2.5k', label: 'Audiencia activa', icon: 'pi-chart-line', color: 'purple' }
  ];

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <i className={`pi ${stat.icon} text-${stat.color}-600 text-xl`}></i>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Highlights Card */}
        <Card title="Destacados" className="border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Ventas totales</span>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+2.7%</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">$295.7k</div>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 via-red-500 to-purple-500" style={{width: '65%'}}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Earnings Chart */}
        <Card className="border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Ingresos</h3>
            <Dropdown 
              value={selectedPeriod} 
              options={periods} 
              onChange={(e) => setSelectedPeriod(e.value)} 
              className="w-40"
            />
          </div>
          <div style={{height: '200px'}}>
            <Chart type="line" data={chartData} options={chartOptions} />
          </div>
        </Card>
      </div>

      {/* Join Network Card */}
      <Card className="border border-gray-200 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Conéctate hoy y únete a la <span className="text-blue-600">Red KeenThemes</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Mejora tus proyectos con temas y plantillas premium. Únete a la comunidad KeenThemes hoy
              para diseños de calidad superior y recursos.
            </p>
            <Button label="Comenzar" className="p-button-primary" />
          </div>
          <AvatarGroup>
            <Avatar image="https://i.pravatar.cc/150?img=1" size="large" shape="circle" />
            <Avatar image="https://i.pravatar.cc/150?img=2" size="large" shape="circle" />
            <Avatar image="https://i.pravatar.cc/150?img=3" size="large" shape="circle" />
            <Avatar label="+5" size="large" shape="circle" className="bg-green-500" />
          </AvatarGroup>
        </div>
      </Card>
    </div>
  );
}