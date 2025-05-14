import React, { useState } from "react";
import "../styles/TreeStyles.css";

const TreeNode = ({ person, isRoot = false }) => {
  const [expanded, setExpanded] = useState(false);
  const hasValidProfileLink = person.social && /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(person.social.trim());

  return (
    <div className={`tree-node ${isRoot ? "root-node" : ""}`}>
      <div className="node-content">
        <strong style={{ color: "#333" }} >{person.name}</strong>
        <div className="text-sm text-gray-600">{person.nameBn}</div>

        {hasValidProfileLink && (
          <a
            href={person.social}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-link"
          >
            Profile ↗
          </a>
        )}

        {person.children?.length > 0 && (
          <button onClick={() => setExpanded(!expanded)} className="expand-btn">
            {expanded ? "− Collapse" : "+ Expand"}
          </button>
        )}
      </div>

      {expanded && person.children?.length > 0 && (
        <div className="tree-children">
          {person.children.map((child) => (
            <TreeNode key={child.id} person={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
