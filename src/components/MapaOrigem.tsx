"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Nomes e locais regionalizados simulando produtores reais de Cabo Verde e arredores
const APIARIOS = [
  {
    name: "Família Dias",
    local: "Distrito de São Bartolomeu",
    lat: -21.4385,
    lon: -46.4012,
    type: "Floração Silvestre",
    color: "#E8A93B",
  },
  {
    name: "Apiário Serra dos Lemes",
    local: "Serra dos Lemes",
    lat: -21.4520,
    lon: -46.3350,
    type: "Mata de Eucalipto",
    color: "#7A9A63",
  },
  {
    name: "João Batista & Filhos",
    local: "Bairro Córrego do Ouro",
    lat: -21.5110,
    lon: -46.3680,
    type: "Pomar de Laranjeira",
    color: "#C9832B",
  },
  {
    name: "Reserva Alto da Serra",
    local: "Mata do Cedro",
    lat: -21.4850,
    lon: -46.4150,
    type: "Mata Nativa (Cipó-uva)",
    color: "#8A5A1E",
  },
];

export default function MapaOrigem() {
  const centroCaboVerde: [number, number] = [-21.4722, -46.3986];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#E8A93B]/20 shadow-[0_0_40px_rgba(232,169,59,0.1)] h-[440px] w-full z-10">
      <style jsx global>{`
        /* TRUQUE NINJA: Inverte as cores do mapa claro gratuito para virar Dark Mode */
        .leaflet-tile-pane {
          filter: invert(100%) hue-rotate(180deg) brightness(85%) contrast(110%);
        }

        .leaflet-tooltip.dark-tooltip {
          background-color: #140d06 !important;
          border: 1px solid rgba(232, 169, 59, 0.3) !important;
          color: #f7ecd3 !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
          font-family: inherit !important;
        }
        .leaflet-tooltip-top:before {
          border-top-color: #140d06 !important;
        }
        .leaflet-control-zoom a {
          background-color: #140d06 !important;
          color: #e8a93b !important;
          border-color: rgba(232, 169, 59, 0.2) !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: #2a1b0e !important;
          color: #f3ce84 !important;
        }
        .leaflet-container {
          background-color: #140d06 !important;
        }
      `}</style>

      <MapContainer
        center={centroCaboVerde}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        {/* Mapa padrão gratuito do OpenStreetMap (sem frescura de API Key) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        {APIARIOS.map((p, i) => (
          <CircleMarker
            key={i}
            center={[p.lat, p.lon]}
            radius={9}
            pathOptions={{
              color: p.color,
              fillColor: p.color,
              fillOpacity: 0.8,
              weight: 2,
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -10]}
              opacity={1}
              className="dark-tooltip"
            >
              <div className="text-xs">
                <span className="font-bold text-[#E8A93B] block uppercase tracking-wider text-[10px]">
                  {p.type}
                </span>
                <span className="font-semibold text-white block text-[13px]">
                  {p.name}
                </span>
                <span className="text-[#A8987A] text-[11px]">{p.local}</span>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}