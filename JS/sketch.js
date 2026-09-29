

document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne TOUS les conteneurs vidéo de n'importe quelle page
    const containers = document.querySelectorAll('.video-container');

    containers.forEach(container => {
        const video = container.querySelector('.custom-video');
        const playPauseBtn = container.querySelector('.play-pause');
        const progressBar = container.querySelector('.progress-bar');
        const muteBtn = container.querySelector('.mute-btn');
        const volumeBar = container.querySelector('.volume-bar');

        if (!video) return; // Sécurité si le conteneur est vide

        // Play / Pause
        function togglePlay() {
            if (video.paused) {
                video.play();
                if (playPauseBtn) playPauseBtn.textContent = '⏸';
            } else {
                video.pause();
                if (playPauseBtn) playPauseBtn.textContent = '▶';
            }
        }

        if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);

        // Barre de progression
        video.addEventListener('timeupdate', () => {
            if (video.duration && progressBar) {
                const percentage = (video.currentTime / video.duration) * 100;
                progressBar.value = isNaN(percentage) ? 0 : percentage;
            }
        });

        if (progressBar) {
            progressBar.addEventListener('input', () => {
                if (video.duration) {
                    video.currentTime = (progressBar.value / 100) * video.duration;
                }
            });
        }

        // Volume
        if (volumeBar) {
            volumeBar.addEventListener('input', () => {
                video.volume = volumeBar.value;
                if (muteBtn) {
                    muteBtn.textContent = video.volume === 0 ? '🔇' : (video.volume < 0.5 ? '🔉' : '🔊');
                }
            });
        }

        // Mute
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                video.muted = !video.muted;
                muteBtn.textContent = video.muted ? '🔇' : (video.volume < 0.5 ? '🔉' : '🔊');
                if (volumeBar) volumeBar.value = video.muted ? 0 : video.volume;
            });
        }

        // Réinitialiser à la fin
        video.addEventListener('ended', () => {
            if (playPauseBtn) playPauseBtn.textContent = '▶';
            if (progressBar) progressBar.value = 0;
        });
    });
});