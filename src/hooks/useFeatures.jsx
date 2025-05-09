import { useState } from "react";
import { Earth, Telescope, Watch, MousePointerClick } from "lucide-react";

// Hook untuk menyediakan data fitur-fitur aplikasi
export const useFeatures = () => {
  // State berisi array fitur dengan data statis
  const [features] = useState([
    {
      icon: Earth,
      title: "Explore Destinations",
      description: "Locate the perfect destination for your next adventure.",
      color: "text-blue-500",
    },
    {
      icon: Telescope,
      title: "Booking Activities",
      description:
        "Booking for unique and unforgettable adventure in the world.",
      color: "text-teal-500",
    },
    {
      icon: Watch,
      title: "Travel Support",
      description:
        "Travel assistance for 24/7, no worry for your free journey.",
      color: "text-purple-500",
    },
    {
      icon: MousePointerClick,
      title: "Easy Booking Process",
      description: "Quick and easy booking process.",
      color: "text-pink-500",
    },
  ]);

  return { features };
};
