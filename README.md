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

## License

Built by Shahbaz Khan
