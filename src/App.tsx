import { useEffect } from "react";
import { HomePage } from "./components/HomePage";
import { Modals } from "./components/Modals";
import { Player } from "./components/Player";
import { SearchPanel } from "./components/SearchPanel";
import { Sidebar } from "./components/Sidebar";
import { PlayerProvider } from "./contexts/PlayerContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UIProvider } from "./contexts/UIContext";

const Index = () => {
	useEffect(() => {
		const setVH = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		};

		setVH();
		window.addEventListener("resize", setVH);

		return () => {
			window.removeEventListener("resize", setVH);
		};
	}, []);

	return (
		<ThemeProvider>
			<UIProvider>
				<PlayerProvider>
					<main className="flex min-h-screen h-[calc(100*var(--vh,1vh))]">
						<Sidebar />
						<div className="flex flex-col flex-grow ml-20 md:ml-64">
							<HomePage />
							<Player />
						</div>
						<SearchPanel />
						<Modals />
					</main>
				</PlayerProvider>
			</UIProvider>
		</ThemeProvider>
	);
};

export default Index;
