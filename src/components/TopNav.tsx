import { ArrowUp, Search, User } from "lucide-react";
import React from "react";
import { useUI } from "../contexts/UIContext";
import { ThemeToggle } from "./ThemeToggle";

interface TopNavProps {
	showScrollTop: boolean;
	onScrollTop: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
	showScrollTop,
	onScrollTop,
}) => {
	const { toggleSearch, openModal } = useUI();

	return (
		<div className="sticky top-0 z-10 w-full p-4 flex items-center justify-between bg-background dark:bg-card bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm">
			<div className="lg:hidden">
				<h1 className="text-xl font-bold tracking-wide text-primary dark:text-neon-blue">
					Neon<span className="text-neon-pink">Wave</span>
				</h1>
			</div>

			<div className="hidden lg:flex flex-1">
				{/* Empty space for desktop layout */}
			</div>

			<div className="flex items-center gap-4">
				<button
					onClick={toggleSearch}
					className="p-2 rounded-full hover:bg-secondary/80 transition-colors text-foreground"
					aria-label="Search"
				>
					<Search size={20} />
				</button>

				<button
					onClick={() => openModal("account")}
					className="hidden md:flex items-center gap-2 py-1.5 px-3 rounded-full border border-border hover:bg-secondary/80 transition-colors"
				>
					<User size={16} />
					<span className="text-sm font-medium">Profile</span>
				</button>

				<ThemeToggle />

				{showScrollTop && (
					<button
						onClick={onScrollTop}
						className="p-2 rounded-full bg-primary text-primary-foreground animate-fade-in"
						aria-label="Scroll to top"
					>
						<ArrowUp size={18} />
					</button>
				)}
			</div>
		</div>
	);
};
