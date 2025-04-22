import { Pause, Play } from "lucide-react";
import React from "react";
import { usePlayer } from "../contexts/PlayerContext";
import { formatDuration, Track } from "../data/tracks";

interface MusicCardProps {
	track: Track;
}

export const MusicCard: React.FC<MusicCardProps> = ({ track }) => {
	const { currentTrack, isPlaying, playTrack, togglePlayPause } = usePlayer();

	const isCurrentTrack = currentTrack?.id === track.id;

	const handlePlay = () => {
		if (isCurrentTrack) {
			togglePlayPause();
		} else {
			playTrack(track);
		}
	};

	return (
		<div className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
			<div className="relative aspect-square overflow-hidden">
				<img
					src={track.coverArt}
					alt={track.title}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

				<button
					className="absolute bottom-2 right-2 p-2.5 bg-primary text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105 shadow-lg"
					onClick={handlePlay}
					aria-label={isCurrentTrack && isPlaying ? "Pause" : "Play"}
				>
					{isCurrentTrack && isPlaying ? (
						<Pause size={18} />
					) : (
						<Play size={18} className="ml-0.5" />
					)}
				</button>
			</div>

			<div className="p-3">
				<h3 className="font-medium truncate">{track.title}</h3>
				<p className="text-xs text-muted-foreground truncate">
					{track.artist}
				</p>
				<p className="text-xs text-muted-foreground mt-1">
					{formatDuration(track.duration)}
				</p>
			</div>

			{isCurrentTrack && (
				<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue to-neon-pink" />
			)}
		</div>
	);
};
