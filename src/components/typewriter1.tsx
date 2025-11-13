import React, { useState, useRef, useEffect } from "react";
import PublishModal from "./PublishModal";

// --- imports (same as your code above) ---
import base from "../assets/typewriter1/base.png";
import a from "../assets/typewriter1/a.png";
import b from "../assets/typewriter1/b.png";
import c from "../assets/typewriter1/c.png";
import d from "../assets/typewriter1/d.png";
import e from "../assets/typewriter1/e.png";
import f from "../assets/typewriter1/f.png";
import g from "../assets/typewriter1/g.png";
import h from "../assets/typewriter1/h.png";
import i from "../assets/typewriter1/i.png";
import j from "../assets/typewriter1/j.png";
import k from "../assets/typewriter1/k.png";
import l from "../assets/typewriter1/l.png";
import m from "../assets/typewriter1/m.png";
import n from "../assets/typewriter1/n.png";
import o from "../assets/typewriter1/o.png";
import p from "../assets/typewriter1/p.png";
import q from "../assets/typewriter1/q.png";
import r from "../assets/typewriter1/r.png";
import s from "../assets/typewriter1/s.png";
import t from "../assets/typewriter1/t.png";
import u from "../assets/typewriter1/u.png";
import v from "../assets/typewriter1/v.png";
import w from "../assets/typewriter1/w.png";
import x from "../assets/typewriter1/x.png";
import y from "../assets/typewriter1/y.png";
import z from "../assets/typewriter1/z.png";
import space from "../assets/typewriter1/space.png";
import enter from "../assets/typewriter1/enter.png";
import tab from "../assets/typewriter1/tab.png";
import capsLock from "../assets/typewriter1/caps lock.png";
import shiftL from "../assets/typewriter1/shiftL.png";
import shiftR from "../assets/typewriter1/shiftR.png";
import zero from "../assets/typewriter1/0.png";
import one from "../assets/typewriter1/1.png";
import two from "../assets/typewriter1/2.png";
import three from "../assets/typewriter1/3.png";
import four from "../assets/typewriter1/4.png";
import five from "../assets/typewriter1/5.png";
import six from "../assets/typewriter1/6.png";
import seven from "../assets/typewriter1/7.png";
import eight from "../assets/typewriter1/8.png";
import nine from "../assets/typewriter1/9.png";
import dash from "../assets/typewriter1/dash.png";
import equals from "../assets/typewriter1/equals.png";
import bracket from "../assets/typewriter1/bracket.png";
import semicolon from "../assets/typewriter1/semicolon.png";
import colon from "../assets/typewriter1/colon.png";
import quote from "../assets/typewriter1/quote.png";
import colonDot from "../assets/typewriter1/greaterthan.png";
import comma from "../assets/typewriter1/lessthan.png";
import fraction from "../assets/typewriter1/fraction.png";
import paper from "../assets/paper1.png";

