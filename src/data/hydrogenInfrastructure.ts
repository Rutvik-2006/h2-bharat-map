// Sample Green Hydrogen Infrastructure Data for India

export interface InfrastructureItem {
  id: string;
  name: string;
  type: 'plant' | 'storage' | 'pipeline' | 'renewable' | 'demand' | 'transport';
  lat: number;
  lng: number;
  capacity?: string;
  status: 'operational' | 'under-construction' | 'planned';
  investment?: string; // in INR Crores
  company?: string;
  description?: string;
}

export const hydrogenPlants: InfrastructureItem[] = [
  {
    id: 'plant-1',
    name: 'Reliance Jamnagar Green Hydrogen Hub',
    type: 'plant',
    lat: 22.4707,
    lng: 70.0577,
    capacity: '1 MTPA',
    status: 'under-construction',
    investment: '₹75,000 Cr',
    company: 'Reliance Industries',
    description: 'World\'s largest integrated green hydrogen hub'
  },
  {
    id: 'plant-2',
    name: 'Adani Green Hydrogen Plant',
    type: 'plant',
    lat: 23.0225,
    lng: 72.5714,
    capacity: '1 MTPA',
    status: 'planned',
    investment: '₹70,000 Cr',
    company: 'Adani Green Energy',
    description: 'Integrated green hydrogen and ammonia plant'
  },
  {
    id: 'plant-3',
    name: 'NTPC Andhra Pradesh Green Hydrogen Hub',
    type: 'plant',
    lat: 15.9129,
    lng: 79.7400,
    capacity: '0.5 MTPA',
    status: 'under-construction',
    investment: '₹35,000 Cr',
    company: 'NTPC Limited',
    description: 'Coastal green hydrogen manufacturing facility'
  },
  {
    id: 'plant-4',
    name: 'ONGC Mundra Green Hydrogen Plant',
    type: 'plant',
    lat: 22.8367,
    lng: 69.7215,
    capacity: '0.3 MTPA',
    status: 'planned',
    investment: '₹25,000 Cr',
    company: 'ONGC',
    description: 'Green hydrogen for petrochemical applications'
  }
];

export const storagefacilities: InfrastructureItem[] = [
  {
    id: 'storage-1',
    name: 'Kandla Port Hydrogen Storage',
    type: 'storage',
    lat: 23.0186,
    lng: 70.2200,
    capacity: '10,000 MT',
    status: 'planned',
    investment: '₹500 Cr',
    description: 'Strategic hydrogen storage for export'
  },
  {
    id: 'storage-2',
    name: 'Mumbai Underground H2 Storage',
    type: 'storage',
    lat: 19.0760,
    lng: 72.8777,
    capacity: '5,000 MT',
    status: 'under-construction',
    investment: '₹800 Cr',
    description: 'Underground salt cavern storage facility'
  },
  {
    id: 'storage-3',
    name: 'Chennai Port Hydrogen Terminal',
    type: 'storage',
    lat: 13.0827,
    lng: 80.2707,
    capacity: '7,500 MT',
    status: 'planned',
    investment: '₹600 Cr',
    description: 'Import-export hydrogen terminal'
  }
];

export const renewableEnergy: InfrastructureItem[] = [
  {
    id: 'solar-1',
    name: 'Rajasthan Solar Park',
    type: 'renewable',
    lat: 27.0238,
    lng: 74.2179,
    capacity: '2,000 MW',
    status: 'operational',
    investment: '₹12,000 Cr',
    description: 'Dedicated solar power for green hydrogen'
  },
  {
    id: 'wind-1',
    name: 'Gujarat Offshore Wind Farm',
    type: 'renewable',
    lat: 22.2587,
    lng: 68.9678,
    capacity: '3,000 MW',
    status: 'under-construction',
    investment: '₹18,000 Cr',
    description: 'Offshore wind energy for hydrogen production'
  },
  {
    id: 'solar-2',
    name: 'Karnataka Solar Complex',
    type: 'renewable',
    lat: 15.3173,
    lng: 75.7139,
    capacity: '1,500 MW',
    status: 'operational',
    investment: '₹9,000 Cr',
    description: 'Solar park with hydrogen electrolyzer integration'
  }
];

