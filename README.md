# Svelte Chrome Extension Boilerplate

A minimal boilerplate for developing Chrome extensions with Svelte and Vite.

## Features

- 🔥 **Hot Module Replacement (HMR)** for development
- ⚡️ **Blazing fast build** with Vite
- 💪 **Type safety** with Svelte 5
- 📱 **Organized structure** with clear separation of concerns
- 🎨 **Modern setup** with ESM and latest Chrome Extension Manifest V3

## Project Structure

```
svelte-chrome-extension-boilerplate/
├── public/                  # Static files
│   ├── assets/              # Icons and assets
│   └── manifest.json        # Extension manifest
├── src/
│   ├── popup/               # Popup UI
│   │   ├── popup.html
│   │   ├── popup.js
│   │   └── Popup.svelte
│   ├── newtab/              # New Tab page
│   │   ├── index.html
│   │   ├── index.js
│   │   ├── index.css
│   │   └── NewTab.svelte
│   ├── background/          # Background script
│   │   └── background.js
│   └── content_scripts/     # Content scripts
│       ├── content.js
│       └── content.css
└── vite.config.js           # Vite configuration
```

## Getting Started

### Installation

```bash
# Clone the repo (or download)
git clone https://github.com/your-username/svelte-chrome-extension-boilerplate.git

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# For popup development specifically
npm run dev:popup

# For new tab page development specifically
npm run dev:newtab
```

### Building for Production

```bash
# Build the extension
npm run build
```

This creates a `dist` folder with the following structure:

```
dist/
├── popup/                # Popup UI files
├── newtab/               # New tab page files
├── background/           # Background script
├── content_scripts/      # Content scripts
├── shared/               # Shared chunks
├── assets/               # Icons and assets
└── manifest.json         # Extension manifest
```

## Loading the Extension in Chrome

1. Build the project with `npm run build`
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked extension"
5. Select the `dist` folder

## Customization

This boilerplate comes with minimal implementations for all extension components. You can:

- Modify `src/popup/Popup.svelte` for the popup UI
- Edit `src/newtab/NewTab.svelte` for the new tab page
- Update `src/background/background.js` for background functionality
- Change `src/content_scripts/content.js` for page interaction

## License

MIT
