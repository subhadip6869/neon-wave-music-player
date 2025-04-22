import { Search, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import { useUI } from "../contexts/UIContext";
import { Track, tracks } from "../data/tracks";

export const SearchPanel: React.FC = () => {
	const { isSearchOpen, toggleSearch } = useUI();
	const { playTrack } = usePlayer();
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<Track[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isSearchOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isSearchOpen]);

	useEffect(() => {
		if (searchTerm.trim() === "") {
			setSearchResults([]);
			return;
		}

		const term = searchTerm.toLowerCase();
		const results = tracks.filter(
			(track) =>
				track.title.toLowerCase().includes(term) ||
				track.artist.toLowerCase().includes(term) ||
				track.album.toLowerCase().includes(term)
		);
		setSearchResults(results);
	}, [searchTerm]);

	if (!isSearchOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/50 backdrop-blur-sm animate-fade-in">
			<div className="w-full max-w-xl bg-background dark:bg-card border border-border rounded-lg shadow-lg overflow-hidden">
				<div className="p-4 border-b border-border flex items-center gap-3">
					<Search size={20} className="text-muted-foreground" />
					<input
						ref={inputRef}
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search for songs, artists, or albums..."
						className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
					/>
					<button
						onClick={toggleSearch}
						className="p-1.5 rounded-full hover:bg-secondary/80 transition-colors"
						aria-label="Close search"
					>
						<X size={20} />
					</button>
				</div>

				<div className="max-h-[60vh] overflow-y-auto">
					{searchResults.length > 0 ? (
						<ul className="divide-y divide-border">
							{searchResults.map((track) => (
								<li
									key={track.id}
									className="hover:bg-secondary/50 transition-colors"
								>
									<button
										className="w-full py-3 px-4 flex items-center gap-3 text-left"
										onClick={() => {
											playTrack(track);
											toggleSearch();
										}}
									>
										<img
											src={track.coverArt}
											alt={track.title}
											className="w-10 h-10 rounded object-cover"
										/>
										<div>
											<h4 className="text-sm font-medium">
												{track.title}
											</h4>
											<p className="text-xs text-muted-foreground">
												{track.artist} &bull;{" "}
												{track.album}
											</p>
										</div>
									</button>
								</li>
							))}
						</ul>
					) : searchTerm.trim() !== "" ? (
						<div className="p-6 text-center text-muted-foreground">
							<p>No results found for "{searchTerm}"</p>
						</div>
					) : (
						<div className="p-6 text-center text-muted-foreground">
							<p>Start typing to search</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
