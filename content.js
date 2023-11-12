let skipOnCooldown = false;

const setSkipOnCooldown = () => {
	skipOnCooldown = true;
	setTimeout(() => {
		skipOnCooldown = false;
	}, 200);
};

const observer = new MutationObserver(() => {
	const isAdPlaying = document.querySelector("div.ad-showing");
	if (!isAdPlaying) return;
	const [skipButton] = document.getElementsByClassName("ytp-ad-skip-button");
	if (skipButton) {
		setSkipOnCooldown();
		skipButton.click();
		return;
	}
	const [modernSkipButton] = document.getElementsByClassName("ytp-ad-skip-button-modern");
	if (modernSkipButton) {
		setSkipOnCooldown();
		modernSkipButton.click();
		return;
	}
	const [videoElement] = document.getElementsByClassName("video-stream html5-main-video");
	if (!videoElement.duration || skipOnCooldown) return;
	setSkipOnCooldown();
	videoElement.currentTime = videoElement.duration;
});
observer.observe(document.body, { childList: true, subtree: true });
