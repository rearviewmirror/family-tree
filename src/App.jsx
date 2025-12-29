import React, { useRef } from "react";
import TreeNode from "./components/TreeNode";
import familyTree from "./data/familyData";
import "./styles/TreeStyles.css";

const App = () => {
  const containerRef = useRef(null);

  return (
    <>
      <div ref={containerRef} className="w-full min-h-screen bg-base-100 overflow-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary text-center my-4 px-4">
          Family Tree of Nashera Mia Bari
        </h1>
        <div className="tree-container">
          <ul className="tree">
            <TreeNode person={familyTree} isRoot={true} scrollContainerRef={containerRef} />
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p className="text-sm">Built by Shahbaz Khan © {new Date().getFullYear()}</p>
        </aside>
      </footer>
    </>
  );
};

export default App;
