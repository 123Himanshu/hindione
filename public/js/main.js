// Main JavaScript for Spanish Gospel Website

// Testimonials Data
const testimonials = [
    {
        text: "बहुत ही अनोखी और दिलचस्प ध्वनि",
        date: "23 मार्च 2025"
    },
    {
        text: "मैं आपके संदेश की स्पष्टता की सराहना करता हूँ।",
        date: "5 फरवरी 2025"
    },
    {
        text: "मेरे दिल और आत्मा के लिए एक आशीर्वाद। प्रभु के नाम पर धन्यवाद।",
        date: "10 अगस्त 2024"
    },
    {
        text: "मेरे दिल और आत्मा के लिए एक आशीर्वाद। ईश्वर ने आशीर्वाद दिया है और यह एक ऐसा आरंभ है जिसका अंत नहीं है।",
        author: "बिशप हेनरी व्हाइट",
        date: "17 सितंबर 2024"
    },
    {
        text: "मुझे यह संदेश बहुत पसंद आया!",
        date: "20 फरवरी 2020"
    },
    {
        text: "सुंदर आवाज़, अच्छी प्रस्तुति। मुझे यकीन है कि आप सफल होंगे।",
        date: "23 अप्रैल 2024"
    },
    {
        text: "ईश्वर महान है… उसकी स्तुति करने के लिए धन्यवाद!",
        date: "17 जुलाई 2020"
    },
    {
        text: "ईश्वर आपके अभिषिक्त मंत्रालय को आशीर्वाद दे!",
        date: "10 जनवरी 2017"
    },
    {
        text: "अच्छा",
        date: "11 जुलाई 2016"
    },
    {
        text: "आपका संगीत वास्तव में आनंददायक है। मुझे पसंद आया।",
        date: "14 दिसंबर 2015"
    },
    {
        text: "शानदार वेबसाइट",
        date: "11 दिसंबर 2015"
    },
    {
        text: "बहुत अच्छा! ऐसे ही आगे बढ़ते रहो!",
        date: "9 दिसंबर 2015"
    }
];


// DOM Elements
const loadingOverlay = document.getElementById("loadingOverlay");
const header = document.getElementById("header");

// Audio elements (only on pages that have them)
const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

// Populate Testimonials Grid
document.addEventListener('DOMContentLoaded', function() {
    const testimoniesGrid = document.getElementById('testimoniesGrid');
    if (!testimoniesGrid) return;

    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'glass-card p-6 rounded-2xl transition-all duration-300 hover:scale-105';
        
        let content = `
            <div class="mb-4">
                <svg class="w-8 h-8 text-red-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p class="text-gray-800 text-lg mb-4">${testimonial.text}</p>
            </div>
            <div class="flex items-center justify-between">
                ${testimonial.author ? 
                    `<p class="text-gray-600 font-medium">${testimonial.author}</p>` : 
                    '<div></div>'}
                <p class="text-gray-500 text-sm">${testimonial.date}</p>
            </div>
        `;
        
        card.innerHTML = content;
        testimoniesGrid.appendChild(card);
    });
});
const audioPlayer = document.getElementById("audioPlayer")
const audioWaves = document.getElementById("audioWaves")
const progressBar = document.getElementById("progressBar")
const currentTimeEl = document.getElementById("currentTime")
const durationEl = document.getElementById("duration")

// Audio state
let isPlaying = false

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set HTML lang attribute to Spanish
  document.documentElement.lang = "es"

  initializeNavigation()
  highlightActiveLink()

  // Hide loading overlay when the page is loaded
  if (loadingOverlay) {
    loadingOverlay.classList.remove("visible")
    loadingOverlay.classList.add("hidden")
  }

  // Only initialize audio if elements exist (on index page)
  if (playButton && audioPlayer) {
    initializeAudio()
    // Initially hide audio waves
    if (audioWaves) {
      audioWaves.classList.add("hidden-waves")
    }
  }
})

// Navigation Management
function initializeNavigation() {
  // Smooth scrolling for anchor links and show loading overlay
  document.querySelectorAll('a[href^="#"], .nav-link, .mobile-nav-link').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Only show loading for external HTML links, not internal anchor links
      const href = this.getAttribute("href")
      if (href && !href.startsWith("#")) {
        if (loadingOverlay) {
          loadingOverlay.classList.remove("hidden")
          loadingOverlay.classList.add("visible")
        }
      }
      // Prevent default only for internal anchor links that need smooth scroll
      if (href && href.startsWith("#")) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    })
  })
}

// Highlight active navigation link
function highlightActiveLink() {
  const currentPath = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")
    if (linkPath === currentPath) {
      link.classList.add("active")
    } else if (currentPath === "" && linkPath === "index.html") {
      // Handle default index.html case
      link.classList.add("active")
    }
  })
}

// Audio Management
function initializeAudio() {
  if (!playButton || !audioPlayer) {
    console.warn("Audio elements not found")
    return
  }

  playButton.addEventListener("click", () => {
    if (isPlaying) {
      audioPlayer.pause()
      pauseAudio()
    } else {
      audioPlayer.play().catch((error) => {
        console.error("Audio play failed:", error)
        // Handle autoplay restrictions with Spanish message
        alert("Por favor, haz clic en el botón de reproducir para escuchar el audio.")
      })
      playAudio()
    }
    isPlaying = !isPlaying
  })

  audioPlayer.addEventListener("timeupdate", updateProgress)
  audioPlayer.addEventListener("loadedmetadata", updateDuration)
  audioPlayer.addEventListener("ended", () => {
    pauseAudio()
    isPlaying = false
  })

  audioPlayer.addEventListener("error", (e) => {
    console.error("Audio error:", e)
    alert("Error al cargar el audio. Por favor, inténtalo de nuevo.")
  })

  // Add click on progress bar to seek
  if (progressBar && progressBar.parentElement) {
    progressBar.parentElement.addEventListener("click", function (e) {
      if (audioPlayer.duration) {
        const percent = e.offsetX / this.offsetWidth
        audioPlayer.currentTime = percent * audioPlayer.duration
      }
    })
  }

  function playAudio() {
    if (playIcon && pauseIcon) {
      playIcon.classList.add("hidden")
      pauseIcon.classList.remove("hidden")
    }
    if (audioWaves) {
      audioWaves.classList.remove("hidden-waves")
      audioWaves.classList.add("visible-waves")
    }
  }

  function pauseAudio() {
    if (playIcon && pauseIcon) {
      playIcon.classList.remove("hidden")
      pauseIcon.classList.add("hidden")
    }
    if (audioWaves) {
      audioWaves.classList.remove("visible-waves")
      audioWaves.classList.add("hidden-waves")
    }
  }

  function updateProgress() {
    if (audioPlayer.duration && progressBar && currentTimeEl) {
      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100
      progressBar.style.width = progress + "%"
      currentTimeEl.textContent = formatTime(audioPlayer.currentTime)
    }
  }

  function updateDuration() {
    if (audioPlayer.duration && durationEl) {
      durationEl.textContent = formatTime(audioPlayer.duration)
    }
  }

  function formatTime(time) {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Global error handler for better user experience
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error)
  // Don't show alerts for every error, just log them
})

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason)
  e.preventDefault() // Prevent the default browser behavior
})
