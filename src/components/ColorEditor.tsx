// import React from "react";

import chroma from "chroma-js";
import { useState } from "react";
import { HuePicker, AlphaPicker, BlockPicker } from "react-color";
import { HexColorInput, HexColorPicker } from "react-colorful";
import Color from "../common/Color";
import CardField from "./CardField";

import * as Slider from "@radix-ui/react-slider";

export interface Props {
  color: string | number | chroma.Color;
}

export default function ColorCard({ color = "white" }: Props) {
  const [colorState, setColorState] = useState(chroma(color));
  const [showColorPicker, setShowColorPicker] = useState(false);

  const luminance = chroma(colorState).hsl()[2];
  const luminanceString = chroma(colorState).hsl()[2].toFixed(2);

  const alpha = chroma(colorState).rgba()[3].toString();
  const temperature = chroma(colorState).temperature().toString();
  const hex = colorState.hex();

  const onClickColor = () => {
    setShowColorPicker(true);
  };

  const onChangeColor = (color: string) => {
    setColorState(chroma(color));
  };

  const onChangeLuminance = (value: number[]) => {
    console.log(value);
    const c = chroma(colorState);
    const h = c.hsl()[0];
    const s = c.hsl()[1];
    const l = value[0];

    console.log(h, s, l);
    const n = chroma.hsl(h, s, l);

    setColorState(n);
  };

  return (
    <div className="rounded-xl p-4 bg-white text-sm">
      <div className="flex items-center rounded-xl">
        <div className="flex-1"></div>
      </div>
      <div
        className="rounded-xl h-40 m-4 box-border relative"
        style={{ backgroundColor: hex }}
        onClick={onClickColor}
      >
        {showColorPicker && (
          <div className="absolute top-full left-1/2 shadow-sm transform -translate-x-1/2 -translate-y-1/2">
            <BlockPicker
              className="shadow-sm border-gray-900"
              color={colorState.hex()}
              onChange={(color) => {
                setColorState(chroma(color.hex));
              }}
              onChangeComplete={() => {
                setShowColorPicker(false);
              }}
            />
          </div>
        )}
      </div>

      <div className="p-2">
        <div className="text-slate-700"></div>

        <CardField name={"hex"} value={hex} />
        <CardField name={"hsl"} value={Color.getHsl(colorState)} />
        <CardField name={"rgba"} value={Color.getRgba(colorState)} />
        <CardField name={"luminance"} value={luminanceString} />
        <CardField name={"alpha"} value={alpha} />
        <CardField name={"temperature"} value={temperature} />

        <CardField
          value={
            <HuePicker
              className="my-2"
              width="100%"
              color={colorState.hex()}
              onChange={(color) => {
                if (color?.hex) setColorState(chroma(color?.hex));
              }}
            />
          }
        />

        <CardField
          value={
            <AlphaPicker
              className="my-2"
              width="100%"
              color={colorState.hex()}
              onChange={(color) => {
                if (!color?.hsl?.a) return;
                const a = color?.hsl.a;
                const hex = color?.hex;

                const c = chroma(hex).alpha(a);
                console.log(c);
                setColorState(c);
              }}
            />
          }
        />

        <CardField
          value={
            <Slider.Root
              className="SliderRoot relative flex items-center select-none touch-none w-full h-3 py-5"
              defaultValue={[luminance]}
              max={1}
              min={0}
              step={0.01}
              aria-label="Luminance"
              value={[luminance]}
              onValueChange={onChangeLuminance}
            >
              <Slider.Track className="SliderTrack bg-slate-200 relative grow rounded-full h-3">
                <Slider.Range className="SliderRange absolute bg-slate-400 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="SliderThumb block w-6 h-6 bg-slate-600 outline-none shadow-sm rounded-full hover:bg-slate-500 cursor-pointer" />
            </Slider.Root>
          }
        />
      </div>
    </div>
  );
}
