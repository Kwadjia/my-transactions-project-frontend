import { useEffect, useState } from "react";

const RailsToReactTest = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/test")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching:", error));
  }, []);

  return (
    <div>
      <h1>React + Rails Connection Test</h1>
      <p>{message}</p>
    </div>
  );
};

export default RailsToReactTest;
