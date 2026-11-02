// Geometry of the eyes artwork, in pixels of the 1500x845 source.
// The served asset (/eyes.webp) is a pre-blurred, contrast-tuned grayscale copy at 60% size.

export type Pt = readonly [number, number];

export type EyeShape = {
  // corners of the eye opening
  a: Pt;
  b: Pt;
  // control points of the upper and lower lid curves (cubic béziers from a to b)
  u1: Pt;
  u2: Pt;
  l1: Pt;
  l2: Pt;
  // iris centre and radius
  iris: readonly [number, number, number];
  // thickness of the upper lash line
  band: number;
  // average luminance of the eye white, used when the iris moves
  sclera: number;
};

export const EYES_SRC = "/eyes.webp";

export const EYES_META = {
  width: 1500,
  height: 845,
  // average luminance of the skin around the eyes, used for the closing lid
  skin: 0.252,
  // midpoint between the eyes and the size of the box that holds both
  center: [762, 450] as Pt,
  span: [1245, 495] as Pt,
  eyes: [
    {
      a: [140, 440],
      u1: [190, 290],
      u2: [520, 240],
      b: [615, 455],
      l1: [220, 705],
      l2: [480, 735],
      iris: [390, 462, 120],
      band: 46,
      sclera: 0.515,
    },
    {
      a: [985, 420],
      u1: [1010, 250],
      u2: [1300, 230],
      b: [1385, 420],
      l1: [1040, 665],
      l2: [1300, 665],
      iris: [1137, 440, 116],
      band: 52,
      sclera: 0.512,
    },
  ] satisfies EyeShape[],
};
