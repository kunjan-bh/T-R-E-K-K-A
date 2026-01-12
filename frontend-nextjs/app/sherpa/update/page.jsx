"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SherpaUpdate() {
  const [form, setForm] = useState({
        experience_years: "",
        languages: "",
        region: "",
        daily_rate: "",
        phone: "",
        is_available: false,
        photo: null,
        nid_document: null,
        current_photo: null,
        current_nid: null,
    });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  // Get token safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const t =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");
      setToken(t);
    }
  }, []);

  // Fetch sherpa data
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/sherpa/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setForm({
            experience_years: data.experience_years ?? "",
            languages: data.languages ?? "",
            region: data.region ?? "",
            daily_rate: data.daily_rate ?? "",
            phone: data.phone ?? "",
            is_available: !!data.is_available,
            photo: null,
            nid_document: null,
            current_photo: data.photo ?? null,
            current_nid: data.nid_document ?? null,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    if (!token) return;

    const fd = new FormData();

    // Files only if changed
    if (form.photo) fd.append("photo", form.photo);
    if (form.nid_document) fd.append("nid_document", form.nid_document);

    // Normal fields
    fd.append("experience_years", form.experience_years);
    fd.append("languages", form.languages);
    fd.append("region", form.region);
    fd.append("daily_rate", form.daily_rate);
    fd.append("phone", form.phone);

    // Boolean explicitly
    fd.append("is_available", form.is_available ? "true" : "false");

    try {
      const res = await fetch("http://127.0.0.1:8000/sherpa/update/", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile updated successfully");
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
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow my-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Update Your Info
      </h1>

      {errors && (
        <div className="bg-red-100 p-3 rounded mb-4">
          {Object.entries(errors).map(([k, v]) => (
            <div key={k}>
              <strong>{k}:</strong>{" "}
              {Array.isArray(v) ? v.join(", ") : String(v)}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Experience (years)"
          value={form.experience_years}
          onChange={e => handleChange("experience_years", e.target.value)}
          className="input"
          required
        />

        <input
          placeholder="Languages"
          value={form.languages}
          onChange={e => handleChange("languages", e.target.value)}
          className="input"
          required
        />

        <input
          placeholder="Region"
          value={form.region}
          onChange={e => handleChange("region", e.target.value)}
          className="input"
          required
        />

        <input
          type="number"
          placeholder="Daily Rate"
          value={form.daily_rate}
          onChange={e => handleChange("daily_rate", e.target.value)}
          className="input"
          required
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={e => handleChange("phone", e.target.value)}
          className="input"
          required
        />

        {form.current_photo && (
          <div>
            <p className="text-sm">Current Photo:</p>
            <img
              src={form.current_photo}
              className="w-24 h-24 rounded-full"
            />
          </div>
        )}

        <input
          type="file"
          onChange={e => handleChange("photo", e.target.files[0])}
          className="input"
        />

        {form.current_nid && (
          <div>
            <p className="text-sm">Current NID:</p>
            <a
              href={form.current_nid}
              target="_blank"
              className="text-blue-600 underline"
            >
              View NID
            </a>
          </div>
        )}

        <input
          type="file"
          onChange={e => handleChange("nid_document", e.target.files[0])}
          className="input"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.is_available}
            onChange={e => handleChange("is_available", e.target.checked)}
          />
          Available
        </label>

        <button
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-lg"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
