# Changelog

## December 30, 2025 - Single-Expand-Per-Level Feature Implementation

### 🎯 Major Changes

#### **Single-Expand-Per-Level (Accordion Mode)** - COMPLETED & TESTED ✅
- **Feature**: Only one sibling can be expanded at a time (when enabled)
- **Problem Solved**: Prevents width explosion when multiple large sibling branches expand
- **Configuration**: Controlled by `TREE_CONFIG.singleExpandPerLevel` flag in [src/config/treeConfig.js](src/config/treeConfig.js)

**Implementation Details**:
- Created [src/context/ExpandedNodeContext.jsx](src/context/ExpandedNodeContext.jsx) - React Context for tracking expanded nodes
- Created [src/config/treeConfig.js](src/config/treeConfig.js) - Feature flags and configuration
- Modified [src/components/TreeNode.jsx](src/components/TreeNode.jsx):
  - Added `parentId` prop (passed through entire tree)
  - Updated `handleToggleExpand()` to use Context API
  - Added `useEffect` hook to auto-collapse siblings when another expands
  - Integrated `ExpandedNodeContext` consumption
- Modified [src/App.jsx](src/App.jsx):
  - Wrapped with `ExpandedNodeProvider` component
  - Passes `singleExpandPerLevel` configuration to provider

**How It Works**:
```javascript
// Context tracks: { parentId: expandedChildId }
// When child P1.1 expands:
- setExpandedNode(parentId='P1', nodeId='P1.1')

// When sibling P1.2 expands:
- setExpandedNode(parentId='P1', nodeId='P1.2')
- useEffect in P1.1 detects context change
- P1.1 auto-collapses (setExpanded(false))
- Only P1.2 remains open under parent P1
```

**Bug Fixed During Implementation**:
- Initial implementation tracked by node ID - multiple siblings could expand
- Fixed by tracking `{ parentId: expandedChildId }` instead
- Added `parentId` prop to identify siblings
- Added auto-collapse logic via useEffect

**Configuration**:
```javascript
// In src/config/treeConfig.js
export const TREE_CONFIG = {
  singleExpandPerLevel: true,  // Set to false for multi-expand mode
};
```

### 📝 Files Modified

1. **[src/context/ExpandedNodeContext.jsx](src/context/ExpandedNodeContext.jsx)** - NEW
   - Provider component for expanded node state
   - Functions: setExpandedNode, clearExpandedNode, isNodeExpanded
   - Props: singleExpandPerLevel (boolean)

2. **[src/config/treeConfig.js](src/config/treeConfig.js)** - NEW
   - Feature flags and configuration
   - Currently: singleExpandPerLevel toggle

3. **[src/components/TreeNode.jsx](src/components/TreeNode.jsx)** - Major refactor
   - Added `parentId` prop to component signature
   - Updated `handleToggleExpand()` to use Context
   - Added `useEffect` to watch expanded nodes and auto-collapse
   - Pass `parentId={person.id}` to children TreeNode renders
   - Integrated `useContext(ExpandedNodeContext)`

4. **[src/App.jsx](src/App.jsx)** - Configuration
   - Imported TREE_CONFIG and ExpandedNodeProvider
   - Wrapped JSX with `<ExpandedNodeProvider singleExpandPerLevel={TREE_CONFIG.singleExpandPerLevel}>`
   - Imported ExpandedNodeContext

### 🧪 Testing Results

✅ **Feature Verified Working** (December 30, 2025)
- Desktop: Expanding one sibling collapses previous sibling
- Mobile: Single-expand behavior works on touch devices
- Feature toggle: Can set `singleExpandPerLevel` to true/false
- No console errors
- Performance: No noticeable lag
- Auto-collapse: Smooth and instantaneous

### 🚀 User-Facing Improvements

| Feature | Before | After |
|---------|--------|-------|
| Multiple siblings expanded | ✅ Possible | ❌ Prevented (when enabled) |
| Tree width when expanding | 🔴 Can explode | ✅ Stays controlled |
| Navigation behavior | 🔵 Exploratory (multi-expand) | 🟢 Focused (accordion) |
| Breadcrumb-like behavior | ❌ None | ✅ Available (when enabled) |
| Configurability | ❌ Hardcoded | ✅ Toggle in config file |

---

## December 29, 2025 - Scroll Logic Refactor & Color-by-Level Feature

### 🎯 Major Changes

