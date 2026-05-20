# QuiVex PWA - Required Icons & Splash Screens

## App Icons (PNG format, transparent or #060A06 background)

### Standard Icons (Required)
| Filename | Size | Platform |
|----------|------|----------|
| `icon-16.png` | 16x16 | Favicon |
| `icon-32.png` | 32x32 | Favicon |
| `icon-48.png` | 48x48 | Android, Windows |
| `icon-72.png` | 72x72 | Android, Windows |
| `icon-96.png` | 96x96 | Android |
| `icon-128.png` | 128x128 | Chrome Web Store |
| `icon-144.png` | 144x144 | Windows Tile |
| `icon-152.png` | 152x152 | iPad |
| `icon-167.png` | 167x167 | iPad Pro |
| `icon-180.png` | 180x180 | iPhone |
| `icon-192.png` | 192x192 | Android (main), PWA |
| `icon-256.png` | 256x256 | Desktop |
| `icon-310.png` | 310x310 | Windows Large Tile |
| `icon-384.png` | 384x384 | Android |
| `icon-512.png` | 512x512 | PWA (main), Play Store |

### Windows Wide Tile
| Filename | Size | Platform |
|----------|------|----------|
| `icon-310x150.png` | 310x150 | Windows Wide Tile |

## Apple Splash Screens (PNG format, #060A06 background with centered logo)

| Filename | Size | Device |
|----------|------|--------|
| `splash-640x1136.png` | 640x1136 | iPhone SE |
| `splash-750x1334.png` | 750x1334 | iPhone 8 |
| `splash-1242x2208.png` | 1242x2208 | iPhone 8 Plus |
| `splash-1125x2436.png` | 1125x2436 | iPhone X/XS |
| `splash-1536x2048.png` | 1536x2048 | iPad |
| `splash-1668x2224.png` | 1668x2224 | iPad Pro 10.5" |
| `splash-2048x2732.png` | 2048x2732 | iPad Pro 12.9" |

## Design Specifications

### Logo Design
- **Monogram**: "QV" inside chat bubble shape
- **Q**: White metallic with subtle shadow
- **V**: Bright green (#00FF7F) with italic slash style
- **Border**: Neon green glow (rgba(0,255,127,0.2))
- **Background**: Dark (#060A06) or transparent

### Splash Screen Design
- **Background**: #060A06 (solid)
- **Logo**: Centered, 30% of screen width
- **Glow**: Subtle green ambient glow behind logo
- **Text**: "QUIVEX" below logo (optional)

## Location
All files should be placed in: `/public/icons/`

## Current Status
- [x] `logo.svg` - Created
- [ ] PNG icons - **Need to be generated**
- [ ] Splash screens - **Need to be generated**

## How to Generate
Use any of these tools to convert `logo.svg` to PNG at required sizes:
1. **Figma** - Export at multiple sizes
2. **Adobe Illustrator** - Export for screens
3. **Online**: realfavicongenerator.net
4. **CLI**: `sharp-cli` or `imagemagick`

```bash
# Example with ImageMagick
convert logo.svg -resize 192x192 icon-192.png
convert logo.svg -resize 512x512 icon-512.png
```
