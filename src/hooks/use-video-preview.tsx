import { useState, useEffect } from 'react';


export function useFilmPreview(isActive: boolean, delay: number): boolean {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (isActive) {
      const timeId = setTimeout(()=>{
        setIsPlaying(true);
      }, delay);
      return () => clearTimeout(timeId);
    }
    setIsPlaying(false);

  },[isActive, delay]);

  return isPlaying;
}
