import React, { useState, useRef, useEffect, useContext } from "react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { ExpandedNodeContext } from "../context/ExpandedNodeContext";
import "../styles/TreeStyles.css";

const TreeNode = ({ person, isRoot = false, depth = 0, scrollContainerRef, parentId = null }) => {
  const [expanded, setExpanded] = useState(false);
  const nodeRef = useRef(null);
  const expandedNodeContext = useContext(ExpandedNodeContext);
  const hasValidProfileLink = person.social && /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(person.social.trim());

  // Color mapping by depth/generation level
  const getColorClass = (depth) => {
    const colors = [
      'bg-red-50 border-red-300',      // Level 0 (root)
      'bg-blue-50 border-blue-300',    // Level 1
      'bg-green-50 border-green-300',  // Level 2
      'bg-yellow-50 border-yellow-300', // Level 3
      'bg-purple-50 border-purple-300', // Level 4+
    ];
    return colors[Math.min(depth, colors.length - 1)];
  };

  // Handle expand/collapse with single-expand-per-level support
  const handleToggleExpand = () => {
    const newExpandedState = !expanded;
    
    if (newExpandedState && expandedNodeContext && expandedNodeContext.singleExpandPerLevel && parentId) {
      // When expanding in single-expand mode, collapse siblings by tracking this parent's expanded child
      expandedNodeContext.setExpandedNode(parentId, person.id);
    } else if (!newExpandedState && expandedNodeContext && expandedNodeContext.singleExpandPerLevel && parentId) {
      // When collapsing, clear this node from expanded tracking
      expandedNodeContext.clearExpandedNode(parentId);
    }
    
    setExpanded(newExpandedState);
  };

  // Simplified scroll behavior: center the node when expanded
  useEffect(() => {
    if (expanded && nodeRef.current) {
      // Small delay to ensure DOM has updated with expanded children
      const timeoutId = setTimeout(() => {
        nodeRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [expanded]);

  // In single-expand mode, auto-collapse if a sibling got expanded
  useEffect(() => {
    if (expandedNodeContext && expandedNodeContext.singleExpandPerLevel && parentId && expanded) {
      const expandedChild = expandedNodeContext.expandedNodes[parentId];
      
      // If a different sibling is now expanded, collapse this one
      if (expandedChild && expandedChild !== person.id) {
        setExpanded(false);
      }
    }
  }, [expandedNodeContext?.expandedNodes, parentId, person.id, expandedNodeContext?.singleExpandPerLevel, expanded]);

  return (
    <div className={`tree-node ${isRoot ? "root-node" : ""}`} ref={nodeRef}>
      <div className={`${getColorClass(depth)} border rounded-md shadow-sm p-2 text-center w-36 text-xs min-w-max`}>
        <div className="font-bold text-gray-800 leading-tight">{person.name}</div>
        <div className="text-gray-600 text-[11px] leading-tight mt-1">{person.nameBn}</div>
        {hasValidProfileLink && (
          <a
            href={person.social}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-[10px] inline-block mt-1"
          >
            Profile ↗
          </a>
        )}
        {person.children?.length > 0 && (
          <div className="mt-2 flex justify-center w-full">
            <button
              onClick={(e) => {
                handleToggleExpand();
                // Blur the button to prevent browser autoscroll on focus
                e.target.blur();
              }}
              className="chevron-btn p-1.5 rounded-full border border-base-content text-base-content hover:bg-base-content hover:text-base-100 transition duration-150 touch-manipulation"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? (
                <ChevronUpIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <ChevronDownIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </button>
          </div>
        )}
      </div>

      {expanded && person.children?.length > 0 && (
        <div className="tree-children">
          {person.children.map((child) => (
            <TreeNode
              key={child.id}
              person={child}
              depth={depth + 1}
              parentId={person.id}
              scrollContainerRef={scrollContainerRef}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
