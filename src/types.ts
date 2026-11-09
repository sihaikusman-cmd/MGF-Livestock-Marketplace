export interface GoatListing {
  id: string;
  title: string;
  breed: string;
  age: string;
  weight?: string;
  price: number;
  city: string;
  state: string;
  seller: string;
  phone: string;
  whatsapp?: string;
  description: string;
  image: string;
  isDemo?: boolean;
  createdAt: number;
}

export interface FilterState {
  search: string;
  breed: string;
  location: string;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

export interface MetroBusiness {
  id: string;
  name: string;
  tagline: string;
  address: string;
  phones: string[];
  description: string;
  category: string;
}
