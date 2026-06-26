import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

// ─── SVG Illustrations ────────────────────────────────────────────────────────

const HireFlowLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="10" fill="white" fillOpacity="0.15" />
    <path d="M8 10h6v16H8zM22 10h6v16h-6zM14 17h8v2h-8z" fill="white" />
  </svg>
);

const EyeOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

// ─── Floating Stat Card ───────────────────────────────────────────────────────

const StatCard = ({ value, label, icon, className }) => (
  <div className={`absolute flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-xl ${className}`}>
    <div className="text-2xl">{icon}</div>
    <div>
      <p className="text-white font-bold text-lg leading-none">{value}</p>
      <p className="text-blue-100 text-xs mt-0.5">{label}</p>
    </div>
  </div>
);

// ─── Abstract HR Illustration ─────────────────────────────────────────────────

const HRIllustration = () => (
  <svg viewBox="0 0 480 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md mx-auto">
    {/* Background circles */}
    <circle cx="240" cy="190" r="150" fill="white" fillOpacity="0.04" />
    <circle cx="240" cy="190" r="110" fill="white" fillOpacity="0.04" />

    {/* Org chart connecting lines */}
    <line x1="240" y1="80" x2="240" y2="130" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 3" />
    <line x1="240" y1="130" x2="140" y2="180" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 3" />
    <line x1="240" y1="130" x2="340" y2="180" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 3" />
    <line x1="140" y1="210" x2="100" y2="260" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 3" />
    <line x1="140" y1="210" x2="180" y2="260" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 3" />
    <line x1="340" y1="210" x2="300" y2="260" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 3" />
    <line x1="340" y1="210" x2="380" y2="260" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 3" />

    {/* Top node – CEO */}
    <circle cx="240" cy="60" r="28" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
    <circle cx="240" cy="52" r="10" fill="white" fillOpacity="0.6" />
    <path d="M220 76 Q240 68 260 76" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" fill="none" />

    {/* Level 2 nodes */}
    {[
      { cx: 140, cy: 195 },
      { cx: 340, cy: 195 },
    ].map(({ cx, cy }, i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="22" fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
        <circle cx={cx} cy={cy - 6} r="8" fill="white" fillOpacity="0.55" />
        <path d={`M${cx - 14} ${cy + 12} Q${cx} ${cy + 6} ${cx + 14} ${cy + 12}`} stroke="white" strokeOpacity="0.55" strokeWidth="1.3" fill="none" />
      </g>
    ))}

    {/* Level 3 nodes */}
    {[100, 180, 300, 380].map((cx, i) => (
      <g key={i}>
        <circle cx={cx} cy={275} r="17" fill="white" fillOpacity="0.09" stroke="white" strokeOpacity="0.25" strokeWidth="1.2" />
        <circle cx={cx} cy={269} r="6" fill="white" fillOpacity="0.45" />
        <path d={`M${cx - 10} ${cx === 100 || cx === 300 ? 287 : 287} Q${cx} ${283} ${cx + 10} ${287}`} stroke="white" strokeOpacity="0.45" strokeWidth="1" fill="none" />
      </g>
    ))}

    {/* Decorative sparkles */}
    {[
      { x: 60, y: 120, s: 6 },
      { x: 420, y: 100, s: 5 },
      { x: 400, y: 300, s: 4 },
      { x: 70, y: 320, s: 5 },
    ].map(({ x, y, s }, i) => (
      <g key={i}>
        <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx="1" fill="white" fillOpacity="0.4" transform={`rotate(45 ${x} ${y})`} />
      </g>
    ))}

    {/* Analytics bar (bottom) */}
    <rect x="150" y="320" width="180" height="40" rx="12" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.2" />
    {[0, 1, 2, 3, 4].map((i) => {
      const heights = [18, 28, 22, 32, 14];
      const h = heights[i];
      return (
        <rect key={i} x={168 + i * 30} y={350 - h} width="14" height={h} rx="3" fill="white" fillOpacity={0.25 + i * 0.08} />
      );
    })}
  </svg>
);

// ─── Main Login Component ──────────────────────────────────────────────────────

