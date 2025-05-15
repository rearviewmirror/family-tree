import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import "../styles/TreeStyles.css";

const TreeNode = ({ person, isRoot = false }) => {
  const [expanded, setExpanded] = useState(false);
  const hasValidProfileLink = person.social && /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(person.social.trim());

  return (
    <div className={`tree-node ${isRoot ? "root-node" : ""}`}>
      <div className="bg-white border border-primary rounded-md shadow-sm p-2 text-center w-36 text-xs">
  <div className="font-bold text-gray-800">{person.name}</div>
  <div className="text-gray-500 text-[11px]">{person.nameBn}</div>
  {hasValidProfileLink && (
    <a
      href={person.social}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline text-[10px]"
    >
      Profile ↗
    </a>
  )}
  {person.children?.length > 0 && (
    <div className="mt-1 text-right w-full">
    <button onClick={() => setExpanded(!expanded)} className="chevron-btn p-2 rounded-full border border-base-content text-base-content hover:bg-base-content hover:text-base-100 transition duration-150"
      aria-label={expanded ? "Collapse" : "Expand"}
>
      {expanded ? (
        <ChevronUpIcon className="h-4 w-4" />
      ) : (
        <ChevronDownIcon className="h-4 w-4" />
      )}
    </button>
    </div>
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
