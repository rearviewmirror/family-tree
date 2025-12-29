import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import "../styles/TreeStyles.css";

const TreeNode = ({ person, isRoot = false, scrollContainerRef }) => {
  const [expanded, setExpanded] = useState(false);
  const nodeRef = useRef(null);
  const hasValidProfileLink = person.social && /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(person.social.trim());

  // Debug: Log the person data to understand the structure
  console.log('TreeNode rendering:', { 
    name: person.name, 
    hasChildren: person.children?.length > 0,
    childrenCount: person.children?.length || 0,
    isExpanded: expanded,
    isRoot 
  });

  // Add scroll event listener to detect ANY scrolling - only on root node to avoid duplicates
  useEffect(() => {
    if (isRoot && scrollContainerRef?.current) {
      const container = scrollContainerRef.current;
      
      const scrollHandler = (e) => {
        // Removed debug logs
      };
      
      container.addEventListener('scroll', scrollHandler, { passive: true });
      return () => container.removeEventListener('scroll', scrollHandler);
    }
  }, [isRoot, scrollContainerRef]);

  // Separate mobile scrolling logic
  const handleMobileScroll = () => {
    if (!nodeRef.current || !scrollContainerRef?.current) {
      return;
    }

    const container = scrollContainerRef.current;
    const nodeRect = nodeRef.current.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Find all children nodes
    const childrenContainer = nodeRef.current.querySelector('.tree-children');
    if (childrenContainer) {
      const childrenRect = childrenContainer.getBoundingClientRect();
      
      // Mobile: More aggressive scrolling to show all children
      const leftMost = Math.min(nodeRect.left, childrenRect.left);
      const rightMost = Math.max(nodeRect.right, childrenRect.right);
      
      // Check if we need to scroll left to show leftmost child
      if (leftMost < containerRect.left) {
        const scrollAmount = leftMost - containerRect.left - 20;
        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
      // Check if we need to scroll right to show rightmost child
      else if (rightMost > containerRect.right) {
        const scrollAmount = rightMost - containerRect.right + 20;
        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  // Separate desktop scrolling logic (very minimal)
  const handleDesktopScroll = () => {
    // Desktop: NO automatic scrolling - let users control their viewport
    // This prevents the disruptive scrolling behavior on desktop
    
    // Additional prevention: store and restore scroll position
    if (scrollContainerRef?.current) {
      const container = scrollContainerRef.current;
      const currentScrollLeft = container.scrollLeft;
      const currentScrollTop = container.scrollTop;
      
      // Monitor and prevent any scroll changes multiple times
      const preventScroll = () => {
        if (container.scrollLeft !== currentScrollLeft || container.scrollTop !== currentScrollTop) {
          container.scrollLeft = currentScrollLeft;
          container.scrollTop = currentScrollTop;
        }
      };
      
      // Check immediately and then again after a short delay
      requestAnimationFrame(preventScroll);
      setTimeout(preventScroll, 100);
      setTimeout(preventScroll, 200);
      setTimeout(preventScroll, 300);
    }
  };

  useEffect(() => {
    if (expanded && nodeRef.current && scrollContainerRef?.current) {
      // Check if we're on mobile (screen width < 768px)
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // Small delay to ensure DOM has updated with expanded children
        const timeoutId = setTimeout(() => {
          handleMobileScroll();
        }, 100);
        
        return () => clearTimeout(timeoutId);
      } else {
        // Desktop: Active prevention of unwanted scrolling
        const timeoutId = setTimeout(() => {
          handleDesktopScroll();
        }, 50);
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [expanded, scrollContainerRef, person.name]);

  return (
    <div className={`tree-node ${isRoot ? "root-node" : ""}`} ref={nodeRef}>
      <div className="bg-white border border-primary rounded-md shadow-sm p-2 text-center w-36 text-xs min-w-max">
        <div className="font-bold text-gray-800 leading-tight">{person.name}</div>
        <div className="text-gray-500 text-[11px] leading-tight mt-1">{person.nameBn}</div>
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
                setExpanded(!expanded);
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
              scrollContainerRef={scrollContainerRef}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
