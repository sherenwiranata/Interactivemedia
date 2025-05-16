window.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video.activity-image');
  
    videos.forEach(video => {
      // Ensure video starts muted for autoplay
      video.muted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
  
      video.addEventListener('mouseenter', () => {
        video.muted = false;
        video.volume = 1;
      });
  
      video.addEventListener('mouseleave', () => {
        video.muted = true;
      });
    });
  });
  