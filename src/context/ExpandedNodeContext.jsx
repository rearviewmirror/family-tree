import React, { createContext, useState, useCallback } from 'react';

// Context to track which node is expanded at each parent level
export const ExpandedNodeContext = createContext();

export const ExpandedNodeProvider = ({ children, singleExpandPerLevel }) => {
  // Store: { parentId: expandedChildId }
  const [expandedNodes, setExpandedNodes] = useState({});

  const setExpandedNode = useCallback(
    (parentId, nodeId) => {
      setExpandedNodes((prev) => ({
        ...prev,
        [parentId]: nodeId,
      }));
    },
    []
  );

  const clearExpandedNode = useCallback((parentId) => {
    setExpandedNodes((prev) => {
      const newState = { ...prev };
      delete newState[parentId];
      return newState;
    });
  }, []);

  const isNodeExpanded = useCallback(
    (parentId, nodeId) => {
      return expandedNodes[parentId] === nodeId;
    },
    [expandedNodes]
  );

  const shouldCollapseOthers = useCallback((parentId, nodeId) => {
    // If single expand mode is on and another node is already expanded
    if (singleExpandPerLevel && expandedNodes[parentId] && expandedNodes[parentId] !== nodeId) {
      return true;
    }
    return false;
  }, [expandedNodes, singleExpandPerLevel]);

  return (
    <ExpandedNodeContext.Provider
      value={{
        expandedNodes,
        setExpandedNode,
        clearExpandedNode,
        isNodeExpanded,
        shouldCollapseOthers,
        singleExpandPerLevel,
      }}
    >
      {children}
    </ExpandedNodeContext.Provider>
  );
};
