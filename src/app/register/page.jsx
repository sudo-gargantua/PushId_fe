'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Untuk pindah halaman
import { Eye, EyeOff, CheckSquare, Square, Apple } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // --- INTEGRASI STATE ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  // --- INTEGRASI FUNGSI REGISTER ---
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      toast.error("Please agree to the terms & conditions first.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          password_confirmation: password, // Laravel mewajibkan konfirmasi
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created successfully!");
        router.push('/login'); // Redirect ke login setelah sukses
      } else {
        // Menangani error validasi dari Laravel
        const errorMsg = data.errors ? Object.values(data.errors).flat().join('\n') : data.message;
        toast.error(errorMsg || "Registration failed");
      }
    } catch (error) {
      toast.error("Could not connect to server. Make sure Laravel is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#020617] text-white font-sans overflow-hidden">
      
      {/* --- BAGIAN KIRI: GAMBAR (Dipertahankan) --- */}
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center bg-[#0B0E14] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/login-register.jpg" 
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

      {/* --- BAGIAN KANAN: FORM REGISTER --- */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center px-6 py-12 bg-[#020617] relative z-20 h-full overflow-y-auto">
        
        <div className="w-full max-w-[420px] space-y-6">
          
          <div className="flex flex-col items-center mb-8">
            <div className="flex flex-col items-center gap-2 mb-2">
                <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-black text-xl italic shadow-[0_0_15px_rgba(37,99,235,0.5)] z-10 relative">
                        P
                    </div>
                    <div className="absolute -inset-1 bg-blue-500/20 blur-lg rounded-full"></div>
                </div>
                <span className="font-black text-lg tracking-wider bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mt-2">
                    PUSH ID
                </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide text-center mt-2">
              Create your Account
            </h2>
          </div>

          <div className="flex gap-8 mb-6 text-lg font-semibold pl-1">
            <a 
              href="/login" 
              className="text-slate-500 hover:text-slate-300 transition-colors focus:outline-none cursor-pointer"
            >
              Login
            </a>
            <button className="text-blue-500 transition-colors focus:outline-none relative">
              Sign up
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full"></span>
            </button>
          </div>

          {/* --- FORM SUBMIT INTEGRASI --- */}
          <form className="space-y-4" onSubmit={handleRegister}>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Your name</label>
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..." 
                className="w-full bg-[#0F1218] border border-[#1F2937] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email Address..." 
                className="w-full bg-[#0F1218] border border-[#1F2937] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password..." 
                  className="w-full bg-[#0F1218] border border-[#1F2937] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-inner"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 cursor-pointer group" onClick={() => setAgreeTerms(!agreeTerms)}>
               {agreeTerms ? (
                  <CheckSquare size={16} className="text-blue-600" />
               ) : (
                  <Square size={16} className="text-slate-600 group-hover:text-slate-400" />
               )}
               <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                 I agree to terms & conditions
               </span>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full ${isLoading ? 'bg-slate-700' : 'bg-[#5C5CFF] hover:bg-[#4848d1]'} text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(92,92,255,0.4)] hover:shadow-[0_0_25px_rgba(92,92,255,0.6)] transition-all duration-300 transform active:scale-[0.98] mt-4`}
            >
              {isLoading ? 'Processing...' : 'Join Now!'}
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-600 text-[10px] font-bold uppercase tracking-widest">OR</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-transparent border border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-300 font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-all group text-sm">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.04-1.133 7.973-2.96 1.96-1.933 2.507-4.84 2.507-7.253 0-.72-.053-1.387-.16-2.027H12.48z" />
              </svg>
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