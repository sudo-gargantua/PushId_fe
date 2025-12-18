'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, CheckSquare, Square, Loader2, Apple } from 'lucide-react';
// IMPORT TOAST
import toast, { Toaster } from 'react-hot-toast';
// PERBAIKAN: Path relatif yang benar ke store yang baru saja dibuat di atas
import { useAuthStore } from '../../store/useAuthStore';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginToStore = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!agreeTerms) {
      toast.error("Kamu harus menyetujui Syarat & Ketentuan.", {
        style: { background: '#1e293b', color: '#fff', border: '1px solid #ef4444' }
      });
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Mendaftarkan akun...", {
        style: { background: '#1e293b', color: '#fff' }
    });

    try {
      // GANTI URL INI DENGAN API LARAVEL KAMU
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Hapus loading toast
      toast.dismiss(loadingToast);

      if (response.ok) {
        if (data.user && data.token) {
             loginToStore(data.user, data.token);
             toast.success(`Selamat datang, ${data.user.name}!`, {
                duration: 2000,
                style: { background: '#1e293b', color: '#fff', border: '1px solid #5C5CFF' }
             });
             
             setTimeout(() => {
                window.location.href = '/lobby';
             }, 1500);
        } else {
             toast.success("Registrasi Berhasil! Silakan Login.", {
                style: { background: '#1e293b', color: '#fff' }
             });
             setTimeout(() => {
                window.location.href = '/login';
             }, 1500);
        }
      } else {
        if (data.errors) {
          setErrors(data.errors);
          toast.error("Periksa kembali data inputan Anda.", {
            style: { background: '#1e293b', color: '#fff' }
          });
        } else {
          toast.error(data.message || "Registrasi Gagal.", {
            style: { background: '#1e293b', color: '#fff' }
          });
        }
      }

    } catch (error) {
      console.error("Error:", error);
      toast.dismiss(loadingToast);
      toast.error("Gagal terhubung ke Server Backend.", {
        style: { background: '#1e293b', color: '#fff' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#020617] text-white font-sans overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center bg-[#0B0E14] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="login-register.jpg" 
            alt="Register Character" 
            className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-10000 ease-linear"
            onError={(e) => {
              e.target.style.display = 'none'; 
              e.target.parentNode.style.backgroundColor = '#1e293b'; 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#020617]/10 to-[#020617] z-10"></div>
        </div>
      </div>

      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center px-6 py-12 bg-[#020617] relative z-20 h-full overflow-y-auto">
        <div className="w-full max-w-[420px] space-y-6">
          
          <div className="flex flex-col items-center mb-8">
            <div className="flex flex-col items-center gap-2 mb-2">
                <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-black text-xl italic shadow-[0_0_15px_rgba(37,99,235,0.5)] z-10 relative">P</div>
                    <div className="absolute -inset-1 bg-blue-500/20 blur-lg rounded-full"></div>
                </div>
                <span className="font-black text-lg tracking-wider bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mt-2">PUSH ID</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide text-center mt-2">Create your Account</h2>
          </div>

          <div className="flex gap-8 mb-6 text-lg font-semibold pl-1">
            <a href="/login" className="text-slate-500 hover:text-slate-300 transition-colors">Login</a>
            <button className="text-blue-500 transition-colors relative">
              Sign up
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full"></span>
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Your name</label>
              <input 
                name="name"
                type="text" 
                placeholder="Enter your name..." 
                className={`w-full bg-[#0F1218] border ${errors.name ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-inner`}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name[0]}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
              <input 
                name="email"
                type="email" 
                placeholder="Enter your Email Address..." 
                className={`w-full bg-[#0F1218] border ${errors.email ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-inner`}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email[0]}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter Your Password..." 
                  className={`w-full bg-[#0F1218] border ${errors.password ? 'border-red-500' : 'border-[#1F2937]'} rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-inner`}
                  onChange={handleChange}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password[0]}</p>}
            </div>

            <div className="flex items-center gap-2 pt-2 cursor-pointer group" onClick={() => setAgreeTerms(!agreeTerms)}>
               {agreeTerms ? <CheckSquare size={16} className="text-blue-600" /> : <Square size={16} className="text-slate-600 group-hover:text-slate-400" />}
               <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">I agree to terms & conditions</span>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#5C5CFF] hover:bg-[#4848d1] disabled:bg-slate-700 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(92,92,255,0.4)] transition-all duration-300 transform active:scale-[0.98] mt-4 flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : 'Join Now!'}
            </button>
          </form>

          <div className="relative flex py-2 items-center"><div className="flex-grow border-t border-slate-800"></div><span className="flex-shrink mx-4 text-slate-600 text-[10px] font-bold uppercase tracking-widest">OR</span><div className="flex-grow border-t border-slate-800"></div></div>
          <div className="space-y-3">
            <button className="w-full bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-all text-sm">
               Continue With Google
            </button>
             <button className="w-full bg-transparent border border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-300 font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-all group text-sm">
              <Apple size={18} className="text-white pb-0.5 group-hover:scale-110 transition-transform" />
              Continue With Apple
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}