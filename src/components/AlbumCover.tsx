import React from "react";
import { usePlayer } from "../contexts/PlayerContext";

export const AlbumCover: React.FC = () => {
	const { currentTrack, isPlaying } = usePlayer();

	if (!currentTrack) return null;

	return (
		<div className="relative mx-auto my-6">
			<div className="absolute inset-0 bg-neon-blue opacity-20 blur-3xl rounded-full" />
			<div
				className={`relative w-60 h-60 md:w-72 md:h-72 rounded-2xl overflow-hidden transition-all
          border-2 border-white/10 shadow-xl 
          ${isPlaying ? "animate-pulse-glow" : ""}`}
			>
				<img
					src={currentTrack.coverArt}
					alt={currentTrack.title}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />

				{/* Reflection/glass effect */}
				<div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-30" />
			</div>
		</div>
	);
};
