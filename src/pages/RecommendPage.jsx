// src/pages/RecommendPage.jsx
import React, { useState, useEffect } from "react";
import { getMeta, getRecommendations, sendFeedback } from "../api";

export default function RecommendPage() {
  const [meta, setMeta] = useState({});
  const [profile, setProfile] = useState({
    skills: "",
    sector: "",
    location: "",
    education: "",
  });
  const [results, setResults] = useState([]);

  useEffect(() => {
    getMeta().then(setMeta);
  }, []);

  const handleRecommend = async () => {
    const data = await getRecommendations(profile);
    setResults(data.results);
  };

  const handleFeedback = async (id, fb) => {
    await sendFeedback(id, fb);
    alert("✅ Feedback sent!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Internship Recommendation</h2>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={profile.skills}
          onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
          className="border p-2 rounded"
        />

        <select
          value={profile.sector}
          onChange={(e) => setProfile({ ...profile, sector: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Sector</option>
          {meta.sectors?.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Location</option>
          {meta.locations?.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <select
          value={profile.education}
          onChange={(e) => setProfile({ ...profile, education: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Education</option>
          {meta.educations?.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>

        <button
          onClick={handleRecommend}
          className="bg-green-600 text-white px-4 py-2 rounded mt-2"
        >
          Recommend
        </button>
      </div>

      <div className="mt-6">
        {results.map((r) => (
          <div key={r.id} className="border rounded p-4 mb-3 shadow">
            <h3 className="text-lg font-semibold">{r.title}</h3>
            <p className="text-sm text-gray-600">Location: {r.location}</p>
            <p className="text-sm text-gray-600">Sector: {r.sector}</p>
            <p className="text-sm">Match Score: <b>{r.matchScore}</b></p>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleFeedback(r.id, "useful")}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Useful
              </button>
              <button
                onClick={() => handleFeedback(r.id, "not_useful")}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Not Useful
              </button>
              <button
                onClick={() => handleFeedback(r.id, "applied")}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Applied
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
