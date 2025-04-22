export interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number; // in seconds
    coverArt: string;
    isFavorite: boolean;
}
  
export interface Playlist {
  id: string;
  name: string;
  coverArt: string;
  tracks: Track[];
}

export const tracks: Track[] = [
  {
    id: "1",
    title: "Neon Dreams",
    artist: "Wave Runner",
    album: "Digital Sunset",
    duration: 222, // 3:42
    coverArt: "https://images.pexels.com/photos/20139056/pexels-photo-20139056/free-photo-of-a-purple-and-pink-glowing-skull-with-a-glowing-light.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFavorite: false,
  },
  {
    id: "2",
    title: "Midnight Drive",
    artist: "Cyber Collective",
    album: "Retrograde",
    duration: 198, // 3:18
    coverArt: "https://images.pexels.com/photos/16255319/pexels-photo-16255319/free-photo-of-night-photo-of-a-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFavorite: true,
  },
  {
    id: "3",
    title: "Digital Rain",
    artist: "Syntax Error",
    album: "Pixel Dreams",
    duration: 245, // 4:05
    coverArt: "https://images.pexels.com/photos/4440584/pexels-photo-4440584.jpeg",
    isFavorite: false,
  },
  {
    id: "4",
    title: "Cyber Haze",
    artist: "Neon Protokol",
    album: "Electronic Memories",
    duration: 217, // 3:37
    coverArt: "https://images.pexels.com/photos/1718209/pexels-photo-1718209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFavorite: true,
  },
  {
    id: "5",
    title: "Endless Highway",
    artist: "Wave Runner",
    album: "Digital Sunset",
    duration: 235, // 3:55
    coverArt: "https://images.pexels.com/photos/19923038/pexels-photo-19923038/free-photo-of-empty-road-in-countryside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFavorite: false,
  },
  {
    id: "6",
    title: "Neon City Lights",
    artist: "Cyber Collective",
    album: "Retrograde",
    duration: 187, // 3:07
    coverArt: "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFavorite: true,
  },
  {
    id: "7",
    title: "Late Night Coding",
    artist: "Syntax Error",
    album: "Pixel Dreams",
    duration: 210, // 3:30
    coverArt: "https://images.pexels.com/photos/5473300/pexels-photo-5473300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFavorite: false,
  },
  {
    id: "8",
    title: "Binary Sunset",
    artist: "Neon Protokol",
    album: "Electronic Memories",
    duration: 258, // 4:18
    coverArt: "https://images.pexels.com/photos/5473300/pexels-photo-5473300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFavorite: true,
  },
];

export const playlists: Playlist[] = [
  {
    id: "1",
    name: "Synthwave Mix",
    coverArt: "https://images.pexels.com/photos/15509340/pexels-photo-15509340/free-photo-of-piano-keyboard-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tracks: [tracks[0], tracks[4], tracks[2], tracks[6]],
  },
  {
    id: "2",
    name: "Night Drive",
    coverArt: "https://images.pexels.com/photos/3066867/pexels-photo-3066867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tracks: [tracks[1], tracks[5], tracks[3], tracks[7]],
  },
  {
    id: "3",
    name: "Coding Focus",
    coverArt: "https://images.pexels.com/photos/1334093/pexels-photo-1334093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tracks: [tracks[6], tracks[2], tracks[0], tracks[4]],
  },
  {
    id: "4",
    name: "Cyber Vibes",
    coverArt: "https://images.pexels.com/photos/8107908/pexels-photo-8107908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tracks: [tracks[3], tracks[7], tracks[1], tracks[5]],
  },
];

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};