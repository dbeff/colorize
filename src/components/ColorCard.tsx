// import React from "react";

import chroma from "chroma-js";
import { useState } from "react";
import { HuePicker, AlphaPicker, BlockPicker } from "react-color";
import { HexColorInput } from "react-colorful";

export interface Props {
  color: string;
}

export default function ColorCard({ color = "white" }: Props) {
  const [colorState, setColorState] = useState(color);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const getHsl = () => {
    const hsl = chroma(colorState).hsl();
    const h = hsl[0].toFixed(2);
    const s = hsl[1].toFixed(2);
    const l = hsl[2].toFixed(2);
    return `${h},${s},${l}`;
  };

  const getRgba = () => {
    const hsl = chroma(colorState).rgba();
    const r = hsl[0].toFixed(0);
    const g = hsl[1].toFixed(0);
    const b = hsl[2].toFixed(0);
    const a = hsl[3].toFixed(2);
    return `${r},${g},${b},${a}`;
  };

  const onClickColor = () => {
    setShowColorPicker(true);
  };

  const onChangeColor = (color: string) => {
    setColorState(color);
  };

  console.log(colorState);

  return (
    <div className="rounded-xl shadow-xl p-4 bg-white">
      <div
        className="rounded-xl h-40 m-4 box-border relative"
        style={{ backgroundColor: colorState }}
        onClick={onClickColor}
      >
        {showColorPicker && (
          <div className="absolute ">
            <BlockPicker
              color={colorState}
              onChange={(color) => {
                setColorState(color.hex);
              }}
              onChangeComplete={() => {
                setShowColorPicker(false);
              }}
            />
          </div>
        )}
      </div>

      <div className="p-2">
        <div className="p-2 text-xl font-bold"></div>

        <HexColorInput
          color={chroma(colorState).hex()}
          onChange={onChangeColor}
          className="p-2 font-bold w-full hover:bg-gray-100 transition ease-in-out delay-150 rounded-md"
          prefixed
          alpha
        />

        <div className="p-1">
          <span className="px-1 font-bold select-none">hsl:</span>
          <span className="px-1 text-slate-500">{getHsl()}</span>
        </div>

        <div className="p-1">
          <span className="px-1 font-bold select-none">rgba:</span>
          <span className="px-1 text-slate-500">{getRgba()}</span>
        </div>

        <div className="p-1">
          <span className="px-1 font-bold select-none">alpha:</span>
          <span className="px-1 text-slate-500">
            {chroma(colorState).rgba()[3]}
          </span>
        </div>

        <div className="p-1">
          <span className="px-1 font-bold select-none">temperature:</span>
          <span className="px-1 text-slate-500">
            {chroma(colorState).temperature()}
          </span>
        </div>

        <div className="p-1 flex items-center">
          <div className="px-1 font-bold select-none">hue:</div>
          <div className="px-1 flex-1 ">
            <HuePicker
              width="100%"
              color={colorState}
              onChange={(color) => {
                if (color?.hex) setColorState(color?.hex);
              }}
            />
          </div>
        </div>

        <div className="p-1 flex items-center">
          <div className="px-1 font-bold select-none">alpha:</div>
          <div className="px-1 flex-1 ">
            <AlphaPicker
              width="100%"
              color={colorState}
              onChange={(color) => {
                if (!color?.hsl?.a) return;
                const a = color?.hsl.a;
                const hex = color?.hex;

                const c = chroma(hex).alpha(a).css("hsl");
                console.log(c);
                setColorState(c);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
