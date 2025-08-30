import React, { useState } from 'react';
import HydrogenMap from './HydrogenMap';
import MapControls from './MapControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Settings, 
  Info, 
  Atom,
  MapIcon,
  BarChart3,
  Lightbulb
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedLayers, setSelectedLayers] = useState<string[]>([
    'plant', 'storage', 'renewable', 'demand'
  ]);
  const [showRecommendations, setShowRecommendations] = useState(true);

  const handleLayerChange = (layer: string, checked: boolean) => {
    if (checked) {
      setSelectedLayers([...selectedLayers, layer]);
    } else {
      setSelectedLayers(selectedLayers.filter(l => l !== layer));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-hydrogen-primary to-hydrogen-accent rounded-lg">
                <Atom className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Green Hydrogen Infrastructure
                </h1>
                <p className="text-sm text-muted-foreground">
                  Mapping & Optimization Platform - India
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className="bg-hydrogen-success text-white">
                Live Data
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* Sidebar Controls */}
          <div className="col-span-12 lg:col-span-3">
            <MapControls
              selectedLayers={selectedLayers}
              onLayerChange={handleLayerChange}
              showRecommendations={showRecommendations}
              onRecommendationsToggle={setShowRecommendations}
            />
          </div>

          {/* Main Map Area */}
          <div className="col-span-12 lg:col-span-9">
            <Card className="h-full shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapIcon className="h-5 w-5 text-hydrogen-accent" />
                    Interactive Infrastructure Map
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {selectedLayers.length} layers active
                    </Badge>
                    {showRecommendations && (
                      <Badge className="bg-hydrogen-success text-white text-xs">
                        <Lightbulb className="h-3 w-3 mr-1" />
                        AI Recommendations
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-2 h-[calc(100%-80px)]">
                <HydrogenMap
                  selectedLayers={selectedLayers}
                  showRecommendations={showRecommendations}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Insights Footer */}
        <div className="mt-6">
          <Card className="bg-gradient-to-r from-hydrogen-primary/10 to-hydrogen-accent/10">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-hydrogen-accent mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-2">Platform Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div>
                      <strong className="text-foreground">Infrastructure Mapping:</strong> Real-time visualization of hydrogen plants, storage facilities, and transport networks across India.
                    </div>
                    <div>
                      <strong className="text-foreground">Site Optimization:</strong> AI-powered recommendations for new infrastructure based on renewable energy access and demand patterns.
                    </div>
                    <div>
                      <strong className="text-foreground">Investment Analysis:</strong> Cost optimization and ROI projections for strategic infrastructure development.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;