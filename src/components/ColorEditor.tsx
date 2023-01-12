// import React from "react";

import chroma from "chroma-js";
import { useState } from "react";
import { TwitterPicker } from "react-color";
import { HexColorInput } from "react-colorful";
import { RgbaColorPicker } from "react-colorful";
import Color from "../common/Color";
import CardField from "./CardField";

import * as Slider from "@radix-ui/react-slider";

export interface Props {
  color: string | number | chroma.Color;
}

export default function ColorEditor({ color = "white" }: Props) {
  const [colorState, setColorState] = useState(chroma(color));
  const [showColorPicker, setShowColorPicker] = useState(false);

  const luminance = chroma(colorState).luminance();
  const luminanceString = chroma(colorState).hsl()[2].toFixed(2);

  const alpha = chroma(colorState).rgba()[3].toString();
  const temperature = chroma(colorState).temperature().toString();
  const hex = colorState.hex();

  const onClickColor = () => {
    setShowColorPicker(true);
  };

  const onChangeHex = (color: string) => {
    setColorState(chroma(color));
  };

  const onChangeRGB = (color: {
    r: number;
    g: number;
    b: number;
    a: number;
  }) => {
    setColorState(chroma.rgb(color.r, color.g, color.b).alpha(color.a));
  };

  const onChangeLuminance = (value: number[]) => {
    const c = chroma(colorState).luminance(value[0], "hsl");
    setColorState(c);
  };

  return (
    <div className="rounded-xl p-4 bg-white text-sm">
      <div className="flex rounded-xl items-stretch">
        <div className="flex-1 relative">
          <div
            className="rounded-xl h-full mx-4 box-border relative"
            style={{ backgroundColor: hex }}
            onClick={onClickColor}
          ></div>
          {showColorPicker && (
            <div className="absolute top-full left-1/2 shadow-sm transform -translate-x-1/2 -translate-y-1/2">
              <TwitterPicker
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
        <div>
          <RgbaColorPicker
            color={{
              r: chroma(hex).rgb()[0],
              g: chroma(hex).rgb()[1],
              b: chroma(hex).rgb()[2],
              a: chroma(hex).alpha(),
            }}
            onChange={onChangeRGB}
          />
        </div>
      </div>

      <div className="p-2">
        <div className="text-slate-700"></div>

        <CardField
          name={"hex"}
          value={
            <HexColorInput
              color={hex}
              prefixed
              className="px-2"
              onChange={onChangeHex}
            />
          }
        />
        <CardField name={"hsl"} value={Color.getHsl(colorState)} />
        <CardField name={"rgba"} value={Color.getRgba(colorState)} />
        <CardField name={"luminance"} value={luminanceString} />
        <CardField name={"alpha"} value={alpha} />
        <CardField name={"temperature"} value={temperature} />

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
