import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  allInfrastructure, 
  InfrastructureItem,
  siteRecommendations 
} from '@/data/hydrogenInfrastructure';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface OpenStreetMapProps {
  selectedLayers: string[];
  showRecommendations: boolean;
}

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({ selectedLayers, showRecommendations }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  // Create custom icons for different infrastructure types
  const createCustomIcon = (type: InfrastructureItem['type'], status: string) => {
    const typeConfig = {
      plant: { color: '#166534', symbol: '🏭' },
      storage: { color: '#1e3a8a', symbol: '🛢️' },
      pipeline: { color: '#0891b2', symbol: '🔗' },
      renewable: { color: '#16a34a', symbol: '⚡' },
      demand: { color: '#dc2626', symbol: '🏢' },
      transport: { color: '#7c3aed', symbol: '🚛' }
    };

    const statusColors = {
      operational: '#22c55e',
      'under-construction': '#f59e0b',
      planned: '#3b82f6'
    };

    const config = typeConfig[type];
    const borderColor = statusColors[status as keyof typeof statusColors] || '#6b7280';

    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background: ${config.color};
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 3px solid ${borderColor};
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          font-size: 16px;
        ">
          ${config.symbol}
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18]
    });
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      // Create map centered on India
      map.current = L.map(mapContainer.current, {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: true,
        attributionControl: true
      });

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 3
      }).addTo(map.current);

      // Add custom controls
      const CustomControl = L.Control.extend({
        onAdd: function() {
          const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
          div.innerHTML = `
            <div style="
              background: white;
              padding: 8px 12px;
              border-radius: 4px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              font-size: 12px;
              font-weight: 600;
              color: #166534;
            ">
              🇮🇳 Green Hydrogen Infrastructure
            </div>
          `;
          return div;
        }
      });
      
      new CustomControl({ position: 'topleft' }).addTo(map.current);

      setIsMapReady(true);
      console.log('✅ OpenStreetMap initialized successfully');

    } catch (error) {
      console.error('❌ Error initializing map:', error);
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when selectedLayers or showRecommendations change
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      map.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Filter infrastructure based on selected layers
    const filteredInfrastructure = allInfrastructure.filter(item => 
      selectedLayers.includes(item.type)
    );

    // Add infrastructure markers
    filteredInfrastructure.forEach(item => {
      if (!map.current) return;

      const marker = L.marker([item.lat, item.lng], {
        icon: createCustomIcon(item.type, item.status)
      });

      // Create popup content
      const popupContent = `
        <div style="min-width: 250px;">
          <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px;">
            <h3 style="font-size: 14px; font-weight: 600; color: #166534; margin: 0 0 4px 0;">
              ${item.name}
            </h3>
            ${item.company ? `<p style="font-size: 12px; color: #6b7280; margin: 0;">${item.company}</p>` : ''}
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
            ${item.capacity ? `
              <div>
                <span style="font-size: 11px; color: #374151; font-weight: 500;">Capacity:</span>
                <div style="font-size: 12px; color: #16a34a; font-weight: 600;">${item.capacity}</div>
              </div>
            ` : ''}
            ${item.investment ? `
              <div>
                <span style="font-size: 11px; color: #374151; font-weight: 500;">Investment:</span>
                <div style="font-size: 12px; color: #1e3a8a; font-weight: 600;">${item.investment}</div>
              </div>
            ` : ''}
          </div>
          
          <div style="margin-bottom: 8px;">
            <span style="
              background: ${item.status === 'operational' ? '#22c55e' : item.status === 'under-construction' ? '#f59e0b' : '#3b82f6'};
              color: white;
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 500;
            ">
              ${item.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          
          ${item.description ? `
            <p style="font-size: 11px; color: #6b7280; line-height: 1.4; margin: 0;">
              ${item.description}
            </p>
          ` : ''}
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
      });

      marker.addTo(map.current);
      markersRef.current.push(marker);
    });

    // Add site recommendation markers
    if (showRecommendations) {
      siteRecommendations.forEach(site => {
        if (!map.current) return;

        const recommendationIcon = L.divIcon({
          className: 'recommendation-icon',
          html: `
            <div style="
              background: linear-gradient(135deg, #10b981, #16a34a);
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: 3px solid #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
              font-size: 18px;
              animation: pulse 2s infinite;
            ">
              ⭐
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
          popupAnchor: [0, -20]
        });

        const marker = L.marker([site.lat, site.lng], {
          icon: recommendationIcon
        });

        const popupContent = `
          <div style="min-width: 280px;">
            <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px;">
              <h3 style="font-size: 14px; font-weight: 600; color: #10b981; margin: 0 0 4px 0;">
                🎯 ${site.name}
              </h3>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 11px; color: #374151;">AI Score:</span>
                <span style="
                  background: #10b981;
                  color: white;
                  padding: 2px 8px;
                  border-radius: 12px;
                  font-size: 11px;
                  font-weight: 600;
                ">
                  ${site.score}/10
                </span>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
              <div>
                <span style="font-size: 11px; color: #374151; font-weight: 500;">Potential Capacity:</span>
                <div style="font-size: 12px; color: #16a34a; font-weight: 600;">${site.potentialCapacity}</div>
              </div>
              <div>
                <span style="font-size: 11px; color: #374151; font-weight: 500;">Est. Cost:</span>
                <div style="font-size: 12px; color: #1e3a8a; font-weight: 600;">${site.estimatedCost}</div>
              </div>
            </div>
            
            <p style="font-size: 11px; color: #6b7280; line-height: 1.4; margin: 0;">
              ${site.description}
            </p>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 320,
          className: 'recommendation-popup'
        });

        marker.addTo(map.current);
        markersRef.current.push(marker);
      });
    }

    console.log(`📍 Added ${markersRef.current.length} markers to map`);
  }, [selectedLayers, showRecommendations, isMapReady]);

  return (
    <div className="h-full w-full relative">
      <div 
        ref={mapContainer} 
        className="h-full w-full rounded-lg border border-hydrogen-accent/20"
        style={{ minHeight: '400px' }}
      />
      
      {/* Map loading overlay */}
      {!isMapReady && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hydrogen-accent mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}

      {/* Map legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border text-xs">
        <h4 className="font-semibold mb-2 text-hydrogen-primary">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Operational</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Under Construction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Planned</span>
          </div>
          {showRecommendations && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
              <span>AI Recommendations</span>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px !important;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        .leaflet-popup-tip {
          background: white !important;
        }
        .recommendation-popup .leaflet-popup-content-wrapper {
          background: linear-gradient(135deg, #f0fdf4, #ecfdf5) !important;
          border: 1px solid #10b981 !important;
        }
      `}</style>
    </div>
  );
};

export default OpenStreetMap;