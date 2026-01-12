"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SherpaRegister() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const router = useRouter();

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));

    try {
      const res = await fetch("http://127.0.0.1:8000/sherpa/register/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully! Pending verification.");
        router.push("/sherpa");
      } else {
        setErrors(data);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-xl p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Register as Guide
        </h1>

        {errors && (
          <div className="bg-red-50 border border-red-200 p-3 rounded mb-4">
            {Object.entries(errors).map(([k, v]) => (
              <p key={k} className="text-red-600 text-sm">
                <strong>{k}:</strong>{" "}
                {Array.isArray(v) ? v.join(", ") : String(v)}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Experience (years)"
            className="input"
            onChange={e => handleChange("experience_years", e.target.value)}
            required
          />

          <input
            placeholder="Languages"
            className="input"
            onChange={e => handleChange("languages", e.target.value)}
            required
          />

          <input
            placeholder="Region"
            className="input"
            onChange={e => handleChange("region", e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Daily Rate"
            className="input"
            onChange={e => handleChange("daily_rate", e.target.value)}
            required
          />

          <input
            placeholder="Phone"
            className="input"
            onChange={e => handleChange("phone", e.target.value)}
            required
          />

          <input
            type="file"
            className="input"
            onChange={e => handleChange("photo", e.target.files[0])}
            required
          />

          <input
            type="file"
            className="input"
            onChange={e => handleChange("nid_document", e.target.files[0])}
            required
          />

          {/* Availability Checkbox */}
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={form.is_available || false}
              onChange={e => handleChange("is_available", e.target.checked)}
            />
            Available
          </label>

          <button
            disabled={loading}
            className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
