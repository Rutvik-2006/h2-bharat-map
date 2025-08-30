import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  allInfrastructure, 
  InfrastructureItem,
  siteRecommendations 
} from '@/data/hydrogenInfrastructure';

console.log('✅ HydrogenMap component loaded - NO LEAFLET');

interface HydrogenMapProps {
  selectedLayers: string[];
  showRecommendations: boolean;
}

const HydrogenMap: React.FC<HydrogenMapProps> = ({ selectedLayers, showRecommendations }) => {
  const [filteredInfrastructure, setFilteredInfrastructure] = useState<InfrastructureItem[]>([]);

  console.log('🔧 Rendering HydrogenMap with layers:', selectedLayers);

  useEffect(() => {
    const filtered = allInfrastructure.filter(item => 
      selectedLayers.includes(item.type)
    );
    setFilteredInfrastructure(filtered);
    console.log('📊 Filtered infrastructure:', filtered.length, 'items');
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
      case 'operational': return 'bg-green-500 text-white';
      case 'under-construction': return 'bg-yellow-500 text-white';
      case 'planned': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-hydrogen-primary/5 to-hydrogen-accent/5 rounded-lg border flex flex-col overflow-hidden">
      {/* Success Header */}
      <div className="p-4 bg-white border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-hydrogen-primary flex items-center gap-2">
            ✅ 🇮🇳 Green Hydrogen Infrastructure - India
          </h3>
          <div className="flex gap-2">
            <Badge className="bg-hydrogen-success text-white">
              {filteredInfrastructure.length} facilities
            </Badge>
            {showRecommendations && (
              <Badge className="bg-hydrogen-accent text-white">
                ⭐ {siteRecommendations.length} AI recommendations
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Infrastructure List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {/* Infrastructure Items */}
          {filteredInfrastructure.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-3xl p-2 bg-hydrogen-primary/10 rounded-full">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-hydrogen-primary text-base mb-1">
                        {item.name}
                      </h4>
                      {item.company && (
                        <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
                      )}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {item.capacity && (
                          <div>
                            <span className="font-medium text-hydrogen-accent">Capacity:</span>
                            <div className="text-hydrogen-secondary font-semibold">{item.capacity}</div>
                          </div>
                        )}
                        {item.investment && (
                          <div>
                            <span className="font-medium text-hydrogen-accent">Investment:</span>
                            <div className="text-hydrogen-secondary font-semibold">{item.investment}</div>
                          </div>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <Badge className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Site Recommendations */}
          {showRecommendations && siteRecommendations.length > 0 && (
            <>
              <div className="mt-6 pt-4 border-t border-hydrogen-accent/20">
                <h4 className="text-lg font-bold text-hydrogen-primary mb-4 flex items-center gap-2">
                  🎯 AI Site Recommendations
                </h4>
              </div>
              {siteRecommendations.map((site) => (
                <Card key={site.id} className="bg-gradient-to-r from-hydrogen-success/10 to-hydrogen-accent/10 border-hydrogen-accent/30 hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-3xl p-2 bg-hydrogen-success/20 rounded-full">⭐</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-hydrogen-primary text-base mb-1">{site.name}</h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-medium text-hydrogen-accent">Capacity:</span>
                              <div className="text-hydrogen-secondary font-semibold">{site.potentialCapacity}</div>
                            </div>
                            <div>
                              <span className="font-medium text-hydrogen-accent">Est. Cost:</span>
                              <div className="text-hydrogen-secondary font-semibold">{site.estimatedCost}</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{site.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-hydrogen-success text-white text-sm font-bold">
                        {site.score}/10
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          {/* Empty State */}
          {filteredInfrastructure.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-hydrogen-primary mb-2">
                Ready to Explore
              </h3>
              <p className="text-muted-foreground">
                Select infrastructure layers from the sidebar to view facilities
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Success Footer */}
      <div className="p-4 bg-hydrogen-primary/5 border-t text-center">
        <p className="text-sm text-hydrogen-secondary font-medium">
          ✅ Platform Active - Mapping India's Green Hydrogen Future
        </p>
      </div>
    </div>
  );
};

export default HydrogenMap;