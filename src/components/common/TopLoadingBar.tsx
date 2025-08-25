const TopLoadingBar = () => {
	return (
		<div className="fixed top-0 left-0 w-full h-[3px] z-[9999] bg-transparent">
			<div className="w-full h-full bg-gradient-to-r from-[#0070f3] to-[#3291ff] animate-loading-bar" />
		</div>
	);
};
export default TopLoadingBar;
