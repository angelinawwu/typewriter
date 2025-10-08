# Typewriter Simulator

An interactive typewriter web application built with React, TypeScript, and Vite. Experience the nostalgia of typing on a mechanical typewriter with dubious accuracy.

![Typewriter Demo](./public/demo.png)

## Features

### 🎹 Interactive Typing
- **Click-to-Type**: Click on individual typewriter keys to type
- **Keyboard Support**: Use your physical keyboard to type naturally
- **Visual Feedback**: Keys animate with press-down and paper movement effects when clicked or typed

### 🎨 Designed to Delight
- Hand-drawn layered PNGs to create typewriter image
- Courier font for authentic typewriter text
- Transparent key overlays with pixel-perfect click detection

### ⌨️ Full Character Support
- **Letters**: a-z
- **Numbers**: 0-9
- **Special Characters**: `-`, `=`, `[`, `;`, `:`, `'`, `>`, `<`, `/`
- **Function Keys**: Space, Enter, Tab, Caps Lock, Shift
- **NOTE**: no backspace. this is real authenticity.

## Tech Stack

- React
- TypeScript
- Vite
- CSS3

## Getting Started

### Prerequisites

- Node.js 18.20.8 or higher (20.19+ recommended)
- npm 10.8.2 or higher

### Installation

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
typewriter/
├── src/
│   ├── assets/
│   │   ├── paper1.png           # Paper image
│   │   └── typewriter1/         # Keyboard key images
│   │       ├── base.png         # Keyboard base
│   │       ├── a.png - z.png    # Letter keys
│   │       ├── 0.png - 9.png    # Number keys
│   │       ├── space.png        # Special keys
│   │       └── ...
│   ├── components/
│   │   └── typewriter1.tsx      # Main typewriter component
│   ├── App.tsx                  # Root component
│   ├── App.css                  # Application styles
│   └── main.tsx                 # Application entry point
├── package.json
└── vite.config.ts
```

## How It Works

### Click Detection Algorithm

The typewriter uses an advanced pixel-detection algorithm to ensure only actual key content (not transparent areas) is clickable:

1. **Image Preloading**: All keyboard images are preloaded on component mount
2. **Canvas Analysis**: On click, a temporary canvas analyzes the pixel at the click coordinates
3. **Alpha Channel Check**: If the pixel has transparency (alpha = 0), the click passes through to lower layers
4. **Layer Traversal**: The algorithm checks from topmost layer down until it finds a non-transparent pixel
5. **Key Press Trigger**: Only when clicking on actual key content does the key press animation trigger


## Future Enhancements

- [ ] Sound effects for typing
- [ ] Mobile touch support for clicking keys
- [ ] Save/export typed text
- [ ] Multiple paper styles
- [ ] Typewriter color themes
- [ ] Carriage return bell sound
- [ ] Print functionality


Made with ❤️ and nostalgia by Angelina Wu