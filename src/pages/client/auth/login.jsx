import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/public_pages/layout/NavBar";
import Footer from "../../../components/public_pages/layout/Footer";

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
				<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Client Login</h2>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
							<input
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
								placeholder="you@example.com"
								autoComplete="email"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
							<input
								type="password"
								name="password"
								value={form.password}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
								placeholder="••••••••"
								autoComplete="current-password"
							/>
						</div>
						{error && <div className="text-red-500 text-sm">{error}</div>}
						{success && <div className="text-green-600 text-sm">Redirecting to dashboard...</div>}
						<button
							type="submit"
							disabled={loading}
							className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
						>
							{loading ? "Processing..." : "Login"}
						</button>
					</form>
					<div className="mt-6 text-center text-sm text-gray-600">
						Don't have an account? <span className="text-gray-800">(Registration coming soon)</span>
					</div>
					<div className="mt-4 text-xs text-gray-400 text-center">
						Future: Hook this form to API (POST /auth/login) then store token & user.
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default ClientLogin;
