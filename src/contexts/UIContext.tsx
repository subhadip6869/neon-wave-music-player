import React, { createContext, ReactNode, useContext, useState } from "react";

type ModalType = "account" | "playlist" | "subscription" | null;

interface UIContextType {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	activeModal: ModalType;
	openModal: (type: ModalType) => void;
	closeModal: () => void;
	isSearchOpen: boolean;
	toggleSearch: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [activeModal, setActiveModal] = useState<ModalType>(null);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	const openModal = (type: ModalType) => {
		setActiveModal(type);
	};

	const closeModal = () => {
		setActiveModal(null);
	};

	const toggleSearch = () => {
		setIsSearchOpen((prev) => !prev);
	};

	return (
		<UIContext.Provider
			value={{
				isSidebarOpen,
				toggleSidebar,
				activeModal,
				openModal,
				closeModal,
				isSearchOpen,
				toggleSearch,
			}}
		>
			{children}
		</UIContext.Provider>
	);
};

export const useUI = () => {
	const context = useContext(UIContext);
	if (context === undefined) {
		throw new Error("useUI must be used within a UIProvider");
	}
	return context;
};
