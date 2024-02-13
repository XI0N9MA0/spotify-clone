'use client';
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import useRightSidebar from "@/hooks/useRightSideBar";
import { Song } from "@/types";

interface PageContentProps{
  songs: Song[];
}


export const PageContent: React.FC<PageContentProps> = ({songs}) => {
  const onPlay = useOnPlay(songs);
  const player = usePlayer();
  const {isOpen, onOpen} = useRightSidebar();

  if(songs.length===0){
    return(
      <div className="mt-4 text-neutral-400">
        No songs available 😢
      </div>
    )
  }
  return (
    <div
    className={`
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      ${isOpen? "2xl:grid-cols-6": "2xl:grid-cols-8"}
      gap-4
      mt-4
    `}
    >
      {songs.map((item)=>(
        <SongItem
          key={item.id}
          onClick={(id: string)=>{onPlay(id); onOpen()}}
          data={item}
        />
      ))}
    </div>
  )
}

