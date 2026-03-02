import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { toast, Toaster } from "sonner";

import PilgrimInterface from "./components/pilgrim/PilgrimInterface";
import AuthorityInterface from "./components/authority/AuthorityInterface";
import RoleSelector from "./components/RoleSelector";
import { wsService } from "./services/api";

function AppContent() {
  const [selectedTemple, setSelectedTemple] =
    useState("somnath");
  const [currentInterface, setCurrentInterface] =
    useState(null); // null, 'pilgrim', 'authority'

  // Temple-specific crowd data for Gujarat's 4 major temples
  const [templeData, setTempleData] = useState({
    somnath: {
      name: "Somnath Temple",
      location: "Veraval, Gir Somnath",
      zones: {
        mainDarshan: {
          density: 45,
          waitTime: "15 min",
          status: "moderate",
          name: "Main Darshan Hall",
        },
        garbhaGriha: {
          density: 78,
          waitTime: "25 min",
          status: "high",
          name: "Garbha Griha",
        },
        pradakshina: {
          density: 23,
          waitTime: "8 min",
          status: "low",
          name: "Pradakshina Path",
        },
        museum: {
          density: 12,
          waitTime: "5 min",
          status: "low",
          name: "Museum & Exhibition",
        },
      },
    },
    dwarka: {
      name: "Dwarkadhish Temple",
      location: "Dwarka, Devbhumi Dwarka",
      zones: {
        mainDarshan: {
          density: 67,
          waitTime: "20 min",
          status: "high",
          name: "Main Darshan Hall",
        },
        garbhaGriha: {
          density: 89,
          waitTime: "35 min",
          status: "critical",
          name: "Garbha Griha",
        },
        pradakshina: {
          density: 34,
          waitTime: "12 min",
          status: "moderate",
          name: "Pradakshina Path",
        },
        gomtiGhat: {
          density: 28,
          waitTime: "10 min",
          status: "low",
          name: "Gomti Ghat",
        },
      },
    },
    ambaji: {
      name: "Ambaji Temple",
      location: "Ambaji, Banaskantha",
      zones: {
        mainDarshan: {
          density: 56,
          waitTime: "18 min",
          status: "moderate",
          name: "Main Darshan Hall",
        },
        garbhaGriha: {
          density: 72,
          waitTime: "28 min",
          status: "high",
          name: "Garbha Griha",
        },
        pradakshina: {
          density: 19,
          waitTime: "7 min",
          status: "low",
          name: "Pradakshina Path",
        },
        gabbarHill: {
          density: 41,
          waitTime: "15 min",
          status: "moderate",
          name: "Gabbar Hill Path",
        },
      },
    },
    pavagadh: {
      name: "Kalika Mata Temple",
      location: "Pavagadh, Panchmahal",
      zones: {
        mainDarshan: {
          density: 38,
          waitTime: "14 min",
          status: "moderate",
          name: "Main Darshan Hall",
        },
        garbhaGriha: {
          density: 65,
          waitTime: "22 min",
          status: "high",
          name: "Garbha Griha",
        },
        pradakshina: {
          density: 15,
          waitTime: "6 min",
          status: "low",
          name: "Pradakshina Path",
        },
        ropeway: {
          density: 52,
          waitTime: "18 min",
          status: "moderate",
          name: "Ropeway Station",
        },
      },
    },
  });

  const [events, setEvents] = useState([
    {
      id: 1,
      timestamp: new Date().toLocaleTimeString(),
      message:
        "🙏 Welcome to Temple Insight 360 - Gujarat Temple Assistance System",
      type: "system",
    },
    {
      id: 2,
      timestamp: new Date().toLocaleTimeString(),
      message:
        "📱 Demo Mode: All bookings stored locally, real-time updates simulated",
      type: "system",
    },
  ]);
  const [bookings, setBookings] = useState([]);

  // Simulate real-time crowd updates for selected temple (fallback if WebSocket fails)
  useEffect(() => {
    const interval = setInterval(() => {
      setTempleData((prev) => {
        const currentTemple = prev[selectedTemple];
        const zones = Object.keys(currentTemple.zones);
        const randomZone =
          zones[Math.floor(Math.random() * zones.length)];
        const currentZone = currentTemple.zones[randomZone];

        const newDensity = Math.max(
          0,
          Math.min(
            100,
            currentZone.density + (Math.random() - 0.5) * 20,
          ),
        );
        const newWaitTime =
          Math.ceil(newDensity * 0.4) + " min";
        let newStatus = "low";
        if (newDensity > 30) newStatus = "moderate";
        if (newDensity > 60) newStatus = "high";
        if (newDensity > 80) newStatus = "critical";

        const newEvent = {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          message: `${currentTemple.name} - ${currentZone.name} density updated to ${Math.round(newDensity)}%`,
          type: "crowd",
        };

        setEvents((prev) => [newEvent, ...prev.slice(0, 9)]);

        return {
          ...prev,
          [selectedTemple]: {
            ...currentTemple,
            zones: {
              ...currentTemple.zones,
              [randomZone]: {
                ...currentZone,
                density: newDensity,
                waitTime: newWaitTime,
                status: newStatus,
              },
            },
          },
        };
      });
    }, 10000); // Slower fallback updates

    return () => clearInterval(interval);
  }, [selectedTemple]);

  const handleBooking = (bookingData) => {
    const newBooking = {
      id: `BK${Date.now()}`,
      ...bookingData,
      timestamp: new Date(),
      qrCode: `QR-${Date.now()}`,
      status: "confirmed",
    };

    setBookings((prev) => [...prev, newBooking]);

    const event = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      message: `New darshan booking confirmed for ${bookingData.zone}`,
      type: "booking",
    };
    setEvents((prev) => [event, ...prev.slice(0, 9)]);

    toast.success(
      "Darshan booking confirmed! Check My Bookings for details.",
    );
  };

  const handleEmergency = (emergencyData) => {
    const event = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      message: `🚨 Emergency Alert: ${emergencyData.type} - ${emergencyData.location}`,
      type: "emergency",
    };
    setEvents((prev) => [event, ...prev.slice(0, 9)]);
    toast.error("Emergency alert sent to authorities");
  };

  // Handle role selection
  const handleRoleSelect = (role) => {
    setCurrentInterface(role);
  };

  // Handle switching back to role selector
  const handleBackToRoleSelector = () => {
    setCurrentInterface(null);
  };

  // Show role selector if no interface is selected
  if (!currentInterface) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
  }

  // Show authority interface (no authentication required)
  if (currentInterface === "authority") {
    return (
      <AuthorityInterface
        templeData={templeData}
        selectedTemple={selectedTemple}
        onTempleChange={setSelectedTemple}
        events={events}
        setEvents={setEvents}
        onBackToRoleSelector={handleBackToRoleSelector}
      />
    );
  }

  // Show pilgrim interface (no authentication required)
  if (currentInterface === "pilgrim") {
    return (
      <PilgrimInterface
        templeData={templeData}
        selectedTemple={selectedTemple}
        onTempleChange={setSelectedTemple}
        events={events}
        setEvents={setEvents}
        bookings={bookings}
        handleBooking={handleBooking}
        handleEmergency={handleEmergency}
        onBackToRoleSelector={handleBackToRoleSelector}
      />
    );
  }

  return null;
}

// Main App wrapper
function App() {
  return (
    <>
      <AppContent />
      <Toaster />
    </>
  );
}

export default App;