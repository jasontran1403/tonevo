import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import { data } from "../assets/data"; // Import the geojson file
import earth1 from "../assets/earth-blue-marble.jpg";
import earthday from "../assets/earth-day.jpg";
import earth2 from "../assets/earth-topology.png";

const cities = [
  { name: "Tokyo", lat: 35.682839, lng: 139.759455 },
  { name: "New York", lat: 40.712776, lng: -74.005974 },
  { name: "London", lat: 51.507351, lng: -0.127758 },
  { name: "Paris", lat: 48.856613, lng: 2.352222 },
  { name: "Sydney", lat: -33.868819, lng: 151.209295 },
  { name: "São Paulo", lat: -23.55052, lng: -46.633308 },
  { name: "Mumbai", lat: 19.07609, lng: 72.877426 },
  { name: "Beijing", lat: 39.904202, lng: 116.407394 },
  { name: "Moscow", lat: 55.755825, lng: 37.617298 },
  { name: "Cairo", lat: 30.04442, lng: 31.235712 },
  { name: "Mexico City", lat: 19.432608, lng: -99.133209 },
  { name: "Istanbul", lat: 41.008238, lng: 28.978359 },
  { name: "Bangkok", lat: 13.756331, lng: 100.501762 },
  { name: "Buenos Aires", lat: -34.603684, lng: -58.381559 },
  { name: "Hanoi", lat: 21.028511, lng: 105.804817 },
];

const PolyGlobe = ({ handleOpenModal, animate, rorateSpeed }) => {
  const [countries, setCountries] = useState([]);
  const [latArray, setLatArray] = useState([]);
  const [lngArray, setLngArray] = useState([]);
  const globeEl = useRef();
  const N = 15;

  useEffect(() => {
    let to;
    (function check() {
      if (globeEl.current) {
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = rorateSpeed;

        // Set altitude based on screen width
        const altitude = window.innerWidth <= 768 ? 4 : 3; // Adjust altitude based on screen width
        globeEl.current.pointOfView({ lat: 0, lng: 0, altitude });
      } else {
        to = setTimeout(check, 1000);
      }
    })();
    return () => {
      if (to) {
        clearTimeout(to);
      }
    };
  }, [rorateSpeed]);

  useEffect(() => {
    const fetchedCountries = data.features;

    // Update countries state
    setCountries(fetchedCountries);

    // Update latArray and lngArray from cities
    setLatArray(cities.slice(0, N).map((city) => city.lat));
    setLngArray(cities.slice(0, N).map((city) => city.lng));
  }, []);

  const markerSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">

<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<path d="M 45 90 c -1.415 0 -2.725 -0.748 -3.444 -1.966 l -4.385 -7.417 C 28.167 65.396 19.664 51.02 16.759 45.189 c -2.112 -4.331 -3.175 -8.955 -3.175 -13.773 C 13.584 14.093 27.677 0 45 0 c 17.323 0 31.416 14.093 31.416 31.416 c 0 4.815 -1.063 9.438 -3.157 13.741 c -0.025 0.052 -0.053 0.104 -0.08 0.155 c -2.961 5.909 -11.41 20.193 -20.353 35.309 l -4.382 7.413 C 47.725 89.252 46.415 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(4,136,219); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 45 45.678 c -8.474 0 -15.369 -6.894 -15.369 -15.368 S 36.526 14.941 45 14.941 c 8.474 0 15.368 6.895 15.368 15.369 S 53.474 45.678 45 45.678 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g>
</svg>`;

  // Generate marker data using the lat and lng arrays
  const gData = latArray.map((lat, index) => ({
    lat: lat,
    lng: lngArray[index],
    size: 50,
    color: ["lightblue"],
    name: cities[index].name,
    idx: Math.floor(Math.random() * 7) // Random index between 0 and 6
  }));

  const handleShowInfor = (cityName, pointLat, pointLng, indexMarker) => {
    if (globeEl.current) {
      const altitude = window.innerWidth <= 768 ? 4 : 3; // Set altitude based on screen width

      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = rorateSpeed;
      if (!animate) {
        globeEl.current.pointOfView({
          lat: pointLat,
          lng: pointLng,
          altitude: altitude, // Use the dynamic altitude here
        });
      }
    }

    handleOpenModal(true, indexMarker);
  };

  const arcsData = [...Array(15 - 1).keys()].map((i) => ({
    startLat: latArray[i],
    startLng: lngArray[i],
    endLat: latArray[i + 1],
    endLng: lngArray[i + 1],
    color: [
      ["yellow", "white", "green"][Math.round(Math.random() * 2)],
      ["yellow", "white", "green"][Math.round(Math.random() * 2)],
    ],
  }));
  // bumpImageUrl={earth2}
  return (
    <div className={animate ? "globeAnimation" : ""}>
      <Globe
        ref={globeEl}
        globeImageUrl={earthday}
        hexPolygonsData={countries}
        backgroundColor="rgba(0,0,0,0)"
        hexPolygonResolution={3}
        hexPolygonMargin={0.1}
        hexPolygonUseDots={true}
        hexPolygonColor={() =>
          `#${Math.round(Math.random() * Math.pow(2, 24))
            .toString(16)
            .padStart(6, "0")}`
        }
        htmlElementsData={gData}
        arcsData={arcsData}
        arcColor={"color"}
        arcDashLength={() => Math.random()}
        arcDashGap={() => Math.random()}
        arcDashAnimateTime={() => Math.random() * 4000 + 500}
        htmlElement={(d) => {
          const el = document.createElement("div");
          el.innerHTML = markerSvg;
          el.style.color = d.color;
          el.style.width = `${d.size}px`;
          el.style.transform = `translate(-30%, -50%) translateZ(-${
            d.size / 2
          }px)`;

          const tooltip = document.createElement("div");
          tooltip.innerText = d.name;
          tooltip.style.position = "absolute";
          tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          tooltip.style.color = "white";
          tooltip.style.borderRadius = "4px";
          tooltip.style.padding = "5px";
          tooltip.style.transform = "translate(-50%, -100%)";
          tooltip.style.display = "none";
          el.appendChild(tooltip);

          el.onmouseenter = () => {
            tooltip.style.display = "block";
          };
          el.onmouseleave = () => {
            tooltip.style.display = "none";
          };

          el.style["pointer-events"] = "auto";
          el.style.cursor = "pointer";
          el.onclick = () => handleShowInfor(d.name, d.lat, d.lng, d.idx);
          return el;
        }}
      />
    </div>
  );
};

export default PolyGlobe;
