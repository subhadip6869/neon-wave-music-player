import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { Track, tracks } from "../data/tracks";

interface PlayerContextType {
	currentTrack: Track | null;
	isPlaying: boolean;
	volume: number;
	progress: number;
	playTrack: (track: Track) => void;
	togglePlayPause: () => void;
	nextTrack: () => void;
	prevTrack: () => void;
	setVolume: (volume: number) => void;
	setProgress: (progress: number) => void;
	toggleFavorite: (trackId: string) => void;
	isShuffle: boolean;
	isRepeat: boolean;
	toggleShuffle: () => void;
	toggleRepeat: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(0.7);
	const [progress, setProgress] = useState(0);
	const [isShuffle, setIsShuffle] = useState(false);
	const [isRepeat, setIsRepeat] = useState(false);
	const [trackList, setTrackList] = useState(tracks);

	useEffect(() => {
		let intervalId: number;

		if (isPlaying && currentTrack) {
			intervalId = window.setInterval(() => {
				setProgress((prev) => {
					if (prev >= currentTrack.duration) {
						if (isRepeat) {
							return 0;
						} else {
							nextTrack();
							return 0;
						}
					}
					return prev + 1;
				});
			}, 1000);
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [isPlaying, currentTrack, isRepeat]);

	useEffect(() => {
		// Set initial track when the component mounts
		if (!currentTrack && tracks.length > 0) {
			setCurrentTrack(tracks[0]);
		}
	}, []);

	const playTrack = (track: Track) => {
		setCurrentTrack(track);
		setIsPlaying(true);
		setProgress(0);
	};

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const getRandomTrack = () => {
		const randomIndex = Math.floor(Math.random() * trackList.length);
		return trackList[randomIndex];
	};

	const nextTrack = () => {
		if (!currentTrack) return;

		if (isShuffle) {
			playTrack(getRandomTrack());
			return;
		}

		const currentIndex = trackList.findIndex(
			(track) => track.id === currentTrack.id
		);
		const nextIndex = (currentIndex + 1) % trackList.length;
		playTrack(trackList[nextIndex]);
	};

	const prevTrack = () => {
		if (!currentTrack) return;

		if (isShuffle) {
			playTrack(getRandomTrack());
			return;
		}

		const currentIndex = trackList.findIndex(
			(track) => track.id === currentTrack.id
		);
		const prevIndex =
			(currentIndex - 1 + trackList.length) % trackList.length;
		playTrack(trackList[prevIndex]);
	};

	const toggleFavorite = (trackId: string) => {
		setTrackList((prevTracks) =>
			prevTracks.map((track) =>
				track.id === trackId
					? { ...track, isFavorite: !track.isFavorite }
					: track
			)
		);

		// Update current track if it's the one being favorited
		if (currentTrack && currentTrack.id === trackId) {
			setCurrentTrack((prev) =>
				prev ? { ...prev, isFavorite: !prev.isFavorite } : null
			);
		}
	};

	const toggleShuffle = () => {
		setIsShuffle(!isShuffle);
	};

	const toggleRepeat = () => {
		setIsRepeat(!isRepeat);
	};

	const value = {
		currentTrack,
		isPlaying,
		volume,
		progress,
		playTrack,
		togglePlayPause,
		nextTrack,
		prevTrack,
		setVolume,
		setProgress,
		toggleFavorite,
		isShuffle,
		isRepeat,
		toggleShuffle,
		toggleRepeat,
	};

	return (
		<PlayerContext.Provider value={value}>
			{children}
		</PlayerContext.Provider>
	);
};

export const usePlayer = () => {
	const context = useContext(PlayerContext);
	if (context === undefined) {
		throw new Error("usePlayer must be used within a PlayerProvider");
	}
	return context;
};
