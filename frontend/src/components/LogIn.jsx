import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({email:"", password:""})
  const [error,setError] = useState(false)
  const navigate = useNavigate()

const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

  const handleSubmit = (e) => { //a sample user is allowed to access the dashboard
    e.preventDefault();
    try {
        if(formData.email === "test@gmail.com" && formData.password === "test123"){
            navigate("/requests-dashboard")
        }else{
            setError("Wrong Credentials")
        }
    } catch (error) {
        setError("Something wrong happened try again.")
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-muted sm:text-base">
            Sign in to your account to continue
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-8">
          
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="
                  w-full rounded-lg
                  border border-border
                  bg-background
                  px-4 py-3
                  text-sm text-foreground
                  outline-none
                  placeholder:text-muted
                  transition
                  focus:border-primary
                  focus:ring-2
                  focus:ring-glow
                "
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-primary-light transition hover:text-primary-bright"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="
                    w-full rounded-lg
                    border border-border
                    bg-background
                    px-4 py-3 pr-11
                    text-sm text-foreground
                    outline-none
                    placeholder:text-muted
                    transition
                    focus:border-primary
                    focus:ring-2
                    focus:ring-glow
                  "
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute right-3 top-1/2
                    -translate-y-1/2
                    text-muted
                    transition
                    hover:text-foreground
                  "
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="
                flex w-full items-center justify-center gap-2
                rounded-lg
                bg-primary
                px-4 py-3
                text-sm font-semibold text-white
                transition
                cursor-pointer
                hover:bg-primary-bright
                focus:outline-none
                focus:ring-2
                focus:ring-primary-light
                focus:ring-offset-2
                focus:ring-offset-surface
              "
            >
              <LogIn size={18} />
              Sign In
            </button>
          </form>

          {error && <p className="text-center text-error">{error}</p>}

          <p className="mt-6 text-center text-sm text-muted">
            Don't have an account?
            <button
              type="button"
              className="font-medium text-primary-light transition hover:text-primary-bright"
            >
              Create an account
            </button>
          </p>
        </div>

      </div>
    </main>
  );
};

export default Login;
