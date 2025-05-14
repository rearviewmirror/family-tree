import React from "react";
import TreeNode from "./components/TreeNode"; // make sure this is the latest version
import familyTree from "./data/familyData";
import "./styles/TreeStyles.css";

const App = () => {
  return (
    <div className="w-full h-screen bg-gray-100 overflow-auto">
      <h1 className="text-3xl font-bold text-center py-6 text-black">
        Family Tree of Nashera Mia Bari
      </h1>
      <div className="tree-container">
        <ul className="tree">
          <TreeNode person={familyTree} isRoot={true} />
        </ul>
      </div>
    </div>
  );
};

export default App;
