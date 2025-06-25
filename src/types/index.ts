// Tipos principales de la aplicación

export interface Property {
  id: number;
  title: string;
  type: PropertyType;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  featured: boolean;
  description?: string;
  amenities?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type PropertyType = 'departamento' | 'casa' | 'penthouse' | 'loft' | 'oficina' | 'terreno';

export interface Agent {
  id: number;
  name: string;
  specialty: string;
  image: string;
  email?: string;
  phone?: string;
  experience?: number;
  properties?: Property[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  favorites?: Property[];
  createdAt: Date;
}

export type UserRole = 'user' | 'agent' | 'admin';

export interface SearchFilters {
  location?: string;
  propertyType?: PropertyType;
  priceRange?: string;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
}

export interface SearchResult {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
}

// Tipos para formularios
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PropertyForm {
  title: string;
  type: PropertyType;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  amenities: string[];
}

// Tipos para componentes UI
export interface ToastProps {
  title: string;
  description?: string;
  duration?: number;
  variant?: 'default' | 'destructive' | 'success';
}

export interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Tipos para API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 