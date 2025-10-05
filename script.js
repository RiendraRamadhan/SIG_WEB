// Inisialisasi peta
var map = L.map('map').setView([-0.5, 117.15], 12);

// Basemap
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Tambahkan layer administrasi
fetch('qgis2web_2025_10_05_21_59_36_608814/ADMINISTRASIKECAMATAN.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: { color: "#333", weight: 1, fillOpacity: 0.2 }
    }).addTo(map);
  });

// Tambahkan layer permukiman
fetch('qgis2web_2025_10_05_21_59_36_608814/PEMUKIMAN.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: { color: "#f39c12", fillColor: "#f1c40f", fillOpacity: 0.5 }
    }).addTo(map);
  });

// Tambahkan layer gardu listrik
fetch('qgis2web_2025_10_05_21_59_36_608814/GARDULISTRIKPT.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: "red",
          color: "#fff",
          weight: 1,
          fillOpacity: 0.9
        }).bindPopup(`
          <b>Nama Gardu:</b> ${feature.properties.Nama_Gardu || '-'}<br>
          <b>Kapasitas:</b> ${feature.properties.Kapasitas || '-'}<br>
          <b>Kecamatan:</b> ${feature.properties.Kecamatan || '-'}
        `);
      }
    }).addTo(map);
  });

// Tambahkan heatmap
fetch('qgis2web_2025_10_05_21_59_36_608814/heatmapbackground.geojson')
  .then(res => res.json())
  .then(data => {
    const heatPoints = data.features.map(f => [
      f.geometry.coordinates[1],
      f.geometry.coordinates[0],
      1
    ]);
    L.heatLayer(heatPoints, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);
  });
