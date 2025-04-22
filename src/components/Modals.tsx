import { X } from "lucide-react";
import React from "react";
import { useUI } from "../contexts/UIContext";
import { playlists } from "../data/tracks";

export const Modals: React.FC = () => {
	const { activeModal, closeModal } = useUI();

	if (!activeModal) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
			<div className="w-full max-w-md bg-background dark:bg-card border border-border rounded-lg shadow-xl overflow-hidden">
				<div className="flex items-center justify-between p-4 border-b border-border">
					<h2 className="text-lg font-medium">
						{activeModal === "account" && "Account Settings"}
						{activeModal === "playlist" && "Your Playlists"}
						{activeModal === "subscription" && "Subscription Plans"}
					</h2>
					<button
						onClick={closeModal}
						className="p-1.5 rounded-full hover:bg-secondary/80 transition-colors"
						aria-label="Close modal"
					>
						<X size={20} />
					</button>
				</div>

				<div className="p-6 max-h-[70vh] overflow-y-auto">
					{activeModal === "account" && <AccountContent />}
					{activeModal === "playlist" && <PlaylistContent />}
					{activeModal === "subscription" && <SubscriptionContent />}
				</div>
			</div>
		</div>
	);
};

const AccountContent: React.FC = () => {
	return (
		<div className="space-y-6">
			<div className="flex items-center space-x-4">
				<div className="w-16 h-16 rounded-full bg-neon-purple">
					<span className="flex h-full items-center justify-center text-2xl font-bold text-white">
						JD
					</span>
				</div>
				<div>
					<h3 className="text-lg font-medium">John Doe</h3>
					<p className="text-sm text-muted-foreground">
						john.doe@example.com
					</p>
				</div>
			</div>

			<div className="pt-4 space-y-4">
				<h4 className="text-sm font-semibold text-muted-foreground">
					ACCOUNT SETTINGS
				</h4>
				<div className="space-y-4">
					<div className="space-y-1">
						<label
							className="text-sm font-medium"
							htmlFor="display-name"
						>
							Display Name
						</label>
						<input
							id="display-name"
							type="text"
							defaultValue="John Doe"
							className="w-full p-2 text-sm rounded border border-border bg-background dark:bg-muted focus:outline-none focus:ring-2 focus:ring-neon-blue"
						/>
					</div>

					<div className="space-y-1">
						<label className="text-sm font-medium" htmlFor="email">
							Email
						</label>
						<input
							id="email"
							type="email"
							defaultValue="john.doe@example.com"
							className="w-full p-2 text-sm rounded border border-border bg-background dark:bg-muted focus:outline-none focus:ring-2 focus:ring-neon-blue"
						/>
					</div>

					<div className="space-y-1">
						<label
							className="text-sm font-medium"
							htmlFor="password"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							defaultValue="********"
							className="w-full p-2 text-sm rounded border border-border bg-background dark:bg-muted focus:outline-none focus:ring-2 focus:ring-neon-blue"
						/>
					</div>

					<button className="w-full py-2 mt-4 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
};

const PlaylistContent: React.FC = () => {
	return (
		<div className="space-y-4">
			<button className="w-full flex items-center justify-center gap-2 py-2 rounded border border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition-colors">
				<span className="text-lg">+</span>
				<span>Create New Playlist</span>
			</button>

			<h4 className="text-sm font-semibold text-muted-foreground pt-2">
				YOUR PLAYLISTS
			</h4>

			<div className="space-y-3">
				{playlists.map((playlist) => (
					<div
						key={playlist.id}
						className="flex items-center gap-3 p-2 rounded hover:bg-secondary transition-colors"
					>
						<img
							src={playlist.coverArt}
							alt={playlist.name}
							className="w-12 h-12 rounded object-cover"
						/>
						<div>
							<h5 className="font-medium">{playlist.name}</h5>
							<p className="text-xs text-muted-foreground">
								{playlist.tracks.length} tracks
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const SubscriptionContent: React.FC = () => {
	return (
		<div className="space-y-6">
			<div className="text-center mb-4">
				<h3 className="text-lg font-medium">Choose Your Plan</h3>
				<p className="text-sm text-muted-foreground">
					Unlock all features with a Premium subscription
				</p>
			</div>

			<div className="space-y-4">
				<div className="p-4 border border-border rounded-lg hover:border-neon-blue transition-colors">
					<div className="flex justify-between items-start mb-2">
						<h4 className="font-medium">Free</h4>
						<span className="text-lg font-bold">$0</span>
					</div>
					<ul className="text-sm text-muted-foreground space-y-2">
						<li>&bull; Ad-supported listening</li>
						<li>&bull; Limited skips</li>
						<li>&bull; Standard audio quality</li>
					</ul>
					<button className="w-full py-2 mt-4 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors">
						Current Plan
					</button>
				</div>

				<div className="p-4 border-2 border-neon-blue rounded-lg relative">
					<div className="absolute -top-3 -right-2 bg-neon-pink text-white text-xs px-2 py-0.5 rounded-full">
						POPULAR
					</div>
					<div className="flex justify-between items-start mb-2">
						<h4 className="font-medium">Premium</h4>
						<span className="text-lg font-bold">
							$9.99
							<span className="text-sm font-normal text-muted-foreground">
								/mo
							</span>
						</span>
					</div>
					<ul className="text-sm text-muted-foreground space-y-2">
						<li>&bull; Ad-free music</li>
						<li>&bull; Unlimited skips</li>
						<li>&bull; High quality audio</li>
						<li>&bull; Download for offline</li>
					</ul>
					<button className="w-full py-2 mt-4 bg-gradient-to-r from-neon-blue to-neon-pink text-white rounded hover:opacity-90 transition-opacity">
						Upgrade Now
					</button>
				</div>

				<div className="p-4 border border-border rounded-lg hover:border-neon-blue transition-colors">
					<div className="flex justify-between items-start mb-2">
						<h4 className="font-medium">Family</h4>
						<span className="text-lg font-bold">
							$14.99
							<span className="text-sm font-normal text-muted-foreground">
								/mo
							</span>
						</span>
					</div>
					<ul className="text-sm text-muted-foreground space-y-2">
						<li>&bull; 6 Premium accounts</li>
						<li>&bull; Block explicit music</li>
						<li>&bull; All Premium features</li>
						<li>&bull; Family Mix playlist</li>
					</ul>
					<button className="w-full py-2 mt-4 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
						Get Family Plan
					</button>
				</div>
			</div>
		</div>
	);
};
