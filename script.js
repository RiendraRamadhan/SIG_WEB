// Inisialisasi peta
var map = L.map('map').setView([-0.502, 117.153], 12);

// Basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Base URL GitHub Raw (root repo)
const baseURL = "https://raw.githubusercontent.com/RiendraRamadhan/SIG_WEB.github.io";

// ================== ADMINISTRASI ==================
fetch(baseURL + "ADMINISTRASIKECAMATAN.geojson")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: { color: "#2c3e50", weight: 1, fillOpacity: 0.05 }
    }).addTo(map);
  })
  .catch(err => console.error("Gagal memuat ADMINISTRASI:", err));

// ================== PERMUKIMAN ==================
fetch(baseURL + "PEMUKIMAN.geojson")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: { color: "#f39c12", fillColor: "#f1c40f", fillOpacity: 0.4 }
    }).addTo(map);
  })
  .catch(err => console.error("Gagal memuat PERMUKIMAN:", err));

// ================== GARDU LISTRIK ==================
fetch(baseURL + "GARDULISTRIKPT.geojson")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
        radius: 6,
        fillColor: "red",
        color: "#fff",
        weight: 1,
        fillOpacity: 0.9
      }).bindPopup(`
        <b>Nama Gardu:</b> ${feature.properties.Nama_Gardu || '-'}<br>
        <b>Kapasitas:</b> ${feature.properties.Kapasitas || '-'}<br>
        <b>Kecamatan:</b> ${feature.properties.Kecamatan || '-'}
      `)
    }).addTo(map);
  })
  .catch(err => console.error("Gagal memuat GARDULISTRIKPT:", err));

// ================== HEATMAP ==================
fetch(baseURL + "heatmapbackground.geojson")
  .then(res => res.json())
  .then(data => {
    const heatPoints = data.features.map(f => [
      f.geometry.coordinates[1],
      f.geometry.coordinates[0],
      1
    ]);
    L.heatLayer(heatPoints, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);
  })
  .catch(err => console.error("Gagal memuat HEATMAP:", err));

