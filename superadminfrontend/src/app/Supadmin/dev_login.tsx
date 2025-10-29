// "use client";

// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { Shield } from "lucide-react";

// export default function DeveloperSignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Developer Sign-In", { email, password });
//   };

//   const handleGoogleSignIn = () => {
//     console.log("Google Sign-In Triggered");
//   };

//   return (
//     <>
//       {/* 📱 Message for small screens */}
//       <div className="flex lg:hidden h-screen w-screen items-center justify-center bg-gray-900 text-gray-200 px-6 text-center">
//         <div>
//           <h1 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] bg-clip-text text-transparent">
//             Developer Portal Not Available on Mobile
//           </h1>
//           <p className="text-gray-400">
//             Please access the GRC Developer Console from a desktop or laptop for the best experience.
//           </p>
//         </div>
//       </div>
//     <main className="hidden lg:flex flex-col lg:flex-row h-screen">
//       {/* LEFT SECTION */}
//       <section
//         className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 lg:px-16 py-12 text-white bg-gradient-to-r from-[#6b46c1] to-[#d53f8c]"
//       >
//         <div className="max-w-lg space-y-8 text-center lg:text-left">
//           <svg
//             width="100"
//             height="100"
//             viewBox="0 0 630 630"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className="mx-auto lg:mx-0"
//           >
//             <g clipPath="url(#clip0_1874_1262)">
//               <g filter="url(#filter0_d_1874_1262)">
//                 <path
//                   d="M576.108 0H103.854C74.1111 0 50 24.1111 50 53.8536V526.108C50 555.851 74.1111 579.962 103.854 579.962H576.108C605.851 579.962 629.962 555.851 629.962 526.108V53.8536C629.962 24.1111 605.851 0 576.108 0Z"
//                   fill="#233DFF"
//                 />
//                 <path
//                   d="M161.85 167.2V112.31C161.85 112.31 279.913 109.779 294.412 112.31C309.947 113.921 330.66 124.754 345.159 140.848C360.551 157.934 364.836 171.342 367.943 195.162V468.573H310.983C310.983 468.573 316.161 267.657 310.983 195.162C306.84 180.203 295.448 170.882 283.02 169.271C261.354 166.463 161.85 167.2 161.85 167.2Z"
//                   fill="#EBEBEB"
//                 />
//                 <path
//                   d="M517.076 112.31H367.943V167.2L517.076 169.271V112.31Z"
//                   fill="#EBEBEB"
//                 />
//               </g>
//             </g>
//             <defs>
//               <filter
//                 id="filter0_d_1874_1262"
//                 x="0.28904"
//                 y="0"
//                 width="629.673"
//                 height="629.673"
//                 filterUnits="userSpaceOnUse"
//                 colorInterpolationFilters="sRGB"
//               >
//                 <feFlood floodOpacity="0" result="BackgroundImageFix" />
//                 <feColorMatrix
//                   in="SourceAlpha"
//                   type="matrix"
//                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                   result="hardAlpha"
//                 />
//                 <feOffset dx="-41.4258" dy="41.4258" />
//                 <feGaussianBlur stdDeviation="4.14258" />
//                 <feComposite in2="hardAlpha" operator="out" />
//                 <feColorMatrix
//                   type="matrix"
//                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0"
//                 />
//                 <feBlend
//                   mode="normal"
//                   in2="BackgroundImageFix"
//                   result="effect1_dropShadow_1874_1262"
//                 />
//                 <feBlend
//                   mode="normal"
//                   in="SourceGraphic"
//                   in2="effect1_dropShadow_1874_1262"
//                   result="shape"
//                 />
//               </filter>
//               <clipPath id="clip0_1874_1262">
//                 <rect width="630" height="630" fill="white" />
//               </clipPath>
//             </defs>
//           </svg>

//           <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
//             Welcome to the GRC Developer Console
//           </h1>
//           <p className="text-lg lg:text-xl text-white/90 leading-relaxed drop-shadow-sm">
//             Empowering compliance through innovation.  
//             Build, manage, and secure organizational governance systems with trust.
//           </p>
//         </div>
//       </section>

