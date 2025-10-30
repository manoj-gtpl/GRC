'use client';

import { X, AlertCircle, EyeOff, Eye } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Organization } from './Orgtable';
import axios from 'axios';
import { useToast } from "../../hooks/use-toast";
import { useRouter } from "next/navigation";

interface AdminData {
  admin_name: string;
  admin_email: string;
  admin_phone?: string | null;
  admin_password?: string | null;
  profile_image?: string;
  role: string;
}

interface OrgModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (org: Partial<Organization> & { admin?: AdminData }) => void;
  organization?: Organization | null;
  hasExistingAdmin?: boolean;
}

type FormData = {
  name: string;
  domain: string;
  industry_type: string;
  size: string;
  status: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  logo_url: string;
  admin_name: string;
  admin_email: string;
  role: string;
  admin_phone: string;
  admin_password: string;
  profile_image: string;
};

//this is for fetching the roles from the backend
interface Role {
  role_id: string;
  name: string;
  description?: string;
}

export default function OrgModal({
  isOpen,
  onClose,
  onSave,
  organization,
  hasExistingAdmin = false,
}: OrgModalProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [assignAdmin, setAssignAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [roles, setRoles] = useState<Role[]>([]);

  const initialFormData = useMemo<FormData>(() => {
    if (organization) {
      return {
        name: organization.name || '',
        domain: organization.domain || '',
        industry_type: organization.industry_type || '',
        size: organization.size || 'small',
        status: organization.status || 'active',
        description: organization.description || '',
        email: organization.email || '',
        phone: organization.phone || '',
        address: organization.address || '',
        country: organization.country || '',
        state: organization.state || '',
        city: organization.city || '',
        pincode: organization.pincode || '',
        logo_url: organization.logo_url || '',
        admin_name: organization.admin?.name || '',
        admin_email: organization.admin?.email || '',
        role: organization.admin?.role || '',
        admin_phone: organization.admin?.admin_phone || '',
        admin_password: organization.admin?.password || '',
        profile_image: organization.admin?.profile_image || '',
      };
    }

    return {
      name: '',
      domain: '',
      industry_type: '',
      size: 'small',
      status: 'active',
      description: '',
      email: '',
      phone: '',
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      logo_url: '',
      admin_name: '',
      admin_email: '',
      role: '',
      admin_phone: '',
      admin_password: '',
      profile_image: '',
    };
  }, [organization]);

  const [formData, setFormData] = useState<FormData>(initialFormData);

// fetch roles from backend for dropdown options. Value will be role_id, display name will be name
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8001/rbac/roles/`);
        if (!res.ok) throw new Error("Failed to fetch roles");
        const data = await res.json();
        setRoles(data);
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    setFormData(initialFormData);
    setErrors({});
    setAssignAdmin(Boolean(organization?.admin));
  }, [initialFormData, isOpen, organization]);

  // 🔧 Updated rule: only allow admin assignment if organization already exists
  const canAssignAdmin = useMemo(() => {
    if (!organization) return false; // ✅ block admin assignment during creation
    if (!hasExistingAdmin) return true;
    return Boolean(organization?.admin);
  }, [hasExistingAdmin, organization]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Organization name is required';
    }

    if (formData.email) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(formData.email)) {
        newErrors.organization_email = 'Invalid organization email format';
      }
    }

    if (assignAdmin) {
      if (!formData.admin_name || !formData.admin_name.trim()) {
        newErrors.admin_name = 'Admin name is required';
      }
      if (!formData.admin_email || !formData.admin_email.trim()) {
        newErrors.admin_email = 'Admin email is required';
      } else {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(formData.admin_email)) {
          newErrors.admin_email = 'Invalid admin email format';
        }
      }
      if (!organization?.admin && !formData.admin_password) {
        newErrors.admin_password = 'Password is required for new admin';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault?.();
    if (!validate()) return;
    console.log('organization:', organization);

    try {
      let response;

      // 🟢 CASE 1: Create new organization
      if (!organization) {
        console.log("Creating new organization:", formData.name);
        const orgPayload = {
          name: formData.name,
          domain: formData.domain,
          industry_type: formData.industry_type,
          description: formData.description,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          state: formData.state,
          city: formData.city,
          pincode: formData.pincode,
          logo_url: formData.logo_url,
          status: formData.status,
        };

        response = await axios.post(
          `${API_BASE_URL}/api/organization/register/`,
          orgPayload,
          { headers: { "Content-Type": "application/json" } }
        );

        toast({
          title: "✅ Organization Created",
          description: "You can now assign an admin from the organization editor.",
        });
      }

      // 🟣 CASE 2: Add Admin to existing organization
      else if (organization && assignAdmin) {
        console.log("Adding admin to organization:", organization.organization_id);
        const adminPayload = {
          organization: organization.organization_id, // ✅ send FK
          organization_name: organization.name,
          username: formData.admin_name,
          email: formData.admin_email,
          admin_phone: formData.admin_phone,
          password: formData.admin_password,
          confirm_password: confirmPassword,
          profile_image: formData.profile_image,
          role_id: formData.role || "organization_admin",
        };

        response = await axios.post(
          `${API_BASE_URL}/api/organization-admin/register/`,
          adminPayload,
          { headers: { "Content-Type": "application/json" } }
        );

        toast({
          title: "🎉 Admin Assigned",
          description: `${formData.admin_name} is now the admin for ${organization.name}`,
        });
      }

      if (response?.status === 200 || response?.status === 201) {
        onSave(formData);
        onClose();
      }
    } catch (err: any) {
      console.error("Save failed:", err);
      toast({
        title: "Save Failed",
        description:
          err.response?.data?.message ||
          "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {organization ? 'Edit Organization' : 'Create New Organization'}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {organization
                ? 'Update organization details'
                : 'Add a new organization to the platform'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]"
        >
          <div className="space-y-6">
            {/* ... existing org fields remain unchanged ... */}
            {/* Organization basic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Organization Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2.5 bg-gray-900 border ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                  placeholder="Enter organization name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Domain</label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="example.com"
                />
              </div>
            </div>

            {/* Industry / size / status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                <input
                  type="text"
                  value={formData.industry_type}
                  onChange={(e) => setFormData({ ...formData, industry_type: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="e.g., Technology"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Size</label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            {/* Description / email / address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Short description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Organization Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2.5 bg-gray-900 border ${
                    errors.organization_email ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                  placeholder="organization@example.com"
                />
                {errors.organization_email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.organization_email}</span>
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Organization Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            {/* Address fields (country / state / city) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Pincode / Organization logo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Pincode</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Organization Logo (URL or filename)</label>
                <input
                  type="text"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="logo.png or https://..."
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Organization Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, organization_logo: e.target.files?.[0] || null })}
                  className="block w-full text-sm text-gray-300 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {organization?.organization_logo && !formData.organization_logo && (
                  <p className="text-xs text-gray-500 mt-1">Current logo: {organization.organization_logo}</p>
                )}
              </div> */}
            </div>

            {/* 🔧 Admin assignment section only visible for existing orgs */}
            {organization ? (
              <div className="border-t border-gray-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Admin Assignment</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {canAssignAdmin
                        ? 'Assign one admin to this organization'
                        : 'Only one admin can be assigned per organization'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={assignAdmin}
                      onChange={(e) => setAssignAdmin(e.target.checked)}
                      disabled={!canAssignAdmin}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#6b46c1] peer-checked:to-[#d53f8c] peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                  </label>
                </div>

                {!canAssignAdmin && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-300">Admin Limit Reached</p>
                        <p className="text-xs text-yellow-400/80 mt-1">
                          Another organization already has an admin assigned. Each organization
                          can only have one admin.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {assignAdmin && canAssignAdmin && (
                <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700">

                  {/* Admin Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Admin Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.admin_name}
                      onChange={(e) => setFormData({ ...formData, admin_name: e.target.value })}
                      className={`w-full px-4 py-2.5 bg-gray-900 border ${
                        errors.admin_name ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="Enter admin full name"
                    />
                    {errors.admin_name && (
                      <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.admin_name}</span>
                      </p>
                    )}
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select a role</option>
                      {roles.map((role) => (
                        <option key={role.role_id} value={role.role_id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Admin Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Admin Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.admin_email}
                        onChange={(e) => setFormData({ ...formData, admin_email: e.target.value })}
                        className={`w-full px-4 py-2.5 bg-gray-900 border ${
                          errors.admin_email ? 'border-red-500' : 'border-gray-700'
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                        placeholder="admin@example.com"
                      />
                      {errors.admin_email && (
                        <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.admin_email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Admin Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.admin_phone}
                        onChange={(e) => setFormData({ ...formData, admin_phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Admin Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Admin Password{' '}
                      {organization?.admin ? (
                        <span className="text-xs text-gray-400">(leave blank to keep)</span>
                      ) : (
                        <span className="text-red-400">*</span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.admin_password}
                        onChange={(e) => setFormData({ ...formData, admin_password: e.target.value })}
                        className={`w-full px-4 py-2.5 bg-gray-900 border ${
                          errors.admin_password ? 'border-red-500' : 'border-gray-700'
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10`}
                        placeholder={
                          organization?.admin
                            ? 'Leave blank to keep existing password'
                            : 'Set admin password'
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.admin_password && (
                      <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.admin_password}</span>
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-4 py-2.5 bg-gray-900 border ${
                          errors.confirm_password ? 'border-red-500' : 'border-gray-700'
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10`}
                        placeholder="Re-enter admin password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirm_password && (
                      <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.confirm_password}</span>
                      </p>
                    )}
                  </div>

                  {/* Profile Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Profile Image (URL or filename)
                    </label>
                    <input
                      type="text"
                      value={formData.profile_image}
                      onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="avatar.png or https://..."
                    />
                  </div>
                </div>
              )}

              </div>
            ) : (
              // 🔧 Show hint message when creating a new org
              <div className="border-t border-gray-700 pt-6 text-sm text-gray-400 italic">
                You can assign an admin after the organization is created.
              </div>
            )}
          </div>
        </form>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-700 bg-gray-900/50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] hover:from-[#5a3ba1] hover:to-[#b33670] text-white rounded-lg transition-all font-medium shadow-lg shadow-purple-500/30"
          >
            {organization ? 'Update Organization' : 'Create Organization'}
          </button>
        </div>
      </div>
    </div>
  );
}
