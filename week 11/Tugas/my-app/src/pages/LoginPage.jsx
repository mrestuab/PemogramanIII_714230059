import { useState } from "react";
import { login } from "../services/authService";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function LoginPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(form.username, form.password);
            localStorage.setItem("token", data.token);
            Swal.fire("Berhasil", "Login berhasil!", "success");
            navigate("/dashboard"); // redirect ke halaman utama
        } catch (error) {
            console.error(error);
            Swal.fire("Gagal", "Username atau password salah", "error");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
            >                <h2 className="text-xl font-bold mb-6 text-center">Login</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
                />
                <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-2 pr-10 border rounded focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                </div><button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
                
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Belum punya akun?{" "}
                        <Link 
                            to="/register" 
                            className="text-blue-500 hover:text-blue-600 font-medium"
                        >
                            Daftar disini
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}