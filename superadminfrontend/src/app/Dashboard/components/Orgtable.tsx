'use client';

import { Edit2, Trash2, MoreVertical, CheckCircle, XCircle, Clock } from 'lucide-react';

export interface Organization {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  status: string;
  description?: string;
  email?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  pincode?: string;
  // organization_logo?: string | File | null; // backend returns logo URL
  logo_url?: string; // backend returns logo URL
  created_at?: string;

  admin?: {
    admin_name: string;
    admin_email: string;
    role: string;
    admin_phone?: string;
    admin_password?: string; //  added
    // profile_image?: string | File | null; // backend returns image URL
    profile_image?: string; // backend returns image URL
  };
}

interface OrgTableProps {
  organizations: Organization[];
  onEdit: (org: Organization) => void;
  onDelete: (id: string) => void;
}

export default function OrgTable({ organizations, onEdit, onDelete }: OrgTableProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-400" />;
      case 'suspended':
        return <Clock className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'inactive':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
      case 'suspended':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getSizeBadgeColor = (size: string) => {
    switch (size) {
      case 'small':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'medium':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'large':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/30';
      case 'enterprise':
        return 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  if (organizations.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-12 text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <MoreVertical className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Organizations Yet</h3>
        <p className="text-gray-400 mb-6">Get started by creating your first organization</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 bg-gray-900/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Organization
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Domain
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Industry
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Admin
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {organizations.map((org) => (
              <tr key={org.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6b46c1] to-[#d53f8c] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {org.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{org.name}</div>
                      <div className="text-xs text-gray-400">
                        Created {org.created_at ? new Date(org.created_at).toLocaleDateString() : '-'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{org.domain || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{org.industry || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSizeBadgeColor(org.size)}`}>
                    {org.size}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {org.admin ? (
                    <div>
                      <div className="text-sm text-white font-medium">{org.admin.admin_name}</div>
                      <div className="text-xs text-gray-400">{org.admin.admin_email}</div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500 italic">No admin assigned</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(org.status)}`}>
                    {getStatusIcon(org.status)}
                    <span>{org.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(org)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(org.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
