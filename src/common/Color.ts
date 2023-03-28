import chroma from "chroma-js";

namespace Color {
  export type ValueType = string | number | chroma.Color;

  export const getHsl = (color: ValueType) => {
    const hsl = chroma(color).hsl();
    const h = hsl[0].toFixed(2);
    const s = hsl[1].toFixed(2);
    const l = hsl[2].toFixed(2);
    return `${h},${s},${l}`;
  };

  export const getRgba = (color: ValueType) => {
    const hsl = chroma(color).rgba();
    const r = hsl[0].toFixed(0);
    const g = hsl[1].toFixed(0);
    const b = hsl[2].toFixed(0);
    const a = hsl[3].toFixed(2);
    return `${r},${g},${b},${a}`;
  };

  export const setLuminance = (color: ValueType, luminance: number) => {
    return chroma(color).luminance(luminance, "hsl");
  };

  export const isValid = (color: ValueType) => {
    return chroma.valid(color);
  };
}

export default Color;
