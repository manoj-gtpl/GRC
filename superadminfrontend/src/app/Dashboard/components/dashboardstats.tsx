'use client';

import { LucideIcon, ArrowUp, ArrowDown } from 'lucide-react';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color: 'purple' | 'pink' | 'blue' | 'green';
}

export default function DashboardStats({ stats }: { stats: StatCardProps[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  const colorGradients = {
    purple: 'from-[#6b46c1] to-purple-600',
    pink: 'from-[#d53f8c] to-pink-600',
    blue: 'from-blue-600 to-cyan-600',
    green: 'from-green-600 to-emerald-600',
  };

  const iconBg = {
    purple: 'bg-purple-500/20',
    pink: 'bg-pink-500/20',
    blue: 'bg-blue-500/20',
    green: 'bg-green-500/20',
  };

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-xl border border-gray-700 p-6 bg-linear-to-br from-gray-800 to-gray-900',
        'hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group'
      )}
    >
      {/* Decorative blur glow */}
      <div
        className={clsx(
          'absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity',
          `bg-linear-to-br ${colorGradients[color]}`
        )}
      />

      {/* Card Content */}
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div className={clsx('p-3 rounded-lg', iconBg[color])}>
            <Icon className="w-6 h-6 text-white" aria-hidden />
          </div>

          {/* Trend */}
          {trend && (
            <div
              className={clsx(
                'flex items-center space-x-1 text-xs font-medium',
                trend.isPositive ? 'text-green-400' : 'text-red-400'
              )}
              aria-label={`Trend ${trend.isPositive ? 'up' : 'down'} ${trend.value}`}
            >
              {trend.isPositive ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>

        {/* Title and Value */}
        <div className="space-y-2">
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div
        className={clsx(
          'absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity',
          `bg-linear-to-r ${colorGradients[color]}`
        )}
      />
    </div>
  );
}
