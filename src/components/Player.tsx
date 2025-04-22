import {
	Heart,
	Pause,
	Play,
	Repeat,
	Shuffle,
	SkipBack,
	SkipForward,
	Volume1,
	Volume2,
	VolumeX,
} from "lucide-react";
import React, { useState } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import { formatDuration } from "../data/tracks";

export const Player: React.FC = () => {
	const {
		currentTrack,
		isPlaying,
		progress,
		volume,
		togglePlayPause,
		nextTrack,
		prevTrack,
		setProgress,
		setVolume,
		toggleFavorite,
		isShuffle,
		isRepeat,
		toggleShuffle,
		toggleRepeat,
	} = usePlayer();

	const [isDraggingProgress, setIsDraggingProgress] = useState(false);
	const [tempProgress, setTempProgress] = useState(0);

	if (!currentTrack) return null;

	const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const progressBar = e.currentTarget;
		const rect = progressBar.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const percent = x / rect.width;
		const newProgress = Math.round(percent * currentTrack.duration);
		setProgress(newProgress);
	};

	const handleProgressDragStart = () => {
		setIsDraggingProgress(true);
		setTempProgress(progress);
	};

	const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDraggingProgress) return;

		const progressBar = e.currentTarget;
		const rect = progressBar.getBoundingClientRect();
		const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
		const percent = x / rect.width;
		const newProgress = Math.round(percent * currentTrack.duration);
		setTempProgress(newProgress);
	};

	const handleProgressDragEnd = () => {
		if (!isDraggingProgress) return;

		setIsDraggingProgress(false);
		setProgress(tempProgress);
	};

	const getVolumeIcon = () => {
		if (volume === 0) return <VolumeX size={18} />;
		if (volume < 0.5) return <Volume1 size={18} />;
		return <Volume2 size={18} />;
	};

	const progressPercent = isDraggingProgress
		? (tempProgress / currentTrack.duration) * 100
		: (progress / currentTrack.duration) * 100;

	return (
		<div className="fixed bottom-0 left-0 right-0 z-30 p-3 md:p-4 bg-background dark:bg-card border-t border-border glass-effect backdrop-blur-lg">
			<div className="flex flex-col md:flex-row items-center justify-between gap-2">
				<div className="flex items-center gap-3 w-full md:w-1/3">
					<div className="flex-shrink-0 relative">
						<img
							src={currentTrack.coverArt}
							alt={currentTrack.title}
							className={`h-12 w-12 rounded-md object-cover ${
								isPlaying ? "animate-pulse-glow" : ""
							}`}
						/>
					</div>
					<div className="flex flex-col min-w-0 flex-1">
						<h4 className="text-sm font-medium truncate">
							{currentTrack.title}
						</h4>
						<p className="text-xs text-muted-foreground truncate">
							{currentTrack.artist}
						</p>
					</div>
					<button
						onClick={() => toggleFavorite(currentTrack.id)}
						className="flex-shrink-0"
						aria-label={
							currentTrack.isFavorite
								? "Remove from favorites"
								: "Add to favorites"
						}
					>
						<Heart
							size={18}
							className={
								currentTrack.isFavorite
									? "fill-neon-pink text-neon-pink"
									: "text-muted-foreground hover:text-neon-pink transition-colors"
							}
						/>
					</button>
				</div>

				<div className="flex flex-col items-center w-full md:w-1/3">
					<div className="flex items-center gap-3 md:gap-5 mb-1">
						<button
							onClick={toggleShuffle}
							className={`p-1.5 rounded-full transition-colors ${
								isShuffle
									? "text-neon-blue"
									: "text-muted-foreground hover:text-foreground"
							}`}
							aria-label="Toggle shuffle"
						>
							<Shuffle size={16} />
						</button>
						<button
							onClick={prevTrack}
							className="p-1.5 text-foreground rounded-full hover:bg-secondary/80 transition-colors"
							aria-label="Previous track"
						>
							<SkipBack size={20} />
						</button>
						<button
							onClick={togglePlayPause}
							className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
							aria-label={isPlaying ? "Pause" : "Play"}
						>
							{isPlaying ? (
								<Pause size={20} />
							) : (
								<Play size={20} className="ml-0.5" />
							)}
						</button>
						<button
							onClick={nextTrack}
							className="p-1.5 text-foreground rounded-full hover:bg-secondary/80 transition-colors"
							aria-label="Next track"
						>
							<SkipForward size={20} />
						</button>
						<button
							onClick={toggleRepeat}
							className={`p-1.5 rounded-full transition-colors ${
								isRepeat
									? "text-neon-blue"
									: "text-muted-foreground hover:text-foreground"
							}`}
							aria-label="Toggle repeat"
						>
							<Repeat size={16} />
						</button>
					</div>

					<div className="flex items-center w-full gap-2">
						<span className="text-xs text-muted-foreground w-10 text-right">
							{formatDuration(progress)}
						</span>

						{/* Custom Slider */}
						<div
							className="relative flex-1 h-1.5 bg-secondary rounded-full cursor-pointer"
							onClick={handleProgressClick}
							onMouseDown={handleProgressDragStart}
							onMouseMove={handleProgressDrag}
							onMouseUp={handleProgressDragEnd}
							onMouseLeave={handleProgressDragEnd}
						>
							<div
								className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-blue to-neon-pink rounded-full"
								style={{ width: `${progressPercent}%` }}
							/>
							<div
								className="absolute top-1/2 h-3 w-3 bg-foreground dark:bg-white rounded-full -translate-y-1/2 -translate-x-1/2 shadow-md hover:scale-125 transition-transform"
								style={{ left: `${progressPercent}%` }}
							/>
						</div>
						<span className="text-xs text-muted-foreground w-10">
							{formatDuration(currentTrack.duration)}
						</span>
					</div>
				</div>

				<div className="hidden md:flex items-center justify-end gap-2 w-1/3">
					<button onClick={() => setVolume(0)} aria-label="Mute">
						{getVolumeIcon()}
					</button>
					<div className="relative w-24 h-1.5 bg-secondary rounded-full">
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={volume}
							onChange={(e) => setVolume(Number(e.target.value))}
							className="absolute w-full h-full opacity-0 cursor-pointer"
						/>
						<div
							className="absolute top-0 left-0 h-full bg-neon-blue rounded-full"
							style={{ width: `${volume * 100}%` }}
						/>
						<div
							className="absolute top-1/2 h-3 w-3 bg-foreground dark:bg-white rounded-full -translate-y-1/2 shadow-md"
							style={{ left: `${volume * 100}%` }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
