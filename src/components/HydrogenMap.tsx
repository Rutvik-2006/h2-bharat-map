import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  allInfrastructure, 
  InfrastructureItem,
  siteRecommendations 
} from '@/data/hydrogenInfrastructure';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Factory, Zap, Fuel, Building2, Truck, MapPin } from 'lucide-react';

// Custom icon creation function
const createCustomIcon = (color: string, iconType: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <div style="color: white; font-size: 12px; font-weight: bold;">
          ${iconType}
        </div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

// Icon mapping
const getIcon = (type: InfrastructureItem['type']) => {
  const iconConfig = {
    plant: { color: '#166534', symbol: '🏭' },
    storage: { color: '#1e3a8a', symbol: '🛢️' },
    pipeline: { color: '#0891b2', symbol: '🔗' },
    renewable: { color: '#16a34a', symbol: '⚡' },
    demand: { color: '#dc2626', symbol: '🏢' },
    transport: { color: '#7c3aed', symbol: '🚛' }
  };
  
  const config = iconConfig[type];
  return createCustomIcon(config.color, config.symbol);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational': return 'bg-hydrogen-success';
    case 'under-construction': return 'bg-hydrogen-warning';
    case 'planned': return 'bg-muted';
    default: return 'bg-muted';
  }
};

interface HydrogenMapProps {
  selectedLayers: string[];
  showRecommendations: boolean;
}

const HydrogenMap: React.FC<HydrogenMapProps> = ({ selectedLayers, showRecommendations }) => {
  const [filteredInfrastructure, setFilteredInfrastructure] = useState<InfrastructureItem[]>([]);

  useEffect(() => {
    const filtered = allInfrastructure.filter(item => 
      selectedLayers.includes(item.type)
    );
    setFilteredInfrastructure(filtered);
  }, [selectedLayers]);

  // Center map on India
  const indiaCenter: [number, number] = [20.5937, 78.9629];

  // Pipeline routes (simplified for demo)
  const pipelineRoutes: [number, number][][] = [
    // Gujarat to Maharashtra corridor
    [[22.4707, 70.0577], [19.0760, 72.8777]],
    // Eastern network
    [[22.5726, 88.3639], [20.2961, 85.8245]]
  ];

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={indiaCenter}
        zoom={5}
        className="h-full w-full rounded-lg"
        style={{ background: '#f8fafc' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Infrastructure markers */}
        {filteredInfrastructure.map((item) => (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={getIcon(item.type)}
          >
            <Popup className="custom-popup">
              <Card className="w-64 border-0 shadow-none">
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-sm text-foreground">{item.name}</h3>
                      <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    {item.company && (
                      <p className="text-xs text-muted-foreground">{item.company}</p>
                    )}
                    
                    {item.capacity && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium">Capacity:</span>
                        <span className="text-xs text-hydrogen-accent">{item.capacity}</span>
                      </div>
                    )}
                    
                    {item.investment && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium">Investment:</span>
                        <span className="text-xs text-hydrogen-secondary">{item.investment}</span>
                      </div>
                    )}
                    
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-2">{item.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Popup>
          </Marker>
        ))}

        {/* Pipeline routes */}
        {selectedLayers.includes('pipeline') && pipelineRoutes.map((route, index) => (
          <Polyline
            key={`pipeline-${index}`}
            positions={route}
            color="#0891b2"
            weight={4}
            opacity={0.8}
            dashArray="10, 10"
          />
        ))}

        {/* Site recommendations */}
        {showRecommendations && siteRecommendations.map((site) => (
          <Marker
            key={site.id}
            position={[site.lat, site.lng]}
            icon={createCustomIcon('#10b981', '⭐')}
          >
            <Popup>
              <Card className="w-72 border-0 shadow-none">
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-foreground">{site.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">Score:</span>
                      <Badge className="bg-hydrogen-success text-white">{site.score}/10</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-medium">Capacity:</span>
                        <br />
                        <span className="text-hydrogen-accent">{site.potentialCapacity}</span>
                      </div>
                      <div>
                        <span className="font-medium">Est. Cost:</span>
                        <br />
                        <span className="text-hydrogen-secondary">{site.estimatedCost}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-2">{site.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HydrogenMap;