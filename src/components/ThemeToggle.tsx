import { Moon, Sun } from "lucide-react";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export const ThemeToggle: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="flex items-center justify-center p-2 rounded-full transition-all 
        hover:bg-secondary text-foreground
        dark:text-neon-blue hover:dark:bg-secondary"
			aria-label="Toggle theme"
		>
			{theme === "dark" ? (
				<Sun size={20} className="text-neon-yellow" />
			) : (
				<Moon size={20} />
			)}
		</button>
	);
};
