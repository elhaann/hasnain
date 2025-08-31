import React, { useState, useEffect, useRef } from "react";
import styles from "./CollectionCentersMap.module.css";

const CollectionCentersMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Google Maps API key
  const API_KEY = "AIzaSyCZmb9zd1-H2eDXvuQbii4atu0-2Ok1C8o";
  
  // Asansol, West Bengal coordinates
  const asansolCenter = {
    lat: 23.6739,
    lng: 86.9524
  };

  // Sample collection centers in Asansol area
  const collectionCenters = [
    {
      id: 1,
      name: "Asansol Municipal Collection Center",
      position: { lat: 23.6825, lng: 86.9550 },
      address: "Near Asansol Station, GT Road, Asansol",
      status: "active"
    },
    {
      id: 2,
      name: "Burnpur Waste Collection Hub",
      position: { lat: 23.6650, lng: 86.9480 },
      address: "Burnpur Industrial Area, Asansol",
      status: "active"
    },
    {
      id: 3,
      name: "Raniganj Collection Point",
      position: { lat: 23.6200, lng: 87.1200 },
      address: "Raniganj Main Road, Burdwan",
      status: "maintenance"
    },
    {
      id: 4,
      name: "Kulti Municipal Center",
      position: { lat: 23.7300, lng: 86.8400 },
      address: "Kulti Township, West Bengal",
      status: "active"
    },
    {
      id: 5,
      name: "Durgapur Steel City Center",
      position: { lat: 23.5204, lng: 87.3119 },
      address: "Steel City, Durgapur, West Bengal",
      status: "active"
    }
  ];

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        setIsLoaded(true);
        return;
      }

      // Check if script is already being loaded
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        // Wait for it to load
        const checkLoaded = setInterval(() => {
          if (window.google && window.google.maps) {
            setIsLoaded(true);
            clearInterval(checkLoaded);
          }
        }, 100);
        return;
      }

      // Create and load the script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        setIsLoaded(true);
      };
      
      script.onerror = () => {
        setError("Failed to load Google Maps");
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize map when Google Maps is loaded
  useEffect(() => {
    if (isLoaded && mapRef.current && !map) {
      try {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: asansolCenter,
          zoom: 11,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        // Add markers for collection centers
        collectionCenters.forEach((center) => {
          const marker = new window.google.maps.Marker({
            position: center.position,
            map: mapInstance,
            title: center.name,
            icon: {
              url: center.status === 'active' 
                ? 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#22c55e"/>
                    <circle cx="12" cy="9" r="2.5" fill="white"/>
                  </svg>
                `)
                : 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#f59e0b"/>
                    <circle cx="12" cy="9" r="2.5" fill="white"/>
                  </svg>
                `),
              scaledSize: new window.google.maps.Size(32, 32),
              anchor: new window.google.maps.Point(16, 32)
            }
          });

          // Create info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; min-width: 200px;">
                <h4 style="margin: 0 0 8px 0; color: #1f2937; font-weight: 600;">${center.name}</h4>
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${center.address}</p>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="
                    padding: 2px 8px; 
                    border-radius: 12px; 
                    font-size: 12px; 
                    font-weight: 500;
                    background-color: ${center.status === 'active' ? '#dcfce7' : '#fef3c7'};
                    color: ${center.status === 'active' ? '#166534' : '#92400e'};
                  ">
                    ${center.status.toUpperCase()}
                  </span>
                </div>
              </div>
            `
          });

          // Add click listener to marker
          marker.addListener("click", () => {
            infoWindow.open(mapInstance, marker);
          });
        });

        setMap(mapInstance);
      } catch (err) {
        setError("Failed to initialize map");
        console.error("Map initialization error:", err);
      }
    }
  }, [isLoaded, map]);

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <p className={styles.errorText}>{error}</p>
          <p className={styles.errorSubtext}>Please check your internet connection and try again</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Google Map */}
      <div 
        ref={mapRef} 
        className={styles.mapContainer}
        style={{ 
          width: '100%', 
          height: '400px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}
      />
      
      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={styles.legendMarker} style={{ backgroundColor: '#22c55e' }}></div>
          <span className={styles.legendText}>Active Centers</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendMarker} style={{ backgroundColor: '#f59e0b' }}></div>
          <span className={styles.legendText}>Under Maintenance</span>
        </div>
      </div>

      {/* Quick Info */}
      <div className={styles.quickInfo}>
        <h4 className={styles.quickInfoTitle}>Collection Centers in Asansol Area</h4>
        <p className={styles.quickInfoText}>
          Click on map markers to see center details and get directions
        </p>
      </div>
    </div>
  );
};

export default CollectionCentersMap;