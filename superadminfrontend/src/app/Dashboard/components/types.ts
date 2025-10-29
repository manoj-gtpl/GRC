export interface Organization {
  id: number;
  name: string;
  domain?: string;
  industry?: string;
  size?: 'small' | 'medium' | 'large';
  status?: 'active' | 'inactive';
  description?: string;
  organization_email: string;
  organization_address?: string;
  country?: string;
  state?: string;
  city?: string;
  pincode?: string;
  organization_logo?: string | File;
}
