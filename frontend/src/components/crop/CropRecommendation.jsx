import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Thermometer, Droplets, Cloud, Globe2 } from "lucide-react";
import MapComponent from "./MapComponent";
import toast from "react-hot-toast";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../utils/translations";

function CropRecommendation() {
  const { language } = useLanguage(); // Get current language
  const t = translations[language].cropRecommendation; // Get translations for CropRecommendation

  const [coordinates, setCoordinates] = useState({ lng: 73.8987, lat: 18.4463 });
  const [formData, setFormData] = useState({
    nitrogen: 80,
    phosphorus: 60,
    potassium: 60,
    ph: 6.5,
    temperature: 23,
    humidity: 56,
    rainfall: 100,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      toast.success(t.successMessage); // Using translated success message
    } catch (error) {
      toast.error(t.failureMessage); // Using translated failure message
    }
  };

  const inputFields = [
    { name: "nitrogen", label: t.nitrogen, icon: Star, value: formData.nitrogen },
    { name: "phosphorus", label: t.phosphorus, icon: Star, value: formData.phosphorus },
    { name: "potassium", label: t.potassium, icon: Star, value: formData.potassium },
    { name: "ph", label: t.ph, icon: Globe2, value: formData.ph },
    { name: "temperature", label: t.temperature, icon: Thermometer, value: formData.temperature },
    { name: "humidity", label: t.humidity, icon: Droplets, value: formData.humidity },
    { name: "rainfall", label: t.rainfall, icon: Cloud, value: formData.rainfall },
  ];

  return (
    <div className="min-h-screen pt-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-white mb-12"
        >
          {t.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800  rounded-xl shadow-lg p-8"
        >
          {/* image add  */}
          <div className="mb-8 h-[] rounded-xl overflow-hidden">
            <MapComponent coordinates={coordinates} setCoordinates={setCoordinates} />
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map(({ name, label, icon: Icon, value }) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col"
              >
                <label className="block text-lg font-medium text-white-700 mb-2">
                  {label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Icon className="h-5 w-5 text-gray-700" />
                  </div>
                  <input
                    type="number"
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-4 py-2 bg-black text-white border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </motion.div>
            ))}

            <div className="md:col-span-2">
              <motion.button
                type="submit"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="w-full text-xl bg-green-800 text-white py-3 rounded-lg hover:bg-green-700 transition transform hover:scale-105"
              >
                {t.submitButton}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default CropRecommendation;