#### 1. **Scroll Logic Simplified** (Breaking Change - Positive)
- **Removed**: 90+ lines of complex scroll prevention logic
  - Deleted `handleMobileScroll()` function with DOM measurements
  - Deleted `handleDesktopScroll()` with multiple setTimeout loops and requestAnimationFrame
  - Deleted platform detection logic (`window.innerWidth < 768`)
  - Deleted scroll event listener setup in useEffect
  
- **Replaced With**: Single native browser API
  ```javascript
  nodeRef.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  });
  ```

- **Benefits**:
  - ✅ Works identically on mobile and desktop
  - ✅ No more off-screen child cards when expanding large nodes
  - ✅ Better performance (no setTimeout loops)
  - ✅ Cleaner, more maintainable code
  - ✅ Browser-native behavior

#### 2. **Color-by-Level Feature Added** (New Feature)
- Cards now change background color based on generation depth
- **Color Scheme**:
  - Gen 0 (Root): Red tones (`bg-red-50` border `border-red-300`)
  - Gen 1: Blue tones (`bg-blue-50` border `border-blue-300`)
  - Gen 2: Green tones (`bg-green-50` border `border-green-300`)
  - Gen 3: Yellow tones (`bg-yellow-50` border `border-yellow-300`)
  - Gen 4+: Purple tones (`bg-purple-50` border `border-purple-300`)

- **Implementation**:
  - Added `depth` prop to TreeNode component (defaults to 0)
  - Created `getColorClass(depth)` function for color mapping
  - Depth passed recursively: `depth={depth + 1}` for each child
  - Applied via dynamic className: `${getColorClass(depth)}`

#### 3. **Removed Debug Logging**
- Deleted: `console.log('TreeNode rendering: ...)` debug statement
- Cleaner production code

### 📝 Files Modified

1. **[src/App.jsx](src/App.jsx)**
   - Added `depth={0}` to root TreeNode prop

2. **[src/components/TreeNode.jsx](src/components/TreeNode.jsx)** (Major refactor)
   - Component signature: `({ person, isRoot = false, depth = 0, scrollContainerRef })`
   - Removed 90+ lines of scroll logic
   - Added `getColorClass(depth)` function
   - New simplified useEffect for scrollIntoView
   - Applied color classes to card div
   - Pass `depth={depth + 1}` when rendering children
   - Removed all console.log statements

3. **[.ai-context.md](.ai-context.md)**
   - Updated component documentation
   - Added detailed change notes
   - Updated known issues section

### 🧪 Testing Recommendations

1. **Desktop Testing**:
   - Expand nodes with multiple children (5+, 10+)
   - Verify smooth centering behavior
   - Check color progression visually

2. **Mobile Testing** (Chrome on Android/iOS):
   - Test on smaller screens (< 768px)
   - Expand nodes with varying child counts
   - Verify no cards go off-screen to the left
   - Verify smooth scrolling animation

3. **Browser Compatibility**:
   - Chrome: ✅ Full support
   - Firefox: ✅ Full support
   - Safari: ✅ Full support
   - Edge: ✅ Full support
   - IE11: ⚠️ `scrollIntoView()` polyfill may be needed

### 🔄 Migration Notes

- **No breaking changes to data format** - CSV structure remains the same
- **No breaking changes to props** - Only additions (depth parameter)
- **Backward compatible** - depth defaults to 0 if not provided
- **No CSS changes needed** - All color classes use standard Tailwind

### 📊 Code Statistics

- **Lines removed**: ~90 (scroll logic)
- **Lines added**: ~20 (color mapping)
- **Net reduction**: ~70 lines of code
- **Cyclomatic complexity**: Reduced significantly
- **Components improved**: 1 (TreeNode.jsx)

### ✨ User-Facing Improvements

| Before | After |
|--------|-------|
| Cards hidden off-screen left | Cards always visible when expanded |
| Complex scroll behavior | Simple, natural scroll behavior |
| All white cards | Color-coded by generation level |
| Inconsistent mobile/desktop | Identical behavior everywhere |
| Multiple simultaneous timeouts | Single delayed API call |

### 🐛 Known Limitations

- `scrollIntoView()` may not work perfectly with nested scrollable containers (not an issue in current design)
- On very small screens (< 320px width), card might still need manual scrolling
- Color scheme assumes max 5 generations (gracefully degrades to purple for deeper levels)

### 🚀 Future Improvements

1. Add animation/transition when cards change color on expand
2. Consider adding a "level indicator" badge (shows generation depth number)
3. Add option to customize color scheme via config
4. Add accessibility: aria-level attribute for semantic HTML
5. Performance: Consider virtualization if tree grows > 1000 nodes