const Typewriter1 = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<number>>(new Set());
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [typedText, setTypedText] = useState<string>("");
  const [lineCount, setLineCount] = useState<number>(0);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPublishingAnim, setIsPublishingAnim] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const isMobile = useRef(window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

  const MAX_LINES = 12;

  const keyboardImages = [
    paper,
    base,
    a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z,
    space, enter, tab, capsLock, shiftL, shiftR,
    zero, one, two, three, four, five, six, seven, eight, nine,
    dash, equals, bracket, semicolon, colon, quote, colonDot, comma, fraction,
  ];

  // Map index to character
  const indexToChar: { [key: number]: string } = {
    // Letters a-z (indices 2-27)
    2: 'a', 3: 'b', 4: 'c', 5: 'd', 6: 'e', 7: 'f', 8: 'g', 9: 'h',
    10: 'i', 11: 'j', 12: 'k', 13: 'l', 14: 'm', 15: 'n', 16: 'o', 17: 'p',
    18: 'q', 19: 'r', 20: 's', 21: 't', 22: 'u', 23: 'v', 24: 'w', 25: 'x',
    26: 'y', 27: 'z',
    // Special keys
    28: ' ',    // space
    29: '\n',   // enter
    30: '    ', // tab
    // Numbers (indices 33-42)
    33: '0', 34: '1', 35: '2', 36: '3', 37: '4',
    38: '5', 39: '6', 40: '7', 41: '8', 42: '9',
    // Symbols
    43: '-',  // dash
    44: '=',  // equals
    45: '[',  // bracket
    46: ';',  // semicolon
    47: ':',  // colon
    48: "'",  // quote
    49: '.',  // period
    50: ',',  // comma
    51: '/',  // fraction
  };

  // Map keyboard keys to image indices
  const keyToIndex: { [key: string]: number } = {
    'a': 2, 'b': 3, 'c': 4, 'd': 5, 'e': 6, 'f': 7, 'g': 8, 'h': 9,
    'i': 10, 'j': 11, 'k': 12, 'l': 13, 'm': 14, 'n': 15, 'o': 16, 'p': 17,
    'q': 18, 'r': 19, 's': 20, 't': 21, 'u': 22, 'v': 23, 'w': 24, 'x': 25,
    'y': 26, 'z': 27,
    ' ': 28, 'Enter': 29, 'Tab': 30,
    '0': 33, '1': 34, '2': 35, '3': 36, '4': 37,
    '5': 38, '6': 39, '7': 40, '8': 41, '9': 42,
    '-': 43, '=': 44, '[': 45, ';': 46, ':': 47,
    "'": 48, '.': 49, ',': 50, '/': 51,
  };

  // ✅ Load all images progressively in batches to prevent memory spike
  useEffect(() => {
    const loadImage = (src: string, index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.decoding = "async"; // Async decode for better performance
        
        // On mobile, reduce image dimensions to save memory
        if (isMobile.current) {
          img.loading = "lazy";
        }
        
        img.src = src;
        img.onload = () => {
          imageCache.current.set(index, img);
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    const loadImagesProgressively = async () => {
      const imageArray = new Array(keyboardImages.length);
      let loadedCount = 0;
      
      // Load critical images first (paper and base)
      const criticalIndices = [0, 1];
      await Promise.all(
        criticalIndices.map(async (index) => {
          const img = await loadImage(keyboardImages[index], index);
          imageArray[index] = img;
          loadedCount++;
        })
      );
      setImages([...imageArray]);
      setLoadingProgress(Math.round((loadedCount / keyboardImages.length) * 100));

      // Load remaining images in smaller batches with delays
      // Smaller batches on mobile to prevent memory spikes
      const batchSize = isMobile.current ? 5 : 10;
      const delayBetweenBatches = isMobile.current ? 100 : 50;
      
      for (let i = 2; i < keyboardImages.length; i += batchSize) {
        const batch = [];
        for (let j = i; j < Math.min(i + batchSize, keyboardImages.length); j++) {
          batch.push(loadImage(keyboardImages[j], j).then(img => {
            imageArray[j] = img;
            loadedCount++;
          }));
        }
        await Promise.all(batch);
        setImages([...imageArray]); // Update after each batch
        setLoadingProgress(Math.round((loadedCount / keyboardImages.length) * 100));
        // Small delay between batches to prevent overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
      }
      
      setIsFullyLoaded(true);
    };

    loadImagesProgressively();
  }, []);

  // Handle physical keyboard input (no backspace)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle typing when modal is open
      if (isPublishModalOpen) {
        return;
      }

      const key = e.key.toLowerCase();
      const index = keyToIndex[key] || keyToIndex[e.key];
      
      if (index !== undefined) {
        e.preventDefault();
        handleKeyPress(index);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPublishModalOpen]);

  // Track line breaks from text wrapping
  useEffect(() => {
    // Count total lines (including explicit newlines and wrapped lines)
    const textLines = typedText.split('\n');
    const totalLines = textLines.reduce((count, line) => {
      // Estimate wrapped lines based on character count
      // Adjust the divisor based on your text container width
      const charsPerLine = 30; // approximate chars that fit per line
      const wrappedLines = Math.ceil(line.length / charsPerLine) || 1;
      return count + wrappedLines;
    }, 0);
    
    setLineCount(totalLines - 1); // Subtract 1 because we start at line 0
  }, [typedText]);

  const handleKeyPress = (index: number) => {
    // Check line limit before adding character
    if (lineCount >= MAX_LINES) {
      return; // Block input when at line limit
    }

    // Visual key press animation
    setPressedKeys((prev) => new Set(prev).add(index));
    setTimeout(() => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 150);

    // Add character to typed text
    const char = indexToChar[index];
    if (char !== undefined) {
      setTypedText((prev) => prev + char);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (images.length === 0) return;

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const canvas = canvasRef.current!;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { 
      willReadFrequently: true,
      alpha: true,
      desynchronized: true // Better performance for frequent updates
    });
    if (!ctx) return;

    // Limit canvas size on mobile to reduce memory usage
    const maxDimension = isMobile.current ? 800 : 2000;
    const scale = Math.min(1, maxDimension / Math.max(rect.width, rect.height));
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;

    // Check from topmost image down
    for (let i = images.length - 1; i >= 1; i--) {
      const img = images[i];
      if (!img) continue; // Skip if image not loaded
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const pixel = ctx.getImageData(x * scale, y * scale, 1, 1).data;
      if (pixel[3] > 0) {
        handleKeyPress(i);
        break;
      }
    }

    // Clear canvas after use to free memory
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleClear = () => {
    setTypedText("");
  };

  const handlePublishSuccess = () => {
    setIsPublishModalOpen(false);
    setIsPublishingAnim(true);
    // Clear after animation completes
    window.setTimeout(() => {
      setTypedText("");
      setIsPublishingAnim(false);
    }, 900);
  };

  return (
    <>
      {/* Loading indicator */}
      {!isFullyLoaded && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10002,
          textAlign: 'center',
          background: '#E1DDD5',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #412C23',
        }}>
          <div style={{ marginBottom: '1rem', color: '#412C23' }}>
            Loading typewriter... {loadingProgress}%
          </div>
          <div style={{
            width: '200px',
            height: '8px',
            background: '#F0EDE7',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${loadingProgress}%`,
              height: '100%',
              background: '#412C23',
              transition: 'width 0.3s ease-out',
            }} />
          </div>
        </div>
      )}

      {/* Bottom-left Controls */}
      <div className="bottom-controls">
        <button 
          onClick={handleClear} 
          disabled={!typedText.trim()}
          className="clear-btn"
        >
          Clear
        </button>
        <button 
          onClick={() => setIsPublishModalOpen(true)} 
          disabled={!typedText.trim()}
          className="publish-btn"
        >
          Publish
        </button>
      </div>

      <div
        className="typewriter-container"
        onClick={handleClick}
        style={{ position: "relative", opacity: isFullyLoaded ? 1 : 0.3 }}
      >
         {keyboardImages.map((image, index) => {
           // Skip rendering if image not loaded yet
           const loadedImage = images[index];
           if (!loadedImage) return null;

           return (
             <img
               key={index}
               src={image}
               alt={`Keyboard key ${index}`}
               loading={index > 1 ? "lazy" : "eager"}
               decoding="async"
               className={index === 0 && isPublishingAnim ? 'publishing' : ''}
               style={{
                 position: "absolute",
                 top: index === 0 
                   ? pressedKeys.has(index) 
                     ? `calc(6.5rem - ${lineCount * 2.16}rem + 3px)` 
                     : `calc(6.5rem - ${lineCount * 2.16}rem)`
                   : pressedKeys.has(index) 
                     ? "5px" 
                     : "0px",
                 left: 0,
                 width: "auto",
                 height: "100%",
                 zIndex: index + 1,
                 pointerEvents: "none",
                 transition: "top 0.3s ease-out",
               }}
             />
           );
         })}
         {/* Typed text overlay on paper */}
         <div
           className={`typewriter-text ${isPublishingAnim ? 'publishing' : ''}`}
           style={{
             position: "absolute",
             top: `calc(6.5rem - ${lineCount * 2.16}rem)`,
             left: "27%",
             right: "27%",
             zIndex: 1000,
             fontSize: "1.2rem",
             lineHeight: "1.8",
             whiteSpace: "pre-wrap",
             wordWrap: "break-word",
             color: "#000",
             pointerEvents: "none",
             padding: "1rem",
             paddingTop: "6.5rem",
             textAlign: "left",
             transition: "top 0.3s ease-out",
           }}
         >
           {typedText}
         </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        content={typedText}
        onSuccess={handlePublishSuccess}
      />
    </>
  );
};

export default Typewriter1;
