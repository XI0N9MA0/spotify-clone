'use client'

import * as RadixSlider from "@radix-ui/react-slider"
import { FormEventHandler, useEffect, useState } from "react";


  interface TimelineProps {
    step: any;
    value: number;
    min: number;
    max: number;
    onInput: FormEventHandler<HTMLInputElement> | undefined;
    setSeekTime: (value: number) => void;
    appTime: number
}




const Timeline = ({ value, min, max, onInput, setSeekTime, appTime }: TimelineProps) => {
  // converts the time to format 0:00
  const getTime = (time: number) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div className="hidden sm:flex flex-row items-center">
      <button type="button" onClick={() => setSeekTime(appTime - 5)} className="hidden lg:mr-4 lg:block text-white">
        -
      </button>
      <p className="text-white">{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <p className="text-white">{max === 0 ? '0:00' : getTime(max)}</p>
      <button type="button" onClick={() => setSeekTime(appTime + 5)} className="hidden lg:ml-4 lg:block text-white">
        +
      </button>
    </div>
  );
};

export default Timeline