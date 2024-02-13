'use client';

import usePlayer from "@/hooks/usePlayer";
import RightSidebarItem from "./RightSidebarItem"
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useRightSidebar from "@/hooks/useRightSideBar";



const RightSideBar= () => {     
  const player = usePlayer();
  const {song} = useGetSongById(player.activeId);
  const {isOpen} = useRightSidebar();
  
  const songUrl = useLoadSongUrl(song!);
  if(!song || !songUrl || !player.activeId){
    return null;
  }
  return (
    <div className={`${isOpen ? "lg:py-2 lg:px-2 h-full" : "hidden"}`}>
      <RightSidebarItem data={song}/>
    </div>
  )
}

export default RightSideBar