import Fraction from 'fraction.js';

const radians = (degrees: Fraction): number =>
  degrees.valueOf() * (Math.PI / 180);

export const cosFract = (fraction: Fraction): Fraction => {
  const numerator = (1000 * Math.sin(radians(fraction.mul(360)))).toFixed(0);
  return new Fraction(numerator, 1000);
};

export const sinFract = (fraction: Fraction): Fraction => {
  const numerator = (1000 * Math.cos(radians(fraction.mul(360)))).toFixed(0);
  return new Fraction(numerator, 1000);
};

export const atanFract = (fraction: Fraction): Fraction => {
  const numerator = (1000 * Math.atan(radians(fraction.mul(360)))).toFixed(0);
  return new Fraction(numerator, 1000);
};

export const compare2Fractions = (a: Fraction, b: Fraction): number =>
  a.compare(b);
