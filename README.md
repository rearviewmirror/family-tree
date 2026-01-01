# family-tree

An interactive family tree visualization for Nashera Mia Bari built with React, Vite, Tailwind CSS, and DaisyUI.

## Features

- 📊 Interactive collapsible family tree visualization
- 🔄 Single-expand-per-level mode (accordion-style navigation)
- 🌍 Bilingual support (English & Bengali)
- 📱 Responsive design (mobile & desktop)
- 🎨 Color-coded by generation level (visual hierarchy)
- 🔗 Social media profile links
- 🎨 Beautiful UI with Tailwind CSS and DaisyUI
- ⚡ Fast build and development with Vite

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

Run the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building

Build the project for production:

```bash
npm run build
```

This generates an optimized build in the `dist/` folder and automatically creates a CNAME file with the custom domain.

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality:

```bash
npm run lint
```

## Deployment

This project is configured for deployment to GitHub Pages with a custom domain.

### Prerequisites for Deployment

1. **GitHub Repository**: Push your code to a GitHub repository
2. **Custom Domain** (optional): The project uses `nashera-miabari.shahbazkhan.co.uk`
3. **GitHub Pages enabled**: Ensure GitHub Pages is enabled in your repository settings

### Deploying to GitHub Pages

**Option 1: Using the deploy script**

```bash
./deploy.sh
```
The script will:
 
\|https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/https://nashera-miabari.shahbazkhan.co.uk/fo=p[l;,/       ]
- Clean the dist folder
- Build the project
- Set up the CNAME file with the custom domain
- Deploy using gh-pages

**Option 2: Manual deployment**

```bash
npm run build
npx gh-pages -d dist
```

### Custom Domain Setup

If using a custom domain:

1. Update the domain in [deploy.sh](deploy.sh) (change `CUSTOM_DOMAIN` variable)
2. Update your domain's DNS settings to point to GitHub Pages
3. Enable "Enforce HTTPS" in GitHub repository settings

### Environment Variables

The deployed domain is set in:
- [package.json](package.json) - `homepage` field
- [deploy.sh](deploy.sh) - `CUSTOM_DOMAIN` variable
- [vite.config.js](vite.config.js) - `base` path

## Project Structure

```
family-tree/
├── src/
│   ├── components/
│   │   └── TreeNode.jsx              # Individual tree node component
│   ├── context/
│   │   └── ExpandedNodeContext.jsx   # Context for tracking expanded nodes
│   ├── config/
│   │   └── treeConfig.js             # Feature flags and configuration
│   ├── data/
│   │   ├── familyData.js             # Parses CSV and builds tree structure
│   │   └── familyTree.csv            # Family data in CSV format
│   ├── styles/
│   │   └── TreeStyles.css            # Custom tree styling
│   ├── App.jsx                       # Main app component
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
├── index.html                        # HTML entry point
├── package.json                      # Dependencies and scripts
├── vite.config.js                    # Vite configuration
├── tailwind.config.cjs               # Tailwind CSS config
├── postcss.config.cjs                # PostCSS config
├── deploy.sh                         # Deployment script
└── CHANGELOG.md                      # Version history and changes
```

## Data Format

Family data is stored in [src/data/familyTree.csv](src/data/familyTree.csv) with the following columns:

| Column | Description |
|--------|-------------|
| `id` | Unique identifier |
| `parentId` | ID of parent node (empty for root) |
| `name` | English name |
| `nameBn` | Bengali name |
| `photo` | Path to photo file |
| `social` | URL to social profile/website |

## Technologies Used

- **React 19**: UI library
- **Vite 6**: Build tool and dev server
- **Tailwind CSS 3**: Utility-first CSS
- **DaisyUI 5**: Component library built on Tailwind
- **PapaParse**: CSV parsing
- **Heroicons**: Icon library
- **ESLint**: Code quality

## Future Features & Roadmap

### 1. Partner/Spouse Names Feature
**Description**: Add support for partner/spouse relationship in family tree visualization  
**User Value**: Shows complete family units and relationship context  
**Technical Requirements**:
- Add `partnerId` column to CSV schema
- Modify data structure to handle bidirectional relationships
- Update TreeNode to display partner name alongside primary person
- Add visual styling for partner cards (linked or nested layout)

**Proposed CSV Structure** (Recommended - Option 1):
```
id, parentId, partnerId, name, nameBn, photo, social
1,  ,         ,          "Syed Shorafat Hossain", ..., sharafat.jpg
2,  1,        11,        "Syed Ekramul Haque", ..., son-a.jpg
11, ,         2,         "His Spouse Name", ..., spouse-photo.jpg
3,  2,        ,          "Syed Moazzem Hossain", ..., (child of id 2 & 11)
```
- `partnerId` = ID of spouse (bidirectional link: 2↔11)
- Children point to only ONE parent (parent 2) but inherit both parents through partnership
- Empty `partnerId` for single/widowed people

**Visual Representation**:
```
┌──────────────────┐   ┌──────────────────┐
│  Person A (id 2) │──┤ Spouse B (id 11) │  ← Linked cards (married)
└──────────────────┘   └──────────────────┘
         │                      │
         └──────────┬───────────┘
                    │
          ┌─────────┴─────────┐
          │ Children of A & B │
          └───────────────────┘
```

