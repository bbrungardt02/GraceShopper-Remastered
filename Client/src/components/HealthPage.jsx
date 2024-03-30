import { useEffect, useState } from "react";

function Health() {
  const [healthMsg, setHealthMsg] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw {
            message: "Api is Down 😭",
          };
        }
        const { message } = await response.json();
        setHealthMsg(message);
      } catch (error) {
        setErr(error.message);
      }
    }
    checkHealth();
  }, []);

  return (
    <div className="route_flex">
      <h1>Welcome to Grace Shopper</h1>
      {healthMsg && <p>{healthMsg}</p>}
      {err && <p>{err}</p>}
    </div>
  );
}

export default Health;
