import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function App() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div>
      {isLoginView ? (
        <Login onSwitch={() => setIsLoginView(false)} />
      ) : (
        <Signup onSwitch={() => setIsLoginView(true)} />
      )}
    </div>
  );
}
