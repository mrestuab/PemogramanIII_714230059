import { useState } from "react";
import { register } from "../services/authService";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function RegisterPage() {    const [form, setForm] = useState({ 
        username: "", 
        email: "", 
        password: "", 
        confirmPassword: "",
        role: "" // user harus memilih role
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/dashboard");
    }, [navigate]);    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
          // Validasi form
        if (!form.username || !form.email || !form.password || !form.confirmPassword || !form.role) {
            Swal.fire("Error", "Semua field harus diisi!", "error");
            return;
        }

        if (form.password !== form.confirmPassword) {
            Swal.fire("Error", "Password dan konfirmasi password tidak cocok!", "error");
            return;
        }

        if (form.password.length < 6) {
            Swal.fire("Error", "Password minimal 6 karakter!", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            Swal.fire("Error", "Format email tidak valid!", "error");
            return;
        }        setLoading(true);
        try {
            await register(form.username, form.password, form.email, form.role);
            Swal.fire({
                title: "Berhasil",
                text: "Registrasi berhasil! Silakan login dengan akun baru Anda.",
                icon: "success"
            }).then(() => {
                navigate("/login");
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat registrasi";
            Swal.fire("Gagal", errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    return (        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-xl font-bold mb-6 text-center">Register</h2>
                
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
                    disabled={loading}
                />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
                    disabled={loading}
                />
                
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500 bg-white"
                    disabled={loading}
                >
                    <option value="">Pilih Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>                </select>
                
                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-2 pr-10 border rounded focus:outline-none focus:border-blue-500"
                        disabled={loading}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
                        disabled={loading}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>
                
                <div className="relative mb-6">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Konfirmasi Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-2 pr-10 border rounded focus:outline-none focus:border-blue-500"
                        disabled={loading}
                    />
                    <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
                        disabled={loading}
                    >
                        {showConfirmPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded text-white font-medium ${
                        loading 
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Mendaftar..." : "Register"}
                </button>
                
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Sudah punya akun?{" "}
                        <Link 
                            to="/login" 
                            className="text-blue-500 hover:text-blue-600 font-medium"
                        >
                            Login disini
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}