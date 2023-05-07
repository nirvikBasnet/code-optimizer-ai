import React from "react";
import CodeForm from "./components/CodeForm";
const App: React.FC = () => {

  return (
    <div className="app bg-gray-20">
      <h1 className="flex flex-col justify-center items-center">CodeOptimizer.ai</h1>
      <CodeForm />
    </div>
  );
};

export default App;
