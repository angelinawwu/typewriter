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

const Typewriter1 = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<number>>(new Set());
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const keyboardImages = [
    base,
    a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z,
    space, enter, tab, capsLock, shiftL, shiftR,
    zero, one, two, three, four, five, six, seven, eight, nine,
    dash, equals, bracket, semicolon, colon, quote, colonDot, comma, fraction,
  ];

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

  const handleKeyPress = (index: number) => {
    setPressedKeys((prev) => new Set(prev).add(index));
    setTimeout(() => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 150);
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
              top: pressedKeys.has(index) ? "3px" : "0px",
              left: 0,
              width: "auto",
              height: "100%",
              zIndex: index + 1,
              pointerEvents: "none",
              transition: "top 0.1s ease-in-out",
            }}
          />
        ))}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
};

export default Typewriter1;
