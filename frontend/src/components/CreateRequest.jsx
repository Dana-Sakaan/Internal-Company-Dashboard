import { useState } from "react";
import { Eye, EyeOff, LogIn, PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from './../../node_modules/axios/lib/axios';

const CreateRequest = () => {
  const [clientName, setClientName] = useState("")
  const [error,setError] = useState(false)
  const [success,setSuccess] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/", {clientName});

      if (response.data.success) {
       setSuccess("Client request created successfully.")
       setError(false)
  }else{
    setSuccess(false)
    setError("Cant create client request")
  }
    } catch (error) {     
        setSuccess(false)
        setError("Something wrong happened try again.")
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Create Client Request
          </h1>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-8">
          
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Client Name
              </label>

              <input
                id="cName"
                type="text"
                placeholder="Bilal Sa"
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
                onChange={(e)=> setClientName(e.target.value)}
              />
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
              <PlusCircle size={18} />
              Create client request
            </button>
          </form>

          {error && <p className=" p-3 text-center text-error">{error}</p>}
          {success && <><p className="p-3 text-center text-success">{success}</p> 
          <Link to="/requests-dashboard" className="p-2 text-center text-primary">Dashboard</Link></>}

        </div>

      </div>
    </main>
  );
};

export default CreateRequest;
