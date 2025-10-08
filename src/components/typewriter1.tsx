import React from 'react';

// Import all the keyboard images
import base from '../assets/typewriter1/base.png';
import a from '../assets/typewriter1/a.png';
import b from '../assets/typewriter1/b.png';
import c from '../assets/typewriter1/c.png';
import d from '../assets/typewriter1/d.png';
import e from '../assets/typewriter1/e.png';
import f from '../assets/typewriter1/f.png';
import g from '../assets/typewriter1/g.png';
import h from '../assets/typewriter1/h.png';
import i from '../assets/typewriter1/i.png';
import j from '../assets/typewriter1/j.png';
import k from '../assets/typewriter1/k.png';
import l from '../assets/typewriter1/l.png';
import m from '../assets/typewriter1/m.png';
import n from '../assets/typewriter1/n.png';
import o from '../assets/typewriter1/o.png';
import p from '../assets/typewriter1/p.png';
import q from '../assets/typewriter1/q.png';
import r from '../assets/typewriter1/r.png';
import s from '../assets/typewriter1/s.png';
import t from '../assets/typewriter1/t.png';
import u from '../assets/typewriter1/u.png';
import v from '../assets/typewriter1/v.png';
import w from '../assets/typewriter1/w.png';
import x from '../assets/typewriter1/x.png';
import y from '../assets/typewriter1/y.png';
import z from '../assets/typewriter1/z.png';
import space from '../assets/typewriter1/space.png';
import enter from '../assets/typewriter1/enter.png';
import tab from '../assets/typewriter1/tab.png';
import capsLock from '../assets/typewriter1/caps lock.png';
import shiftL from '../assets/typewriter1/shiftL.png';
import shiftR from '../assets/typewriter1/shiftR.png';
import zero from '../assets/typewriter1/0.png';
import one from '../assets/typewriter1/1.png';
import two from '../assets/typewriter1/2.png';
import three from '../assets/typewriter1/3.png';
import four from '../assets/typewriter1/4.png';
import five from '../assets/typewriter1/5.png';
import six from '../assets/typewriter1/6.png';
import seven from '../assets/typewriter1/7.png';
import eight from '../assets/typewriter1/8.png';
import nine from '../assets/typewriter1/9.png';
import dash from '../assets/typewriter1/dash.png';
import equals from '../assets/typewriter1/equals.png';
import bracket from '../assets/typewriter1/bracket.png';
import semicolon from '../assets/typewriter1/semicolon.png';
import colon from '../assets/typewriter1/colon.png';
import quote from '../assets/typewriter1/quote.png';
import colonDot from '../assets/typewriter1/greaterthan.png';
import comma from '../assets/typewriter1/lessthan.png';
import fraction from '../assets/typewriter1/fraction.png';

const Typewriter1 = () => {
  // Array of all keyboard images in the order you want them displayed
  const keyboardImages = [
    base,
    a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z,
    space, enter, tab, capsLock, shiftL, shiftR,
    zero, one, two, three, four, five, six, seven, eight, nine,
    dash, equals, bracket, semicolon, colon, quote, colonDot, comma, fraction
  ];

  return (
    <div className="typewriter-container">
      {keyboardImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Keyboard key ${index}`}
          className="keyboard-layer"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'auto',
            height: '100%',
            zIndex: index + 1,
            pointerEvents: 'none',
            margin: '0 auto',
          }}
        />
      ))}
    </div>
  );
};

export default Typewriter1;