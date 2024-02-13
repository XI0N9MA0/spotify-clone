'use client'

import { Song } from "@/types"
import { MediaItem } from "./MediaItem";
import LikeButton from "./LikeButton";
import {BsPauseFill, BsPlayFill } from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import {HiSpeakerWave, HiSpeakerXMark} from "react-icons/hi2"
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from 'use-sound';
import {RxShuffle, RxLoop} from 'react-icons/rx';
import useLoop from "@/hooks/useLoop";
import toast from "react-hot-toast";
interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  song, 
  songUrl
}) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const {isLoop, setIsLoop} = useLoop();
  
    
  

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumnIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayNext = () => {
    if(player.ids.length === 0){
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex+1];

    if(!nextSong){
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  }

  const onPlayPrevious = () => {
    if(player.ids.length === 0){
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if(!previousSong){
      return player.setId(player.ids[player.ids.length-1]);
    }

    player.setId(previousSong);
  }

  const [play, {pause, sound}] = useSound(
    songUrl,
    {
      volume: volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ['mp3']
    }
  );

  useEffect(()=>{
    sound?.play();

    return () => {
      sound?.unload();
    }
  },[sound]);

  const handlePlay = () => {
    if(!isPlaying){
      play();
    }else{
      pause();
    }
  }

  const toggleMute = () => {
    if(volume === 0){
      setVolume(1);
    }else{
      setVolume(0);
    }
  }

  const handleClickShuffle = () =>{
    setIsShuffle(prev => !prev);
  }

  const handleClickLoop = () => {
    setIsLoop();
    isLoop?toast.success("Turned off Loop"):toast.success("Turned on loop");
  }

  
  

  return (
    <div className="
      grid
      grid-cols-2
      md:grid-cols-3
      h-full
    ">
      <div className="
        flex
        w-full
        justify-start
      ">
        <div className="
          flex items-center gap-x-4
        ">
          <MediaItem data={song}/>
          <LikeButton songId={song.id} />
          
        </div>
      </div>

      <div
        className="
          flex
          md:hidden
          col-auto
          w-full
          justify-end
          items-center
        "
      >
        
        <div
          onClick={handlePlay}
          className="
           h-10
           w-10
           flex
           items-center
           justify-center
           rounded-full
           bg-white
           p-1
           cursor-pointer
          "
        >
          <Icon size={30} className="text-black"/>
        </div>
      </div>

      
      <div className="flex flex-col">
      <div className="
        hidden
        h-full
        md:flex
        justify-center
        items-center
        w-full
        max-w-[722px]
        gap-x-6
      ">
        <div className="relative"
        onClick={handleClickShuffle}>
          <RxShuffle
            size={18}
            className={`
            ${isShuffle? "text-green-500 hover:text-green-400":"text-neutral-400 hover:text-white"}
              transition
            `}
          />
          {isShuffle && <div
            className={`
            absolute 
            bg-green-500 
            w-1 h-1 
            rounded-md
            left-[40%]
            top-[110%]
            `}
          />}
        </div>
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={25}
          className="
            text-neutral-400
            cursor-poiner
            hover:text-white
            transition
          "
        />
        <div
          onClick={handlePlay}
          className="
            flex
            items-center
            justify-center
            h-8
            w-8
            rounded-full
            bg-white
            p-1
            cursor-pointer
            hover:scale-105
          "
        >
          <Icon size={25} className="text-black"/>
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={25}
          className="
            text-neutral-400
            cursor-poiner
            hover:text-white
            transition
          "
        />
        <div className="relative " onClick={handleClickLoop}>
        <RxLoop
            size={20}
            className={`
              ${isLoop? "text-green-500":"text-neutral-400"}
              cursor-poiner
              ${isLoop? "hover:text-green-400":"hover:text-white"}
              transition
            `}
          />
          {isLoop && <div
            className={`
            absolute 
            bg-green-500 
            w-1 h-1 
            rounded-md
            left-[40%]
            top-[110%]
            `}
          />}
        </div>
          
          
        
        
      </div>
      <div>
         <Slider
              value={volume}
              onChange={(value) => setVolume(value)}
        /> 
      </div>
      </div>
      
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumnIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider
            value={volume}
            onChange={(value) => setVolume(value)}
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent