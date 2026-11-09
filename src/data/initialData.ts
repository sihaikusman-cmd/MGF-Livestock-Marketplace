import { GoatListing, MetroBusiness } from '../types.ts';

import beetalImg from '../assets/images/goat_beetal_buck_1794223342487.jpg';
import jamunapariImg from '../assets/images/goat_jamunapari_female_1794223343264.jpg';
import barbariImg from '../assets/images/goat_barbari_dairy_1794223342809.jpg';
import sirohiImg from '../assets/images/goat_sirohi_pair_1794223343422.jpg';
import kotaImg from '../assets/images/goat_kota_buck_1794224515129.jpg';
import malwaImg from '../assets/images/goat_malwa_doe_1794224515656.jpg';
import gujriImg from '../assets/images/goat_gujri_livestock_1794224517210.jpg';
import bantamImg from '../assets/images/goat_bantam_ornamental_1794224516638.jpg';

export const INITIAL_DEMO_LISTINGS: GoatListing[] = [
  {
    id: "demo-beetal-1",
    title: "Purebred Beetal Breeder Buck",
    breed: "Beetal",
    age: "1.2 Years (2 Daant)",
    weight: "52 kg",
    price: 34000,
    city: "Mumbai",
    state: "Maharashtra",
    seller: "Haji Usman Qureshi",
    phone: "9820194820",
    whatsapp: "9820194820",
    description: "Heavy bone structure, long pendulous ears, active breeder buck. Fully vaccinated and dewormed with complete health record.",
    image: beetalImg,
    isDemo: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2
  },
  {
    id: "demo-jamunapari-2",
    title: "High Yield Jamunapari Female",
    breed: "Jamunapari",
    age: "1.8 Years",
    weight: "44 kg",
    price: 28500,
    city: "Pune",
    state: "Maharashtra",
    seller: "Sayyed Goat Farms",
    phone: "9890412355",
    whatsapp: "9890412355",
    description: "Pure white Jamunapari doe with prominent Roman nose. High daily milk yield lineage (2.5L+). Raised on green silage and lucerne.",
    image: jamunapariImg,
    isDemo: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4
  },
  {
    id: "demo-kota-5",
    title: "Heavy Weight Kota Dholpuri Buck",
    breed: "Kota",
    age: "1.5 Years (4 Daant)",
    weight: "58 kg",
    price: 36000,
    city: "Mumbai",
    state: "Maharashtra",
    seller: "Metro Agro Farms",
    phone: "9820543210",
    whatsapp: "9820543210",
    description: "Pure Kota breed buck with broad head, dark glossy coat, and curved horns. High weight gain rate, suitable for breeding or Qurbani.",
    image: kotaImg,
    isDemo: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5
  },
  {
    id: "demo-malwa-6",
    title: "Healthy Malwa Dairy Doe",
    breed: "Malwa",
    age: "1.3 Years",
    weight: "38 kg",
    price: 24000,
    city: "Thane",
    state: "Maharashtra",
    seller: "Irfan Patel",
    phone: "9167823419",
    whatsapp: "9167823419",
    description: "Hardy Malwa breed doe with gentle temperament, healthy coat, and consistent milk production. Pasture fed and fully dewormed.",
    image: malwaImg,
    isDemo: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6
  },
  {
    id: "demo-gujri-7",
    title: "Tall Spotted Gujri Breeder",
    breed: "Gujri",
    age: "1.8 Years",
    weight: "55 kg",
    price: 38000,
    city: "Pune",
    state: "Maharashtra",
    seller: "Suleman Dairy & Farms",
    phone: "9822340911",
    whatsapp: "9822340911",
    description: "Large-framed Rajasthan Gujri lineage with pendulous ears and characteristic white-brown speckles. High vitality and active breeder.",
    image: gujriImg,
    isDemo: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7
  },
  {
    id: "demo-bantam-8",
    title: "Compact Bantam Fancy Dwarf Goat",
    breed: "Bantam",
    age: "9 Months",
    weight: "18 kg",
    price: 21000,
    city: "Mumbai (Malad)",
    state: "Maharashtra",
    seller: "Metro Livestock",
    phone: "7738991736",
    whatsapp: "7738991736",
    description: "Extremely docile, ornamental miniature Bantam goat. Perfect for farmhouses, petting farms, or hobbyists. Friendly, playful, and low maintenance.",
    image: bantamImg,
    isDemo: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8
  },
  {
    id: "demo-barbari-3",
    title: "Spotted Barbari Dairy Pair",
    breed: "Barbari",
    age: "10 Months",
    weight: "26 kg",
    price: 18000,
    city: "Thane",
    state: "Maharashtra",
    seller: "Ramesh Patil",
    phone: "9167238491",
    whatsapp: "9167238491",
    description: "Very active, fast-growing Barbari goat. Ideal for stall-feeding setups. Clean brown-and-white spotted coat, healthy appetite.",
    image: barbariImg,
    isDemo: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9
  },
  {
    id: "demo-sirohi-4",
    title: "Prime Sirohi Heavy Buck",
    breed: "Sirohi",
    age: "2 Years",
    weight: "68 kg",
    price: 42000,
    city: "Kalyan",
    state: "Maharashtra",
    seller: "Farhan Khan",
    phone: "9769382104",
    whatsapp: "9769382104",
    description: "Large frame Rajasthan Sirohi bloodline, excellent for Qurbani or breed improvement. Fed on dry grains and mineral supplements.",
    image: sirohiImg,
    isDemo: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10
  }
];

export const METRO_BUSINESSES: MetroBusiness[] = [
  {
    id: "metro-fast-food",
    name: "Metro Fast Food",
    tagline: "Quality Taste & Fast Service",
    address: "Shop 3/4, Chaitali Bldg, Malad (W), Mumbai",
    phones: ["+91 89769 34664", "+91 89769 34665"],
    description: "Serving delicious quick bites, rolls, burgers, and refreshments with fast delivery across Malad and surrounding suburbs.",
    category: "Food & Dining"
  },
  {
    id: "metro-estate",
    name: "Metro Estate Consultant",
    tagline: "Real Estate & Contracting Services",
    address: "Malad (W), Mumbai, Maharashtra",
    phones: ["+91 98691 46994", "+91 93234 67550"],
    description: "Specializing in residential, commercial property advisory, leases, title verification, and civil contracting works in Mumbai Western Suburbs.",
    category: "Real Estate"
  },
  {
    id: "metro-banquets",
    name: "Metro Banquets",
    tagline: "Air-Conditioned Hall for Grand Occasions",
    address: "Malad (W), Mumbai, Maharashtra",
    phones: ["+91 98691 46994", "+91 73036 72664"],
    description: "Spacious air-conditioned banquet hall equipped for weddings, walimas, engagement ceremonies, birthday parties, and corporate conferences.",
    category: "Event Venue"
  }
];

export const AVAILABLE_BREEDS = [
  "Beetal",
  "Jamunapari",
  "Barbari",
  "Sirohi",
  "Kota",
  "Malwa",
  "Gujri",
  "Bantam",
  "Osmanabadi",
  "Sojat",
  "Other"
];

export const MUMBAI_LOCATIONS = [
  "Mumbai",
  "Malad",
  "Andheri",
  "Bandra",
  "Borivali",
  "Thane",
  "Kalyan",
  "Navi Mumbai",
  "Pune",
  "Nashik"
];
