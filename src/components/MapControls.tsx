import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Factory, Zap, Fuel, Building2, Truck, MapPin, Target, TrendingUp } from 'lucide-react';

interface MapControlsProps {
  selectedLayers: string[];
  onLayerChange: (layer: string, checked: boolean) => void;
  showRecommendations: boolean;
  onRecommendationsToggle: (show: boolean) => void;
}

const layerConfig = [
  {
    id: 'plant',
    name: 'Hydrogen Plants',
    icon: Factory,
    color: 'text-infrastructure-plant',
    count: 4
  },
  {
    id: 'storage',
    name: 'Storage Facilities',
    icon: Fuel,
    color: 'text-infrastructure-storage',
    count: 3
  },
  {
    id: 'pipeline',
    name: 'Pipeline Network',
    icon: MapPin,
    color: 'text-infrastructure-pipeline',
    count: 2
  },
  {
    id: 'renewable',
    name: 'Renewable Energy',
    icon: Zap,
    color: 'text-infrastructure-renewable',
    count: 3
  },
  {
    id: 'demand',
    name: 'Demand Centers',
    icon: Building2,
    color: 'text-infrastructure-demand',
    count: 3
  },
  {
    id: 'transport',
    name: 'Transport Hubs',
    icon: Truck,
    color: 'text-purple-600',
    count: 2
  }
];

const MapControls: React.FC<MapControlsProps> = ({
  selectedLayers,
  onLayerChange,
  showRecommendations,
  onRecommendationsToggle
}) => {
  const handleSelectAll = () => {
    const allLayers = layerConfig.map(layer => layer.id);
    allLayers.forEach(layer => {
      if (!selectedLayers.includes(layer)) {
        onLayerChange(layer, true);
      }
    });
  };

  const handleClearAll = () => {
    selectedLayers.forEach(layer => {
      onLayerChange(layer, false);
    });
  };

  return (
    <div className="space-y-4">
      {/* Layer Controls */}
      <Card className="shadow-infrastructure">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-hydrogen-accent" />
            Infrastructure Layers
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="text-xs"
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="text-xs"
            >
              Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {layerConfig.map((layer) => {
            const IconComponent = layer.icon;
            return (
              <div key={layer.id} className="flex items-center justify-between space-x-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={layer.id}
                    checked={selectedLayers.includes(layer.id)}
                    onCheckedChange={(checked) => 
                      onLayerChange(layer.id, checked as boolean)
                    }
                    className="data-[state=checked]:bg-hydrogen-accent data-[state=checked]:border-hydrogen-accent"
                  />
                  <label
                    htmlFor={layer.id}
                    className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                  >
                    <IconComponent className={`h-4 w-4 ${layer.color}`} />
                    {layer.name}
                  </label>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {layer.count}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Site Recommendations */}
      <Card className="shadow-infrastructure">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-hydrogen-success" />
            Site Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="recommendations" className="text-sm font-medium">
              Show AI Recommendations
            </label>
            <Switch
              id="recommendations"
              checked={showRecommendations}
              onCheckedChange={onRecommendationsToggle}
            />
          </div>
          {showRecommendations && (
            <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
              AI-powered site recommendations based on renewable energy access, demand proximity, and transport connectivity.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="shadow-infrastructure bg-gradient-to-br from-hydrogen-primary/5 to-hydrogen-accent/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-hydrogen-accent" />
            India H2 Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-center p-2 bg-background rounded border">
              <div className="font-semibold text-hydrogen-secondary">₹2.8L Cr</div>
              <div className="text-xs text-muted-foreground">Total Investment</div>
            </div>
            <div className="text-center p-2 bg-background rounded border">
              <div className="font-semibold text-hydrogen-accent">5.3 MTPA</div>
              <div className="text-xs text-muted-foreground">Target Capacity</div>
            </div>
            <div className="text-center p-2 bg-background rounded border">
              <div className="font-semibold text-infrastructure-renewable">8.5 GW</div>
              <div className="text-xs text-muted-foreground">Renewable Power</div>
            </div>
            <div className="text-center p-2 bg-background rounded border">
              <div className="font-semibold text-infrastructure-demand">15+</div>
              <div className="text-xs text-muted-foreground">Major Projects</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapControls;