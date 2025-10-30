import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../../../components/public_pages/layout/NavBar";
import Footer from "../../../components/public_pages/layout/Footer";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useClientAuth } from "../../../contexts/ClientAuthContext";
import { useToast } from "../../../contexts/ToastContext";

// Login page with API integration
const ClientLogin = () => {
	const navigate = useNavigate();
	const { login } = useClientAuth();
	const toast = useToast();
	const [form, setForm] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await login(form.email, form.password);

            // Normalize & handle different possible return shapes from login()
            if (result && typeof result === "object") {
                if (result.success === true) {
                    navigate("/client/dashboard");
                    return;
                }
                if (result.message) {
                    toast.error(result.message);
                    return;
                }
                // If result looks like a token object: { token: '...' }
                if (result.token || result.accessToken) {
                    navigate("/client/dashboard");
                    return;
                }
            }

            // If login returned a boolean true or a token string, treat as success
            if (result === true || (typeof result === "string" && result.length > 0)) {
                navigate("/client/dashboard");
                return;
            }

            // Fallback error message
            toast.error("Invalid credentials. Please try again.");
        } catch (err) {
            // Friendly error for unexpected failures (network, thrown errors, etc.)
            toast.error("An error occurred while logging in. Please try again.");
        } finally {
            setLoading(false);
        }
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
                                <Link to="/client/auth/forgot" className="text-sm text-red-500 hover:underline">Forgot password?</Link>
                            </div>
                        </div>
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-busy={loading}
                        >
                            <Lock className="w-5 h-5" />
                            {loading ? "Logging in..." : "Login"}
                        </motion.button>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account? <Link to="/client/auth/signup" className="text-red-500 hover:underline">Sign up</Link>
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
