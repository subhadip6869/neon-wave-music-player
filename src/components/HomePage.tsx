import React, { useEffect, useRef, useState } from "react";
import { playlists, tracks } from "../data/tracks";
import { AlbumCover } from "./AlbumCover";
import { MusicCard } from "./MusicCard";
import { TopNav } from "./TopNav";
import { Visualizer } from "./Visualizer";

export const HomePage: React.FC = () => {
	const [showScrollTop, setShowScrollTop] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (contentRef.current) {
				setShowScrollTop(contentRef.current.scrollTop > 300);
			}
		};

		const contentEl = contentRef.current;
		if (contentEl) {
			contentEl.addEventListener("scroll", handleScroll);
			return () => contentEl.removeEventListener("scroll", handleScroll);
		}
	}, []);

	const handleScrollTop = () => {
		if (contentRef.current) {
			contentRef.current.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	return (
		<div
			ref={contentRef}
			className="flex-1 overflow-y-auto no-scrollbar pb-36"
		>
			<TopNav
				showScrollTop={showScrollTop}
				onScrollTop={handleScrollTop}
			/>

			<div className="w-full max-w-7xl mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6 my-8 md:my-12">
					<div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center md:text-left">
							Your Music,{" "}
							<span className="text-neon-blue dark:text-neon-pink">
								Reimagined
							</span>
						</h1>
						<p className="text-lg text-muted-foreground mb-6 text-center md:text-left">
							Dive into the future of music with NeonWave's
							immersive experience. Discover, vibe, and share.
						</p>
					</div>

					<div className="w-full md:w-1/2 flex flex-col items-center">
						<AlbumCover />
						<Visualizer />
					</div>
				</div>

				<section className="mb-8">
					<h2 className="text-2xl font-bold mb-4">
						Recommended For You
					</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{tracks.slice(0, 5).map((track) => (
							<MusicCard key={track.id} track={track} />
						))}
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-bold mb-4">Recently Played</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{tracks.slice(2, 7).map((track) => (
							<MusicCard key={track.id} track={track} />
						))}
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{playlists.map((playlist) => (
							<div
								key={playlist.id}
								className="group relative rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
							>
								<div className="relative aspect-square overflow-hidden">
									<img
										src={playlist.coverArt}
										alt={playlist.name}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</div>
								<div className="p-3">
									<h3 className="font-medium truncate">
										{playlist.name}
									</h3>
									<p className="text-xs text-muted-foreground truncate">
										{playlist.tracks.length} tracks
									</p>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};
