# Scripts

This directory contains utility scripts for build automation and project management.

## Available Scripts

### DELIVERY_CHECKLIST.js
**Purpose**: Project delivery checklist and status tracker  
**Language**: Node.js  
**Usage**: 
```bash
node scripts/DELIVERY_CHECKLIST.js
```

This script provides a comprehensive checklist of all project deliverables including:
- 3D animations implementation
- UI/UX design components
- Authentication features
- Performance optimizations

### update-apk.ps1
**Purpose**: Android APK update automation  
**Language**: PowerShell  
**Platform**: Windows  
**Usage**:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/update-apk.ps1
```

This script automates the Android APK building and deployment process. It handles:
- Building the Android APK from the Next.js application
- Updating the APK version
- Preparing for distribution

**Note**: This script requires Capacitor Android setup. See the main package.json for related commands:
- `npm run android:sync` - Sync web assets to Android
- `npm run android:apk` - Build the APK
- `npm run android:update` - Run the update script

## Running Scripts

### From Root Directory
All scripts can be executed from the project root:

```bash
# Node.js script
node scripts/DELIVERY_CHECKLIST.js

# PowerShell script (Windows)
powershell -ExecutionPolicy Bypass -File scripts/update-apk.ps1
```

### NPM Scripts
Some scripts are integrated into the npm workflow. Check `package.json` for available commands:
```bash
npm run android:update  # Runs update-apk.ps1
```

## Adding New Scripts

When adding new scripts to this directory:
1. Use descriptive, UPPERCASE filenames with underscores
2. Add appropriate shebang lines (e.g., `#!/usr/bin/env node`)
3. Include error handling and informative output
4. Document the script in this README
5. Consider adding an npm script alias in package.json for convenience
