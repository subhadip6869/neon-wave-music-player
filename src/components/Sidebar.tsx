import {
	CreditCard,
	Heart,
	Home,
	Library,
	LogOut,
	Menu,
	PlusCircle,
	Search,
	User,
} from "lucide-react";
import React from "react";
import { useUI } from "../contexts/UIContext";
import { playlists } from "../data/tracks";

export const Sidebar: React.FC = () => {
	const { isSidebarOpen, toggleSidebar, openModal } = useUI();

	return (
		<aside
			className={`fixed top-0 left-0 bottom-0 z-20 h-full transition-all duration-300 
        bg-background border-r border-border dark:bg-card dark:border-muted
        ${isSidebarOpen ? "w-64" : "w-20"} pb-20`}
		>
			<div className="flex flex-col h-full">
				<div className="flex items-center justify-between p-4">
					{isSidebarOpen && (
						<h1 className="text-xl font-bold tracking-wide text-primary dark:text-neon-blue">
							Neon<span className="text-neon-pink">Wave</span>
						</h1>
					)}
					<button
						onClick={toggleSidebar}
						className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
						aria-label="Toggle sidebar"
					>
						<Menu size={20} />
					</button>
				</div>

				<nav className="mt-6">
					<ul className="space-y-2 px-2">
						<NavItem
							icon={<Home size={20} />}
							label="Home"
							isExpanded={isSidebarOpen}
							isActive
						/>
						<NavItem
							icon={<Search size={20} />}
							label="Search"
							isExpanded={isSidebarOpen}
						/>
						<NavItem
							icon={<Library size={20} />}
							label="Your Library"
							isExpanded={isSidebarOpen}
						/>
					</ul>
				</nav>

				<div className="mt-8 px-4">
					{isSidebarOpen && (
						<h2 className="text-sm font-semibold text-muted-foreground mb-4">
							YOUR PLAYLISTS
						</h2>
					)}
					<div
						className="flex items-center gap-2 p-2 hover:bg-secondary/80 rounded-md transition-colors cursor-pointer mb-2"
						onClick={() => openModal("playlist")}
					>
						<PlusCircle size={18} className="min-w-[18px]" />
						{isSidebarOpen && (
							<span className="text-sm">Create Playlist</span>
						)}
					</div>
					<div className="flex items-center gap-2 p-2 hover:bg-secondary/80 rounded-md transition-colors cursor-pointer">
						<Heart
							size={18}
							className="min-w-[18px] text-neon-pink"
						/>
						{isSidebarOpen && (
							<span className="text-sm">Liked Songs</span>
						)}
					</div>
				</div>

				<div className="mt-2 px-4 flex-1 overflow-y-auto no-scrollbar">
					{isSidebarOpen && (
						<ul className="space-y-1">
							{playlists.map((playlist) => (
								<li
									key={playlist.id}
									className="py-1 px-2 text-sm hover:text-primary cursor-pointer text-muted-foreground transition-colors truncate"
								>
									{playlist.name}
								</li>
							))}
						</ul>
					)}
				</div>

				<div className="mt-auto border-t border-border p-4 space-y-2">
					<button
						onClick={() => openModal("account")}
						className="flex items-center gap-3 w-full p-2 hover:bg-secondary/80 rounded-md transition-colors"
					>
						<User size={18} className="min-w-[18px]" />
						{isSidebarOpen && (
							<span className="text-sm">Accounts</span>
						)}
					</button>

					<button
						onClick={() => openModal("subscription")}
						className="flex items-center gap-3 w-full p-2 hover:bg-secondary/80 rounded-md transition-colors"
					>
						<CreditCard size={18} className="min-w-[18px]" />
						{isSidebarOpen && (
							<span className="text-sm">Subscription</span>
						)}
					</button>

					<button className="flex items-center gap-3 w-full p-2 hover:bg-secondary/80 rounded-md transition-colors">
						<LogOut size={18} className="min-w-[18px]" />
						{isSidebarOpen && (
							<span className="text-sm">Logout</span>
						)}
					</button>
				</div>
			</div>
		</aside>
	);
};

interface NavItemProps {
	icon: React.ReactNode;
	label: string;
	isExpanded: boolean;
	isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
	icon,
	label,
	isExpanded,
	isActive,
}) => {
	return (
		<li>
			<a
				href="#"
				className={`flex items-center gap-4 p-3 rounded-md transition-colors
          ${
				isActive
					? "bg-secondary text-primary dark:bg-secondary/20 dark:text-neon-blue"
					: "hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
			}`}
			>
				<span className="min-w-[20px]">{icon}</span>
				{isExpanded && <span>{label}</span>}
			</a>
		</li>
	);
};
