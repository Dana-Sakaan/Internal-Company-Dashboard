import { useEffect, useState } from "react";
import axios from "axios";
import { ClipboardList, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getAllRequests();
  }, []);

  const getAllRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/");
      if (response.data.success) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      setError("Something wrong happened. Please try again.");
    }
  };

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/${id}`, {
        status: status,
      });

      if (response.data.success) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status: status } : request,
          ),
        );

        setSuccessMessage("Request status updated successfully.");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      setError("Failed to update request status.");
    }
  };

  const totalRequests = requests.length;

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "border-info/30 bg-info/10 text-info";

      case "In Progress":
        return "border-warning/30 bg-warning/10 text-warning";

      case "Done":
        return "border-success/30 bg-success/10 text-success";

      default:
        return "border-border bg-background text-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-8">
          <Link to="/" className="mb-2 flex text-sm font-medium text-white">
            <ArrowLeft size={18} />
            Back
          </Link>

          <p className="mb-2 text-sm font-medium text-primary-light">
            Dashboard
          </p>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Client Requests
          </h2>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Total Requests</p>

                <p className="mt-2 text-2xl font-bold">{totalRequests}</p>
              </div>

              <div className="rounded-lg bg-primary/10 p-3 text-primary-light">
                <ClipboardList size={21} />
              </div>
            </div>
          </div>
        </div>

        <section className="overflow-hidden rounded-xl border border-border bg-surface">
          {successMessage && (
            <div className="mb-6 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
              {successMessage}
            </div>
          )}

          <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">Recent Requests</h3>

              <p className="mt-1 text-sm text-muted">
                Manage the status of your client requests.
              </p>
            </div>

            <span className="w-fit rounded-full border border-border bg-background px-3 py-1 text-xs text-muted">
              {requests.length} requests
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border bg-background-secondary text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                    Client
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {requests.map((request) => (
                  <tr
                    key={request.id}
                    className="transition-colors hover:bg-background-secondary"
                  >

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary-light">
                          {request.clientName.charAt(0).toUpperCase()}
                        </div>

                        <span className="text-sm font-medium">
                          {request.clientName}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(
                          request.status,
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-right">
                      <select
                        value={request.status}
                        onChange={(e) =>
                          changeStatus(request.id, e.target.value)
                        }
                        className="
                      rounded-lg
                      border border-border
                      bg-background
                      px-3 py-2
                      text-sm
                      text-foreground
                      outline-none
                      transition
                      focus:border-primary
                      focus:ring-2
                      focus:ring-glow
                    "
                      >
                        <option value="New">New</option>

                        <option value="In Progress">In Progress</option>

                        <option value="Done">Done</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
