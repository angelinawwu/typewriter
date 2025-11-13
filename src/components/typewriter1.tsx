import React, { useState, useRef, useEffect } from "react";
import PublishModal from "./PublishModal";

// Detect mobile at module level
const isMobileDevice = window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Desktop imports
import baseDesktop from "../assets/typewriter1/base.webp";
import aDesktop from "../assets/typewriter1/a.webp";
import bDesktop from "../assets/typewriter1/b.webp";
import cDesktop from "../assets/typewriter1/c.webp";
import dDesktop from "../assets/typewriter1/d.webp";
import eDesktop from "../assets/typewriter1/e.webp";
import fDesktop from "../assets/typewriter1/f.webp";
import gDesktop from "../assets/typewriter1/g.webp";
import hDesktop from "../assets/typewriter1/h.webp";
import iDesktop from "../assets/typewriter1/i.webp";
import jDesktop from "../assets/typewriter1/j.webp";
import kDesktop from "../assets/typewriter1/k.webp";
import lDesktop from "../assets/typewriter1/l.webp";
import mDesktop from "../assets/typewriter1/m.webp";
import nDesktop from "../assets/typewriter1/n.webp";
import oDesktop from "../assets/typewriter1/o.webp";
import pDesktop from "../assets/typewriter1/p.webp";
import qDesktop from "../assets/typewriter1/q.webp";
import rDesktop from "../assets/typewriter1/r.webp";
import sDesktop from "../assets/typewriter1/s.webp";
import tDesktop from "../assets/typewriter1/t.webp";
import uDesktop from "../assets/typewriter1/u.webp";
import vDesktop from "../assets/typewriter1/v.webp";
import wDesktop from "../assets/typewriter1/w.webp";
import xDesktop from "../assets/typewriter1/x.webp";
import yDesktop from "../assets/typewriter1/y.webp";
import zDesktop from "../assets/typewriter1/z.webp";
import spaceDesktop from "../assets/typewriter1/space.webp";
import enterDesktop from "../assets/typewriter1/enter.webp";
import tabDesktop from "../assets/typewriter1/tab.webp";
import capsLockDesktop from "../assets/typewriter1/caps lock.webp";
import shiftLDesktop from "../assets/typewriter1/shiftL.webp";
import shiftRDesktop from "../assets/typewriter1/shiftR.webp";
import zeroDesktop from "../assets/typewriter1/0.webp";
import oneDesktop from "../assets/typewriter1/1.webp";
import twoDesktop from "../assets/typewriter1/2.webp";
import threeDesktop from "../assets/typewriter1/3.webp";
import fourDesktop from "../assets/typewriter1/4.webp";
import fiveDesktop from "../assets/typewriter1/5.webp";
import sixDesktop from "../assets/typewriter1/6.webp";
import sevenDesktop from "../assets/typewriter1/7.webp";
import eightDesktop from "../assets/typewriter1/8.webp";
import nineDesktop from "../assets/typewriter1/9.webp";
import dashDesktop from "../assets/typewriter1/dash.webp";
import equalsDesktop from "../assets/typewriter1/equals.webp";
import bracketDesktop from "../assets/typewriter1/bracket.webp";
import semicolonDesktop from "../assets/typewriter1/semicolon.webp";
import colonDesktop from "../assets/typewriter1/colon.webp";
import quoteDesktop from "../assets/typewriter1/quote.webp";
import colonDotDesktop from "../assets/typewriter1/greaterthan.webp";
import commaDesktop from "../assets/typewriter1/lessthan.webp";
import fractionDesktop from "../assets/typewriter1/fraction.webp";
import paperDesktop from "../assets/paper1.webp";

