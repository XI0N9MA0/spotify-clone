'use client';

import LikeButton from "@/components/LikeButton";
import { MediaItem } from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useRightSidebar from "@/hooks/useRightSideBar";
import { Song } from "@/types";

interface SearchContentProps{
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({songs}) => {
  const onPlay = useOnPlay(songs);
  const {onOpen} = useRightSidebar();
  if(songs.length===0){
    return(
      <div
      className="
        flex
        flex-col
        gap-y-2
        w-full
        px-6
        text-neutral-400
      ">
        No songs found.
      </div>
    )
  }
  return (
    <div className="
      flex
      flex-col
      gap-y-2 
      w-full
      px-6
    ">
      {songs.map((song)=>(
        <div
          key={song.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
            <MediaItem 
              onClick={(id: string)=>{onPlay(id); onOpen()}}
              data={song}
            />
          </div>
          <LikeButton songId={song.id}/>
        </div>
      ))}
    </div>
  )
}


export default SearchContent