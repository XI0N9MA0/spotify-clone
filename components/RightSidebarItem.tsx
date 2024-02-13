'use client';

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import LikeButton from "./LikeButton";
import { BsThreeDots } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import useRightSidebar from "@/hooks/useRightSideBar";

interface RightSidebarItemProps{
  data: Song;
}

const RightSidebarItem: React.FC<RightSidebarItemProps> = ({
  data
}) => {
  const imageUrl = useLoadImage(data);
  /* 
  Try using state management like zustand to set state globally available for parent and child component to access it 
  anywhere or anytime
  */
 const {onClose} = useRightSidebar();
  return (
    <div className={`
    hidden 
    lg:flex 
    bg-neutral-900 
    lg:rounded-lg 
    h-full 
    lg:w-[280px] 
    xl:w-[420px]
    overflow-hidden 
    overflow-y-auto`}>
      <div className="w-full h-full flex flex-col items-center px-4 py-2">
        <div className="flex justify-between w-full py-4 items-center">
          <p className="font-bold cursor-pointer hover:underline">Pop Right Now</p>
        <button 
          className="
          w-[35px] h-[35px] 
          rounded-full  
          flex 
          justify-center 
          items-center 
          transition 
          hover:bg-neutral-800  
          text-neutral-400
          hover:text-neutral-100 
          hover:scale-105"
          onClick={()=>{
            onClose();
          }}
          >
          <RxCross1 size={20}/>
        </button>
        </div>
        <Image
            width={385}
            height={385}          
            src={imageUrl || '/images/liked.png'}
            alt="Media Item"
            className="object-cover rounded-md"  
        />
          <div className="w-full  py-5 flex justify-between items-center">
            <div>
              <p className="text-white truncate text-xl font-bold">
                {data.title}
              </p>
              <p className="texttext-sm truncate">
                {data.author}
              </p>
            </div>
            <div className="flex gap-x-2 items-center">
              <LikeButton songId={data.id}/>
              <BsThreeDots className="cursor-pointer"/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default RightSidebarItem;