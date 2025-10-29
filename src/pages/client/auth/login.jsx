import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/public_pages/layout/NavBar";
import Footer from "../../../components/public_pages/layout/Footer";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

// Login page with UI preserved; submit simply routes to dashboard (no auth yet)
const ClientLogin = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(""); // kept for future integration
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setError("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setSuccess(false);
		// Direct navigation (placeholder for future API call)
		setTimeout(() => {
			setSuccess(true);
			navigate("/client/dashboard");
		}, 500);
	};

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <NavBar />
            <main className="flex-1 flex items-center justify-center py-16 px-4">
                <motion.div
                    className="max-w-md w-full bg-white rounded-lg shadow-lg p-8"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                >
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Client Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                />
                            </div>
                        </div>
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
                                    className="w-full bg-transparent outline-none"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                            </div>
                            <div className="mt-2 text-right">
                                <a href="/client/auth/forgot" className="text-sm text-red-500 hover:underline">Forgot password?</a>
                            </div>
                        </div>
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        {success && <div className="text-green-600 text-sm">Redirecting to dashboard...</div>}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Lock className="w-5 h-5" />
                            {loading ? "Processing..." : "Login"}
                        </motion.button>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account? <a href="/client/auth/signup" className="text-red-500 hover:underline">Sign up</a>
                    </div>
                    {/* <div className="mt-4 text-xs text-gray-400 text-center">
                        Future: Hook this form to API (POST /auth/login) then store token & user.
                    </div> */}
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default ClientLogin;
