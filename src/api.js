// src/api.js
const BASE_URL = "https://crisp-ui-nation.onrender.com";

export async function getMeta() {
  const res = await fetch(`${BASE_URL}/meta`);
  return res.json();
}

export async function getRecommendations(userProfile) {
  const res = await fetch(`${BASE_URL}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userProfile),
  });
  return res.json();
}

export async function sendFeedback(internshipId, feedback) {
  const res = await fetch(`${BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ internshipId, feedback }),
  });
  return res.json();
}

