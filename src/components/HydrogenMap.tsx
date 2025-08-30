import React, { useState, useEffect } from 'react';
import OpenStreetMap from './OpenStreetMap';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  allInfrastructure, 
  InfrastructureItem,
  siteRecommendations 
} from '@/data/hydrogenInfrastructure';

console.log('✅ HydrogenMap component loaded with OpenStreetMap');

interface HydrogenMapProps {
  selectedLayers: string[];
  showRecommendations: boolean;
}

const HydrogenMap: React.FC<HydrogenMapProps> = ({ selectedLayers, showRecommendations }) => {
  console.log('🗺️ Rendering HydrogenMap with OpenStreetMap, layers:', selectedLayers);
  
  return (
    <div className="h-full w-full">
      <OpenStreetMap 
        selectedLayers={selectedLayers} 
        showRecommendations={showRecommendations} 
      />
    </div>
  );
};

export default HydrogenMap;