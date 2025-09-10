import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/public_pages/layout/NavBar";
import Footer from "../../../components/public_pages/layout/Footer";
import { motion } from "framer-motion";
import { User, Mail, Lock, Upload, Camera, ArrowLeft, ArrowRight, Phone } from "lucide-react";

const steps = [
  { id: "personal", title: "Personal Information" },
  { id: "id", title: "ID Verification" },
  { id: "selfie", title: "Selfie Verification" },
  { id: "security", title: "Security Setup" }
];

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({
    // Personal Info
    name: "",
    email: "",
    phone: "",
    // ID Verification
    idType: "national_id",
    idNumber: "",
    idImage: null,
    // Selfie
    selfieImage: null,
    // Security
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
    setError("");
  };

  const handleNext = () => setCurrentStep(c => Math.min(c + 1, steps.length - 1));
  const handleBack = () => setCurrentStep(c => Math.max(c - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation based on current step
    if (currentStep === 0) {
      if (!form.name || !form.email || !form.phone) {
        setError("Please fill in all personal information");
        setLoading(false);
        return;
      }
    } else if (currentStep === 1) {
      if (!form.idNumber || !form.idImage) {
        setError("Please provide ID information and upload ID image");
        setLoading(false);
        return;
      }
    } else if (currentStep === 2) {
      if (!form.selfieImage) {
        setError("Please take or upload a selfie");
        setLoading(false);
        return;
      }
    } else if (currentStep === 3) {
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
      // Final submission
      setTimeout(() => {
        setLoading(false);
        alert("Registration successful! Please login.");
        navigate("/client/auth/login");
      }, 1000);
      return;
    }

    setLoading(false);
    handleNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-500">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-500">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-500">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Type</label>
              <select
                name="idType"
                value={form.idType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="national_id">National ID</option>
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver's License</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={form.idNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your ID number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload ID Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        name="idImage"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Take a Selfie</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-500">
                      <span>Take a photo or upload</span>
                      <input
                        type="file"
                        name="selfieImage"
                        className="sr-only"
                        accept="image/*"
                        capture="user"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">Look straight at the camera</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-500">
                <Lock className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full bg-transparent outline-none"
                  placeholder="Create a password (min. 6 characters)"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-500">
                <Lock className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full bg-transparent outline-none"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div
          className="max-w-md w-full bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-12 mx-2 ${
                        index < currentStep ? 'bg-red-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-center text-gray-800">
                {steps[currentStep].title}
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}
            
            {error && (
              <div className="mt-4 text-sm text-red-500 text-center">{error}</div>
            )}

            <div className="mt-6 flex justify-between">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              )}
              <motion.button
                type="submit"
                disabled={loading}
                className={`flex items-center px-6 py-2 rounded-lg text-white font-medium ${
                  currentStep === steps.length - 1
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600'
                } disabled:opacity-50 ml-auto`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  "Processing..."
                ) : currentStep === steps.length - 1 ? (
                  "Complete Signup"
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
