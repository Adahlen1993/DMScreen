"use client";  // Required for client-side interactivity

import CreateCharacter from "./components/CreateCharacter";
import { useState, useEffect } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);  // To track client-side rendering

  useEffect(() => {
    setIsClient(true);  // Mark component as client-rendered
  }, []);

  if (!isClient) {
    return null;  // Prevent any rendering during the server-side pass
  }

  return (
    <div>
      <h1>Dungeons and Dragons Character</h1>
      <CreateCharacter />
    </div>
  );
}
