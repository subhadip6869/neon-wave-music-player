import React from "react";
import { usePlayer } from "../contexts/PlayerContext";

export const Visualizer: React.FC = () => {
	const { isPlaying, currentTrack } = usePlayer();

	if (!currentTrack) return null;

	return (
		<div className="w-full relative h-14 md:h-20 flex items-end justify-center gap-1 md:gap-2 mb-4">
			{isPlaying ? (
				<>
					<Bar animationDelay="0s" className="animate-equalizer1" />
					<Bar animationDelay="0.2s" className="animate-equalizer2" />
					<Bar animationDelay="0.4s" className="animate-equalizer3" />
					<Bar animationDelay="0.5s" className="animate-equalizer4" />
					<Bar animationDelay="0.1s" className="animate-equalizer5" />
					<Bar animationDelay="0.3s" className="animate-equalizer1" />
					<Bar animationDelay="0s" className="animate-equalizer2" />
				</>
			) : (
				<>
					<Bar height="40%" />
					<Bar height="30%" />
					<Bar height="50%" />
					<Bar height="20%" />
					<Bar height="40%" />
					<Bar height="30%" />
					<Bar height="40%" />
				</>
			)}
		</div>
	);
};

interface BarProps {
	animationDelay?: string;
	className?: string;
	height?: string;
}

const Bar: React.FC<BarProps> = ({ animationDelay, className, height }) => {
	return (
		<div
			className={`w-3 md:w-4 rounded-t-md bg-gradient-to-t from-neon-blue to-neon-pink ${
				className || ""
			}`}
			style={{
				height: height || "40%",
				animationDelay,
				transition: "height 0.2s ease-in-out",
			}}
		/>
	);
};
