"use client";
import React from "react";

const TopLoadingBar = () => (
	<div
		style={{
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: 3,
			zIndex: 9999,
			background: "transparent",
		}}
	>
		<div
			style={{
				width: "100%",
				height: "100%",
				background: "linear-gradient(90deg, #0070f3 0%, #3291ff 100%)",
				animation: "loading-bar 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
			}}
		/>
		<style jsx>{`
			@keyframes loading-bar {
				0% {
					transform: translateX(-100%);
				}
				50% {
					transform: translateX(0%);
				}
				100% {
					transform: translateX(100%);
				}
			}
		`}</style>
	</div>
);

export default TopLoadingBar;