//       {/* RIGHT SECTION */}
//       <section className="relative w-full lg:w-1/2 flex justify-center items-center px-8 lg:px-16 py-12  text-gray-100">
//         {/* --- Cyber Gradient Background --- */}
//         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden overflow-y-hidden">
//           <div
//             className="absolute inset-0 opacity-20"
//             style={{
//               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(107,70,193,0.15) 1px, transparent 0)`,
//               backgroundSize: "40px 40px",
//             }}
//           />
//           <div className="absolute inset-0 opacity-10">
//             <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//               <defs>
//                 <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
//                   <path
//                     d="M10 10h20M30 10v20M30 30h20M50 30v20M50 50h20"
//                     stroke="url(#gradient)"
//                     strokeWidth="0.5"
//                     fill="none"
//                   />
//                   <circle cx="30" cy="10" r="2" fill="url(#gradient)" />
//                   <circle cx="30" cy="30" r="2" fill="url(#gradient)" />
//                   <circle cx="50" cy="30" r="2" fill="url(#gradient)" />
//                   <circle cx="50" cy="50" r="2" fill="url(#gradient)" />
//                 </pattern>
//                 <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                   <stop offset="0%" stopColor="#6b46c1" />
//                   <stop offset="100%" stopColor="#d53f8c" />
//                 </linearGradient>
//               </defs>
//               <rect width="100%" height="100%" fill="url(#circuit)" />
//             </svg>
//           </div>
//           <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl"></div>
//         </div>

//         {/* --- Sign-In Form --- */}
//         <div className="relative w-full max-w-md z-10 space-y-8">
//           <h2 className="text-3xl font-bold text-white">Sign in as Developer</h2>
//           <p className="text-sm text-gray-400">
//             Access the Governance, Risk, and Compliance platform securely.
//           </p>

//           <form onSubmit={handleSubmit} className="mt-6 space-y-5">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-300">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="developer@grc-system.com"
//                 className="mt-2 w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#6b46c1] focus:outline-none"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-300">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="mt-2 w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#d53f8c] focus:outline-none"
//               />
//             </div>

//             <div className="flex justify-between items-center text-sm">
//               <div className="flex items-center space-x-2">
//                 <input id="remember" type="checkbox" className="accent-[#6b46c1]" />
//                 <label htmlFor="remember" className="text-gray-400">
//                   Remember me
//                 </label>
//               </div>
//               <a href="#" className="text-[#d53f8c] hover:underline">
//                 Forgot password?
//               </a>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
//             >
//               Sign In
//             </button>

//             {/* <div className="flex items-center justify-center space-x-2">
//               <div className="h-[1px] bg-gray-700 flex-grow" />
//               <span className="text-sm text-gray-500">or</span>
//               <div className="h-[1px] bg-gray-700 flex-grow" />
//             </div> */}

//             {/* <button
//               type="button"
//               onClick={handleGoogleSignIn}
//               className="w-full flex items-center justify-center gap-3 bg-gray-900/60 border border-gray-700 text-gray-300 font-medium py-3 rounded-lg shadow hover:bg-gray-900 transition"
//             >
//               <FcGoogle className="text-xl" /> Sign in with Google
//             </button> */}
//           </form>

//           <div className="mt-6 text-xs text-center text-gray-500">
//             <div className="flex justify-center gap-2 items-center">
//               <Shield className="w-4 h-4 text-gray-400" />
//               Authorized developer access only. Activities are monitored.
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//     </>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "../hooks/use-toast";

