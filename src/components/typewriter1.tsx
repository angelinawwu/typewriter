import React, { useState, useRef, useEffect } from "react";

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    49: '>',  // greaterthan
    50: '<',  // lessthan
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
    "'": 48, '>': 49, '<': 50, '/': 51,
  };

  // ✅ Preload all images once
  useEffect(() => {
    const loadAll = async () => {
      const loaded = await Promise.all(
        keyboardImages.map(
          (src) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new Image();
              img.crossOrigin = "anonymous"; // prevent canvas taint
              img.src = src;
              img.onload = () => resolve(img);
              img.onerror = reject;
            })
        )
      );
      setImages(loaded);
    };
    loadAll();
  }, []);

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const index = keyToIndex[key] || keyToIndex[e.key];
      
      if (index !== undefined) {
        e.preventDefault();
        handleKeyPress(index);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Check from topmost image down
    for (let i = images.length - 1; i >= 1; i--) {
      const img = images[i];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, rect.width, rect.height);

      const pixel = ctx.getImageData(x, y, 1, 1).data;
      if (pixel[3] > 0) {
        handleKeyPress(i);
        break;
      }
    }
  };

  return (
    <>
      <div
        className="typewriter-container"
        onClick={handleClick}
        style={{ position: "relative" }}
      >
         {keyboardImages.map((image, index) => (
           <img
             key={index}
             src={image}
             alt={`Keyboard key ${index}`}
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
         ))}
         {/* Typed text overlay on paper */}
         <div
           style={{
             position: "absolute",
             top: `calc(12rem - ${lineCount * 2.16}rem)`,
             left: "27%",
             right: "27%",
             zIndex: 1000,
             fontFamily: "Courier, monospace",
             fontSize: "1.2rem",
             lineHeight: "1.8",
             whiteSpace: "pre-wrap",
             wordWrap: "break-word",
             color: "#000",
             pointerEvents: "none",
             padding: "1rem",
             textAlign: "left",
             transition: "top 0.3s ease-out",
           }}
         >
           {typedText}
         </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
};

export default Typewriter1;