export default function Login() {
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      navigate("/", { replace: true });
    }
  }, [user, authLoading, navigate]);

  // ── Validation ──────────────────────────────────────────────────────────────

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  }, [formData]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await login({ email: formData.email, password: formData.password });
      toast.success("Signed in successfully. Welcome back!");
      navigate("/");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Sign-in failed. Please check your credentials.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enter key submits form from any field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <SpinnerIcon />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 overflow-hidden">

      {/* ── Left Branding Panel ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[58%] relative flex-col justify-between overflow-hidden">

        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700" />

        {/* Layered ambient shapes */}
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full bg-indigo-600/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-400/10 blur-2xl" />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col h-full px-14 py-12">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <HireFlowLogo />
            <span className="text-white text-xl font-semibold tracking-tight">HireFlow</span>
          </div>

          {/* Central copy + illustration */}
          <div className="flex-1 flex flex-col justify-center -mt-8">
            <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-4">
              Enterprise HRMS
            </p>
            <h1 className="text-white text-5xl font-bold leading-tight tracking-tight max-w-sm">
              Welcome<br />Back
            </h1>
            <p className="text-blue-100/80 mt-4 text-base max-w-xs leading-relaxed">
              Manage your workforce, payroll, and performance — all from one intelligent platform.
            </p>

            {/* Illustration */}
            <div className="relative mt-10">
              <HRIllustration />

              {/* Floating stat cards */}
              <StatCard
                value="98.4%"
                label="Retention rate"
                icon="📈"
                className="top-2 left-0 scale-90 origin-top-left"
              />
              <StatCard
                value="4,200+"
                label="Active employees"
                icon="👥"
                className="bottom-4 right-0 scale-90 origin-bottom-right"
              />
              <StatCard
                value="12 min"
                label="Avg. onboarding time"
                icon="⚡"
                className="bottom-24 left-2 scale-90 origin-bottom-left"
              />
            </div>
          </div>

          {/* Footer tag */}
          <p className="text-blue-200/50 text-xs mt-6">
            © {new Date().getFullYear()} HireFlow Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Right Login Panel ────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-5 py-12 lg:py-0 lg:px-16 bg-slate-950 relative">

        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-900/20 blur-3xl pointer-events-none" />

        {/* Mobile logo */}
        <div className="absolute top-7 left-6 flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <HireFlowLogo />
          </div>
          <span className="text-white font-semibold text-base">HireFlow</span>
        </div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-md">

          {/* Glass card */}
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-white text-3xl font-bold tracking-tight">Sign in</h2>
              <p className="text-slate-400 text-sm mt-2">
                Continue to your HireFlow workspace.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-slate-300 text-sm font-medium mb-1.5"
                >
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="you@company.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                  className={`w-full bg-white/[0.06] text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm border transition-all duration-150 outline-none
                    focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/50
                    ${errors.email
                      ? "border-red-500/60 focus:ring-red-500/40"
                      : "border-white/10 hover:border-white/20"
                    }`}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="text-red-400 text-xs mt-1.5">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block text-slate-300 text-sm font-medium mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your password"
                    aria-describedby={errors.password ? "password-error" : undefined}
                    aria-invalid={!!errors.password}
                    className={`w-full bg-white/[0.06] text-white placeholder-slate-500 rounded-xl px-4 py-3 pr-11 text-sm border transition-all duration-150 outline-none
                      focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/50
                      ${errors.password
                        ? "border-red-500/60 focus:ring-red-500/40"
                        : "border-white/10 hover:border-white/20"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-0.5"
                  >
                    {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" role="alert" className="text-red-400 text-xs mt-1.5">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between mb-7">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="w-4 h-4 rounded border border-white/20 bg-white/[0.06] peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-slate-950" />
                    <svg
                      className="absolute inset-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path d="M3.5 8l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-slate-400 text-sm select-none group-hover:text-slate-300 transition-colors">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  className="text-blue-400 text-sm hover:text-blue-300 transition-colors focus:outline-none focus-visible:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl px-5 py-3.5 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 shadow-lg shadow-blue-600/25"
              >
                {isSubmitting ? (
                  <>
                    <SpinnerIcon />
                    <span>Signing in…</span>
                  </>
                ) : (
                  "Sign in to HireFlow"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-slate-600 text-xs">SECURE LOGIN</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6">
              {[
                { icon: "🔒", label: "256-bit TLS" },
                { icon: "🛡️", label: "SOC 2 Type II" },
                { icon: "✅", label: "GDPR Ready" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 opacity-50">
                  <span className="text-lg">{icon}</span>
                  <span className="text-slate-500 text-[10px] font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer help */}
          <p className="text-center text-slate-600 text-xs mt-6">
            Need help?{" "}
            <button
              type="button"
              className="text-slate-400 hover:text-slate-300 transition-colors underline underline-offset-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
            >
              Contact your IT administrator
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}