import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { 
  allInfrastructure, 
  InfrastructureItem,
  siteRecommendations 
} from '@/data/hydrogenInfrastructure';

// Simple fallback map component
const SimpleMapView: React.FC<{ selectedLayers: string[]; showRecommendations: boolean }> = ({ 
  selectedLayers, 
  showRecommendations 
}) => {
  const [filteredInfrastructure, setFilteredInfrastructure] = useState<InfrastructureItem[]>([]);

  useEffect(() => {
    const filtered = allInfrastructure.filter(item => 
      selectedLayers.includes(item.type)
    );
    setFilteredInfrastructure(filtered);
  }, [selectedLayers]);

  const getTypeIcon = (type: InfrastructureItem['type']) => {
    const icons = {
      plant: '🏭',
      storage: '🛢️',
      pipeline: '🔗',
      renewable: '⚡',
      demand: '🏢',
      transport: '🚛'
    };
    return icons[type];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'under-construction': return 'bg-yellow-100 text-yellow-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-blue-200 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white/80 backdrop-blur-sm rounded-t-lg border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            🇮🇳 Green Hydrogen Infrastructure - India
          </h3>
          <div className="flex gap-2">
            <Badge className="bg-green-100 text-green-800">
              {filteredInfrastructure.length} facilities
            </Badge>
            {showRecommendations && (
              <Badge className="bg-blue-100 text-blue-800">
                ⭐ {siteRecommendations.length} AI recommendations
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Map Alternative - List View */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-3 max-h-full">
          {/* Infrastructure Items */}
          {filteredInfrastructure.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-2xl">{getTypeIcon(item.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 truncate">
                        {item.name}
                      </h4>
                      {item.company && (
                        <p className="text-xs text-gray-600 mt-1">{item.company}</p>
                      )}
                      <div className="flex gap-4 mt-2 text-xs">
                        {item.capacity && (
                          <span className="text-green-600 font-medium">{item.capacity}</span>
                        )}
                        {item.investment && (
                          <span className="text-blue-600 font-medium">{item.investment}</span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Site Recommendations */}
          {showRecommendations && (
            <>
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  🎯 AI Site Recommendations
                </h4>
              </div>
              {siteRecommendations.map((site) => (
                <Card key={site.id} className="bg-gradient-to-r from-green-50 to-blue-50 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-2xl">⭐</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-900">{site.name}</h4>
                          <div className="flex gap-4 mt-2 text-xs">
                            <span className="text-green-600 font-medium">{site.potentialCapacity}</span>
                            <span className="text-blue-600 font-medium">{site.estimatedCost}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">{site.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Score: {site.score}/10
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          {/* Empty State */}
          {filteredInfrastructure.length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-gray-500">Select infrastructure layers to view facilities</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <div className="p-3 bg-white/80 backdrop-blur-sm rounded-b-lg border-t text-center">
        <p className="text-xs text-gray-500">
          💡 Interactive map visualization - showing India's green hydrogen infrastructure
        </p>
      </div>
    </div>
  );
};

interface HydrogenMapProps {
  selectedLayers: string[];
  showRecommendations: boolean;
}

const HydrogenMap: React.FC<HydrogenMapProps> = ({ selectedLayers, showRecommendations }) => {
  return (
    <SimpleMapView 
      selectedLayers={selectedLayers} 
      showRecommendations={showRecommendations} 
    />
  );
};

export default HydrogenMap;