export default function DeveloperSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  // Restrict to desktop/laptop only
  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 1024);

    checkWidth(); // only call inside effect, after client mounts
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  if (!isDesktop) {
    // ❌ Completely block mobile users (no message, no UI)
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1️⃣ Collect credentials
      const payload = {
        email,
        password,
      };

      // 2️⃣ Send to Django backend
      const response = await axios.post("http://localhost:8000/api/login/", payload, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true, // if using cookies for session
      });

      // 3️⃣ Handle success
      if (response.status === 200) {
        toast({
          title: "Login Successful 🎉",
          description: "You’ve successfully logged in!",
        });
        router.push("/Dashboard");
      }

      if (response.status >= 500) {
        toast({
          title: "Server Error",
          description: "Please try again later. (500+)",
        });
      }

    } catch (err: any) {
      // 4️⃣ Handle errors gracefully
      console.log("Login failed:", err);

      if (err.response?.status === 401) {
        toast({
          title: "Invalid email or password",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      } else if (err.response?.status === 400) {
        toast({
          title: "Bad Request",
          description: "Please ensure all fields are filled out correctly.",
          variant: "destructive",
        });

      } else {
        toast({
          title: "Login Failed",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
      }
    }
  };


  return (
    <main className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* LEFT SECTION */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 lg:px-16 py-12 text-white bg-gradient-to-r from-[#6b46c1] to-[#d53f8c]">
        <div className="max-w-lg space-y-8 text-center lg:text-left">
          <svg
            width="100"
            height="100"
            viewBox="0 0 630 630"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto lg:mx-0"
          >
            <g clipPath="url(#clip0_1874_1262)">
              <g filter="url(#filter0_d_1874_1262)">
                <path
                  d="M576.108 0H103.854C74.1111 0 50 24.1111 50 53.8536V526.108C50 555.851 74.1111 579.962 103.854 579.962H576.108C605.851 579.962 629.962 555.851 629.962 526.108V53.8536C629.962 24.1111 605.851 0 576.108 0Z"
                  fill="#233DFF"
                />
                <path
                  d="M161.85 167.2V112.31C161.85 112.31 279.913 109.779 294.412 112.31C309.947 113.921 330.66 124.754 345.159 140.848C360.551 157.934 364.836 171.342 367.943 195.162V468.573H310.983C310.983 468.573 316.161 267.657 310.983 195.162C306.84 180.203 295.448 170.882 283.02 169.271C261.354 166.463 161.85 167.2 161.85 167.2Z"
                  fill="#EBEBEB"
                />
                <path
                  d="M517.076 112.31H367.943V167.2L517.076 169.271V112.31Z"
                  fill="#EBEBEB"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_1874_1262"
                x="0.28904"
                y="0"
                width="629.673"
                height="629.673"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="-41.4258" dy="41.4258" />
                <feGaussianBlur stdDeviation="4.14258" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1874_1262"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1874_1262"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_1874_1262">
                <rect width="630" height="630" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
            Welcome to the GRC Developer Console
          </h1>
          <p className="text-lg lg:text-xl text-white/90 leading-relaxed drop-shadow-sm">
            Empowering compliance through innovation.  
            Build, manage, and secure organizational governance systems with trust.
          </p>
        </div>
      </section>

      {/* RIGHT SECTION */}
      <section className="relative w-full lg:w-1/2 flex justify-center items-center px-8 lg:px-16 py-12 text-gray-100">
        {/* --- Cyber Gradient Background --- */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(107,70,193,0.15) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path
                    d="M10 10h20M30 10v20M30 30h20M50 30v20M50 50h20"
                    stroke="url(#gradient)"
                    strokeWidth="0.5"
                    fill="none"
                  />
                  <circle cx="30" cy="10" r="2" fill="url(#gradient)" />
                  <circle cx="30" cy="30" r="2" fill="url(#gradient)" />
                  <circle cx="50" cy="30" r="2" fill="url(#gradient)" />
                  <circle cx="50" cy="50" r="2" fill="url(#gradient)" />
                </pattern>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6b46c1" />
                  <stop offset="100%" stopColor="#d53f8c" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>
        </div>

        {/* --- Sign-In Form --- */}
        <div className="relative w-full max-w-md z-10 space-y-8">
          <h2 className="text-3xl font-bold text-white">Sign in as Developer</h2>
          <p className="text-sm text-gray-400">
            Access the Governance, Risk, and Compliance platform securely.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@grc-system.com"
                className="mt-2 w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#6b46c1] focus:outline-none"
              />
            </div>

            {/* Password + Toggle */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg bg-gray-900/60 border border-gray-700 px-4 py-3 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#d53f8c] focus:outline-none pr-12 transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-2">
                <input id="remember" type="checkbox" className="accent-[#6b46c1]" />
                <label htmlFor="remember" className="text-gray-400">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-[#d53f8c] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-xs text-center text-gray-500">
            <div className="flex justify-center gap-2 items-center">
              <Shield className="w-4 h-4 text-gray-400" />
              Authorized developer access only. Activities are monitored.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
