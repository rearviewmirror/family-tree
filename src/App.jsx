import React from "react";
import TreeNode from "./components/TreeNode"; // make sure this is the latest version
import familyTree from "./data/familyData";
import "./styles/TreeStyles.css";

const App = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-base-100 overflow-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary text-center my-4">
          Family Tree of Nashera Mia Bari
        </h1>
        <div className="tree-container">
          <ul className="tree">
            <TreeNode person={familyTree} isRoot={true} />
          </ul>
        </div>
      </div>

      {/* Footer with credit */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Built by Shahbaz Khan © {new Date().getFullYear()}</p>
        </aside>
      </footer>
    </>
  );
};

export default App;