**Why Option 1 is Best**:
- ✅ Minimal CSV changes (just add `partnerId` column)
- ✅ Easy to parse and link people
- ✅ Simple data structure  
- ✅ Naturally handles step-siblings (check if parents have different partners)
- ❌ Alternative approaches (marriage history columns, separate tables) are too complex

**Implementation Estimate**: **2-3 hours**
- Data model updates: 30 min
- CSV parsing updates: 30 min
- UI component updates: 45 min
- Testing & styling: 30 min

**Complexity**: Low-Medium
**Dependencies**: None - can be added independently

---

### 2. Search/Filter by Name Feature
**Description**: Global search to find and navigate to specific family members  
**User Value**: Quick navigation in large family trees (10+ people)  
**Technical Requirements**:
- Add search input component (top of page or modal)
- Implement fuzzy/substring matching (name, Bengali name)
- Add navigation to found person (auto-scroll/highlight)
- Optional: Highlight search results across tree
- Optional: Add keyboard shortcut (Ctrl+F or Cmd+F override)

**Implementation Estimate**: **1.5-2 hours**
- Search component: 30 min
- Search logic & matching: 30 min
- Navigation/scrolling: 30 min
- Styling & UX polish: 15 min

**Complexity**: Low
**Dependencies**: None - uses existing tree structure

**Tech Stack**:
- React `useState` for search query
- Array `.filter()` with regex or fuzzy matching library (optional: `fuse.js`)
- Existing `scrollIntoView()` API for navigation

---

### 3. Relationship Finder Feature
**Description**: Select two people and system calculates their relationship  
**User Value**: Understand how family members are connected (grandfather, cousin, aunt, etc.)  
**Technical Requirements**:
- Build relationship graph algorithm (tree traversal)
- Implement path-finding between two nodes (BFS/DFS)
- Create relationship inference engine:
  - Direct line relationships (parent/child, sibling)
  - Extended relationships (cousin, aunt, uncle, niece, nephew, grandparent, etc.)
  - **Marriage relationships** (spouse, in-law, etc.)
  - **Step-relationships** (step-sibling, step-parent, step-grandparent when parent remarries)
  - **Half-siblings** (same parent but different other parent)
- Add UI modal for relationship display
- Optional: Show the complete path (Person A → Common Ancestor → Person B)

**Important Data Model Consideration**:
- When a person has multiple partners/spouses with different children:
  - Children from different partners are **step-siblings** to each other
  - System must track both biological parents AND marriage history
  - Example: Parent P marries Partner1 (has Child1), then Partner2 (has Child2)
    - Child1 and Child2 are step-siblings (share one parent but different other parent)
    - Both are children of P but from different marriages

**Implementation Estimate**: **5-7 hours**
- Data structure for graph relationships: 45 min
- Pathfinding algorithm (BFS): 1 hour
- Relationship classification logic (including step-relationships): 2 hours
- UI component & modal: 45 min
- Edge cases & testing: 1 hour

**Complexity**: Medium-High
**Dependencies**: Partner feature **required first** (to track multiple marriages and step-relationships)

**Tech Stack**:
- Graph algorithms (BFS - Breadth-First Search)
- Recursive tree traversal
- Relationship logic matrix/lookup table
- React modal/dialog component

**Algorithm Overview**:
```javascript
// Pseudocode
function findRelationship(person1, person2) {
  if (person1.id === person2.id) return "Same person";
  if (person1.parentId === person2.id) return "Parent";
  if (person2.parentId === person1.id) return "Child";
  
  // Check if siblings or step-siblings
  if (person1.parents.length > 0 && person2.parents.length > 0) {
    commonParents = person1.parents.filter(p => person2.parents.includes(p));
    if (commonParents.length === 2) return "Full sibling";
    if (commonParents.length === 1) return "Half-sibling";
    if (commonParents.length === 0) {
      // Check if connected through parent's other marriages
      person1ParentsPartners = getAllPartnersOf(person1.parents);
      person2ParentsPartners = getAllPartnersOf(person2.parents);
      if (person1ParentsPartners.includes(person2.parentId)) return "Step-sibling";
    }
  }
  
  // Find common ancestor for extended relationships
  ancestors1 = getAllAncestors(person1);
  ancestors2 = getAllAncestors(person2);
  commonAncestors = ancestors1.filter(a => ancestors2.includes(a));
  
  if (commonAncestors.length > 0) {
    // Calculate generation gap and side relationship
    // Return: "First cousin", "Aunt", "Uncle", "Step-aunt", etc.
  }
  
  return "Not related";
}
```

---

### 4. Recommended Feature Implementation Order

1. **Partner/Spouse Names** (Low effort, high value) ← Start here
2. **Search by Name** (Low effort, high value) ← Easy win
3. **Relationship Finder** (Higher effort, educational value) ← After partners

**Total Estimated Time for All 3 Features**: **9-12 hours** (2-3 full working days)

---

### 5. Optional Future Enhancements
- Photo carousel/gallery for each person
- Timeline view (birth/marriage dates)
- PDF export of family tree
- Dark mode toggle
- Multiple family trees support
- Import from Ancestry.com or other genealogy sites
- Mobile app version (React Native)

## License

Built by Shahbaz Khan