export const demandCenters: InfrastructureItem[] = [
  {
    id: 'demand-1',
    name: 'Tata Steel Jamshedpur',
    type: 'demand',
    lat: 22.8046,
    lng: 86.2029,
    capacity: '50,000 MT/year',
    status: 'operational',
    company: 'Tata Steel',
    description: 'Green steel production using hydrogen'
  },
  {
    id: 'demand-2',
    name: 'IOCL Mathura Refinery',
    type: 'demand',
    lat: 27.4924,
    lng: 77.6737,
    capacity: '75,000 MT/year',
    status: 'operational',
    company: 'Indian Oil Corporation',
    description: 'Petroleum refining with green hydrogen'
  },
  {
    id: 'demand-3',
    name: 'Coromandel Fertilizers',
    type: 'demand',
    lat: 17.3850,
    lng: 78.4867,
    capacity: '30,000 MT/year',
    status: 'operational',
    company: 'Coromandel International',
    description: 'Ammonia and fertilizer production'
  }
];

export const transportHubs: InfrastructureItem[] = [
  {
    id: 'transport-1',
    name: 'Mumbai Hydrogen Fuel Station',
    type: 'transport',
    lat: 19.0760,
    lng: 72.8777,
    capacity: '1,000 kg/day',
    status: 'planned',
    investment: '₹50 Cr',
    description: 'Hydrogen refueling for public transport'
  },
  {
    id: 'transport-2',
    name: 'Delhi NCR Hydrogen Hub',
    type: 'transport',
    lat: 28.7041,
    lng: 77.1025,
    capacity: '2,000 kg/day',
    status: 'under-construction',
    investment: '₹75 Cr',
    description: 'Multi-modal hydrogen distribution center'
  }
];

export const pipelineProjects: InfrastructureItem[] = [
  {
    id: 'pipeline-1',
    name: 'West Coast Hydrogen Corridor',
    type: 'pipeline',
    lat: 21.7679,
    lng: 72.1519,
    capacity: '1,000 km',
    status: 'planned',
    investment: '₹15,000 Cr',
    description: 'Gujarat to Maharashtra hydrogen pipeline'
  },
  {
    id: 'pipeline-2',
    name: 'Eastern Hydrogen Network',
    type: 'pipeline',
    lat: 22.5726,
    lng: 88.3639,
    capacity: '800 km',
    status: 'planned',
    investment: '₹12,000 Cr',
    description: 'Kolkata to Bhubaneswar hydrogen transmission'
  }
];

export const allInfrastructure: InfrastructureItem[] = [
  ...hydrogenPlants,
  ...storagefacilities,
  ...renewableEnergy,
  ...demandCenters,
  ...transportHubs,
  ...pipelineProjects
];

export interface SiteRecommendation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  score: number;
  factors: {
    renewableAccess: number;
    demandProximity: number;
    transportConnectivity: number;
    landAvailability: number;
    regulatorySupport: number;
  };
  estimatedCost: string;
  potentialCapacity: string;
  description: string;
}

export const siteRecommendations: SiteRecommendation[] = [
  {
    id: 'rec-1',
    name: 'Rann of Kutch Green H2 Zone',
    lat: 23.7337,
    lng: 69.8597,
    score: 9.2,
    factors: {
      renewableAccess: 9.5,
      demandProximity: 8.0,
      transportConnectivity: 9.0,
      landAvailability: 10.0,
      regulatorySupport: 9.5
    },
    estimatedCost: '₹45,000 Cr',
    potentialCapacity: '2 MTPA',
    description: 'Optimal location with abundant solar/wind resources and port access'
  },
  {
    id: 'rec-2',
    name: 'Odisha Industrial Corridor',
    lat: 20.9517,
    lng: 85.0985,
    score: 8.7,
    factors: {
      renewableAccess: 8.0,
      demandProximity: 9.5,
      transportConnectivity: 8.5,
      landAvailability: 8.0,
      regulatorySupport: 9.5
    },
    estimatedCost: '₹35,000 Cr',
    potentialCapacity: '1.5 MTPA',
    description: 'High industrial demand with good infrastructure connectivity'
  }
];