// Mobile imports
import baseMobile from "../assets/typewriter1-mobile/base.webp";
import aMobile from "../assets/typewriter1-mobile/a.webp";
import bMobile from "../assets/typewriter1-mobile/b.webp";
import cMobile from "../assets/typewriter1-mobile/c.webp";
import dMobile from "../assets/typewriter1-mobile/d.webp";
import eMobile from "../assets/typewriter1-mobile/e.webp";
import fMobile from "../assets/typewriter1-mobile/f.webp";
import gMobile from "../assets/typewriter1-mobile/g.webp";
import hMobile from "../assets/typewriter1-mobile/h.webp";
import iMobile from "../assets/typewriter1-mobile/i.webp";
import jMobile from "../assets/typewriter1-mobile/j.webp";
import kMobile from "../assets/typewriter1-mobile/k.webp";
import lMobile from "../assets/typewriter1-mobile/l.webp";
import mMobile from "../assets/typewriter1-mobile/m.webp";
import nMobile from "../assets/typewriter1-mobile/n.webp";
import oMobile from "../assets/typewriter1-mobile/o.webp";
import pMobile from "../assets/typewriter1-mobile/p.webp";
import qMobile from "../assets/typewriter1-mobile/q.webp";
import rMobile from "../assets/typewriter1-mobile/r.webp";
import sMobile from "../assets/typewriter1-mobile/s.webp";
import tMobile from "../assets/typewriter1-mobile/t.webp";
import uMobile from "../assets/typewriter1-mobile/u.webp";
import vMobile from "../assets/typewriter1-mobile/v.webp";
import wMobile from "../assets/typewriter1-mobile/w.webp";
import xMobile from "../assets/typewriter1-mobile/x.webp";
import yMobile from "../assets/typewriter1-mobile/y.webp";
import zMobile from "../assets/typewriter1-mobile/z.webp";
import spaceMobile from "../assets/typewriter1-mobile/space.webp";
import enterMobile from "../assets/typewriter1-mobile/enter.webp";
import tabMobile from "../assets/typewriter1-mobile/tab.webp";
import capsLockMobile from "../assets/typewriter1-mobile/caps lock.webp";
import shiftLMobile from "../assets/typewriter1-mobile/shiftL.webp";
import shiftRMobile from "../assets/typewriter1-mobile/shiftR.webp";
import zeroMobile from "../assets/typewriter1-mobile/0.webp";
import oneMobile from "../assets/typewriter1-mobile/1.webp";
import twoMobile from "../assets/typewriter1-mobile/2.webp";
import threeMobile from "../assets/typewriter1-mobile/3.webp";
import fourMobile from "../assets/typewriter1-mobile/4.webp";
import fiveMobile from "../assets/typewriter1-mobile/5.webp";
import sixMobile from "../assets/typewriter1-mobile/6.webp";
import sevenMobile from "../assets/typewriter1-mobile/7.webp";
import eightMobile from "../assets/typewriter1-mobile/8.webp";
import nineMobile from "../assets/typewriter1-mobile/9.webp";
import dashMobile from "../assets/typewriter1-mobile/dash.webp";
import equalsMobile from "../assets/typewriter1-mobile/equals.webp";
import bracketMobile from "../assets/typewriter1-mobile/bracket.webp";
import semicolonMobile from "../assets/typewriter1-mobile/semicolon.webp";
import colonMobile from "../assets/typewriter1-mobile/colon.webp";
import quoteMobile from "../assets/typewriter1-mobile/quote.webp";
import colonDotMobile from "../assets/typewriter1-mobile/greaterthan.webp";
import commaMobile from "../assets/typewriter1-mobile/lessthan.webp";
import fractionMobile from "../assets/typewriter1-mobile/fraction.webp";
import paperMobile from "../assets/paper1-mobile.webp";

// Select images based on device
const paper = isMobileDevice ? paperMobile : paperDesktop;
const base = isMobileDevice ? baseMobile : baseDesktop;
const a = isMobileDevice ? aMobile : aDesktop;
const b = isMobileDevice ? bMobile : bDesktop;
const c = isMobileDevice ? cMobile : cDesktop;
const d = isMobileDevice ? dMobile : dDesktop;
const e = isMobileDevice ? eMobile : eDesktop;
const f = isMobileDevice ? fMobile : fDesktop;
const g = isMobileDevice ? gMobile : gDesktop;
const h = isMobileDevice ? hMobile : hDesktop;
const i = isMobileDevice ? iMobile : iDesktop;
const j = isMobileDevice ? jMobile : jDesktop;
const k = isMobileDevice ? kMobile : kDesktop;
const l = isMobileDevice ? lMobile : lDesktop;
const m = isMobileDevice ? mMobile : mDesktop;
const n = isMobileDevice ? nMobile : nDesktop;
const o = isMobileDevice ? oMobile : oDesktop;
const p = isMobileDevice ? pMobile : pDesktop;
const q = isMobileDevice ? qMobile : qDesktop;
const r = isMobileDevice ? rMobile : rDesktop;
const s = isMobileDevice ? sMobile : sDesktop;
const t = isMobileDevice ? tMobile : tDesktop;
const u = isMobileDevice ? uMobile : uDesktop;
const v = isMobileDevice ? vMobile : vDesktop;
const w = isMobileDevice ? wMobile : wDesktop;
const x = isMobileDevice ? xMobile : xDesktop;
const y = isMobileDevice ? yMobile : yDesktop;
const z = isMobileDevice ? zMobile : zDesktop;
const space = isMobileDevice ? spaceMobile : spaceDesktop;
const enter = isMobileDevice ? enterMobile : enterDesktop;
const tab = isMobileDevice ? tabMobile : tabDesktop;
const capsLock = isMobileDevice ? capsLockMobile : capsLockDesktop;
const shiftL = isMobileDevice ? shiftLMobile : shiftLDesktop;
const shiftR = isMobileDevice ? shiftRMobile : shiftRDesktop;
const zero = isMobileDevice ? zeroMobile : zeroDesktop;
const one = isMobileDevice ? oneMobile : oneDesktop;
const two = isMobileDevice ? twoMobile : twoDesktop;
const three = isMobileDevice ? threeMobile : threeDesktop;
const four = isMobileDevice ? fourMobile : fourDesktop;
const five = isMobileDevice ? fiveMobile : fiveDesktop;
const six = isMobileDevice ? sixMobile : sixDesktop;
const seven = isMobileDevice ? sevenMobile : sevenDesktop;
const eight = isMobileDevice ? eightMobile : eightDesktop;
const nine = isMobileDevice ? nineMobile : nineDesktop;
const dash = isMobileDevice ? dashMobile : dashDesktop;
const equals = isMobileDevice ? equalsMobile : equalsDesktop;
const bracket = isMobileDevice ? bracketMobile : bracketDesktop;
const semicolon = isMobileDevice ? semicolonMobile : semicolonDesktop;
const colon = isMobileDevice ? colonMobile : colonDesktop;
const quote = isMobileDevice ? quoteMobile : quoteDesktop;
const colonDot = isMobileDevice ? colonDotMobile : colonDotDesktop;
const comma = isMobileDevice ? commaMobile : commaDesktop;
const fraction = isMobileDevice ? fractionMobile : fractionDesktop;

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
