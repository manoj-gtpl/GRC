'use client';

import { useState, useEffect } from 'react';
import { Building2, Users, Activity, TrendingUp, Plus, Search, Filter } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardStats from './components/dashboardstats';
import OrgTable, { Organization } from './components/Orgtable';
import OrgModal from './components/Orgmodal';
import DeleteConfirmModal from './components/Deleteorganizationmodal';

export default function DeveloperDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [deleteOrgId, setDeleteOrgId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
    //   setLoading(true);
    //   const { data: orgsData, error: orgsError } = await supabase
    //     .from('organizations')
    //     .select('*')
    //     .order('created_at', { ascending: false });

    //   if (orgsError) throw orgsError;

    //   const { data: adminsData, error: adminsError } = await supabase
    //     .from('organization_admins')
    //     .select('*');

    //   if (adminsError) throw adminsError;

    //   const orgsWithAdmins = (orgsData || []).map((org) => {
    //     const admin = (adminsData || []).find((a) => a.organization_id === org.id);
    //     return {
    //       ...org,
    //       admin: admin
    //         ? {
    //             admin_name: admin.admin_name,
    //             admin_email: admin.admin_email,
    //             admin_phone: admin.admin_phone,
    //           }
    //         : undefined,
    //     };
    //   });

    //   setOrganizations(orgsWithAdmins);
    console.log('yes')
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSaveOrganization = async (orgData: any) => {
  //   try {
    //   if (orgData.id) {
    //     const { error: updateError } = await supabase
    //       .from('organizations')
    //       .update({
    //         name: orgData.name,
    //         domain: orgData.domain,
    //         industry: orgData.industry,
    //         size: orgData.size,
    //         status: orgData.status,
    //         updated_at: new Date().toISOString(),
    //       })
    //       .eq('id', orgData.id);

    //     if (updateError) throw updateError;

    //     if (orgData.admin) {
    //       const { data: existingAdmin } = await supabase
    //         .from('organization_admins')
    //         .select('id')
    //         .eq('organization_id', orgData.id)
    //         .maybeSingle();

    //       if (existingAdmin) {
    //         const { error: adminUpdateError } = await supabase
    //           .from('organization_admins')
    //           .update({
    //             admin_name: orgData.admin.admin_name,
    //             admin_email: orgData.admin.admin_email,
    //             admin_phone: orgData.admin.admin_phone,
    //           })
    //           .eq('id', existingAdmin.id);

    //         if (adminUpdateError) throw adminUpdateError;
    //       } else {
    //         const { error: adminInsertError } = await supabase
    //           .from('organization_admins')
    //           .insert({
    //             organization_id: orgData.id,
    //             admin_name: orgData.admin.admin_name,
    //             admin_email: orgData.admin.admin_email,
    //             admin_phone: orgData.admin.admin_phone,
    //           });

    //         if (adminInsertError) throw adminInsertError;
    //       }
    //     } else {
    //       await supabase.from('organization_admins').delete().eq('organization_id', orgData.id);
    //     }
    //   } else {
    //     const { data: newOrg, error: insertError } = await supabase
    //       .from('organizations')
    //       .insert({
    //         name: orgData.name,
    //         domain: orgData.domain,
    //         industry: orgData.industry,
    //         size: orgData.size,
    //         status: orgData.status,
    //       })
    //       .select()
    //       .single();

    //     if (insertError) throw insertError;

    //     if (orgData.admin && newOrg) {
    //       const { error: adminInsertError } = await supabase
    //         .from('organization_admins')
    //         .insert({
    //           organization_id: newOrg.id,
    //           admin_name: orgData.admin.admin_name,
    //           admin_email: orgData.admin.admin_email,
    //           admin_phone: orgData.admin.admin_phone,
    //         });

    //       if (adminInsertError) throw adminInsertError;
    //     }
    //   }

    //   await fetchOrganizations();
    //   setIsModalOpen(false);
    //   setSelectedOrg(null);
  //   console.log('yes')
  //   } catch (error) {
  //     console.error('Error saving organization:', error);
  //   }
  // };

  const handleSaveOrganization = async (orgData: any) => {
    try {
      let response;

      if (selectedOrg) {
        // Update existing org
        response = await fetch(`http://localhost:8000/api/organizations/${selectedOrg.id}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orgData),
        });
      } else {
        // Create new org + admin (IDs auto-generated by backend)
        response = await fetch('http://localhost:8000/api/organizations/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orgData),
        });
      }

      if (!response.ok) throw new Error('Failed to save organization');
      await fetchOrganizations();
      setIsModalOpen(false);
      setSelectedOrg(null);
    } catch (error) {
      console.error('Error saving organization:', error);
    }
  };


  const handleDeleteOrganization = async () => {
    if (!deleteOrgId) return;

    try {
    //   const { error } = await supabase.from('organizations').delete().eq('id', deleteOrgId);

    //   if (error) throw error;

    //   await fetchOrganizations();
    //   setIsDeleteModalOpen(false);
    //   setDeleteOrgId(null);
    console.log('yes')
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleEdit = (org: Organization) => {
    setSelectedOrg(org);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteOrgId(id);
    setIsDeleteModalOpen(true);
  };

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.domain?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.industry?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === 'all' || org.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const stats = [
    {
      title: 'Total Organizations',
      value: organizations.length,
      icon: Building2,
      color: 'purple' as const,
      trend: { value: '+12%', isPositive: true },
    },
    {
      title: 'Assigned Admins',
      value: organizations.filter((o) => o.admin).length,
      icon: Users,
      color: 'pink' as const,
      trend: { value: '+8%', isPositive: true },
    },
    {
      title: 'Active Organizations',
      value: organizations.filter((o) => o.status === 'active').length,
      icon: Activity,
      color: 'green' as const,
      trend: { value: '+5%', isPositive: true },
    },
    // {
    //   title: 'Growth Rate',
    //   value: '24%',
    //   icon: TrendingUp,
    //   color: 'blue' as const,
    //   trend: { value: '+3%', isPositive: true },
    // },
  ];

  const deleteOrgName =
    deleteOrgId && organizations.find((o) => o.id === deleteOrgId)?.name;

  const hasExistingAdmin = organizations.some((org) => org.admin && org.id !== selectedOrg?.id);

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'organizations':
        return 'Organizations';
      case 'logs':
        return 'Activity Logs';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <>
      <div className="flex lg:hidden items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#6b46c1] to-[#d53f8c] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Desktop Only</h1>
          <p className="text-gray-400 max-w-md">
            This dashboard is available only on desktop or laptop screens. Please access from a larger device.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar title={getSectionTitle()} onLogout={handleLogout} />

          <main className="flex-1 overflow-y-auto">
            <div className="p-8">
              {activeSection === 'dashboard' && (
                <div className="space-y-8">
                  <DashboardStats stats={stats} />

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {organizations.slice(0, 5).map((org) => (
                        <div
                          key={org.id}
                          className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6b46c1] to-[#d53f8c] flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {org.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-white font-medium">{org.name}</p>
                              <p className="text-gray-400 text-sm">
                                Created {org.created_at ? new Date(org.created_at).toLocaleDateString() : 'Unknown date'}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              org.status === 'active'
                                ? 'bg-green-500/10 text-green-400'
                                : 'bg-gray-500/10 text-gray-400'
                            }`}
                          >
                            {org.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'organizations' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search organizations..."
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedOrg(null);
                        setIsModalOpen(true);
                      }}
                      className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] hover:from-[#5a3ba1] hover:to-[#b33670] text-white rounded-lg transition-all font-medium shadow-lg shadow-purple-500/30"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Organization</span>
                    </button>
                  </div>

                  {loading ? (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-12 text-center">
                      <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
                      <p className="text-gray-400 mt-4">Loading organizations...</p>
                    </div>
                  ) : (
                    <OrgTable
                      organizations={filteredOrganizations}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  )}
                </div>
              )}

              {activeSection === 'logs' && (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-12 text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Activity Logs</h3>
                  <p className="text-gray-400">Activity logs will be displayed here</p>
                </div>
              )}

              {activeSection === 'settings' && (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-12 text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
                  <p className="text-gray-400">Developer settings will be displayed here</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <OrgModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrg(null);
        }}
        onSave={handleSaveOrganization}
        organization={selectedOrg}
        hasExistingAdmin={hasExistingAdmin}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteOrgId(null);
        }}
        onConfirm={handleDeleteOrganization}
        organizationName={deleteOrgName || ''}
      />
    </>
  );
}