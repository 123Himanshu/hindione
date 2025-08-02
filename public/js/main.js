const testimonials = [
  {
    text: "बहुत ही अनोखी और दिलचस्प ध्वनि",
    date: "23 मार्च 2025",
    author: "",
  },
  {
    text: "मैं आपके संदेश की स्पष्टता की सराहना करता हूँ।",
    date: "5 फरवरी 2025",
    author: "",
  },
  {
    text: "मेरे दिल और आत्मा के लिए आशीर्वाद। उसके नाम में धन्यवाद।",
    date: "10 अगस्त 2024",
    author: "",
  },
  {
    text: "मेरे दिल और आत्मा के लिए आशीर्वाद। भगवान ने आशीर्वाद दिया है और यह एक ऐसी शुरुआत है जिसका कभी अंत नहीं होगा।",
    date: "17 सितंबर 2024",
    author: "बिशप हेनरी व्हाइट",
  },
  {
    text: "इस संदेश से प्रेम है!!!!!!!!",
    date: "20 फरवरी 2020",
    author: "",
  },
  {
    text: "अच्छी आवाज़, अच्छा वस्त्र। मुझे पता है यह गॉस्पेल है।",
    date: "23 अप्रैल 2014",
    author: "",
  },
  {
    text: "ईश्वर महान है… उन्हें स्तुति करने के लिए धन्यवाद!!!!!!!!!!",
    date: "7 जुलाई 2020",
    author: "",
  },
  {
    text: "आपकी अभिषिक्त सेवकाई को भगवान आशीर्वाद दें!",
    date: "10 जनवरी 2017",
    author: "",
  },
  {
    text: "अच्छा",
    date: "11 जुलाई 2016",
    author: "",
  },
  {
    text: "आपका संगीत सच्ची खुशी देता है। मुझे पसंद है।",
    date: "14 दिसंबर 2015",
    author: "",
  },
  {
    text: "शानदार वेबसाइट",
    date: "11 दिसंबर 2015",
    author: "",
  },
  {
    text: "शानदार! आगे बढ़ो!",
    date: "8 दिसंबर 2015",
    author: "",
  }
];

const englishTestimonials = [
  {
    text: "Very unique and interesting sound",
    date: "Mar 23, 2025",
    author: "",
  },
  {
    text: "I appreciate the clarity of your message.",
    date: "Feb 05, 2025",
    author: "",
  },
  {
    text: "A blessing to my heart and soul. Thank in His Name.",
    date: "Aug 10, 2024",
    author: "",
  },
  {
    text: "A blessing to my heart and soul. God has blessed and this is the beginning that never ends.",
    date: "Sep 17, 2024",
    author: "Bishop Henry White",
  },
  {
    text: "Love this message!!!!!!!!",
    date: "Feb 20, 2020",
    author: "",
  },
  {
    text: "Nice voice, nice garment. I know that's gospel.",
    date: "Apr 23, 2014",
    author: "",
  },
  {
    text: "GOD IS GREAT… THANK YOU FOR PRAISING HIM!!!!!!!!!!",
    date: "Jul 7, 2020",
    author: "",
  },
  {
    text: "God bless your anointed ministry!",
    date: "Jan 10, 2017",
    author: "",
  },
  {
    text: "GOOD",
    date: "Jul 11, 2016",
    author: "",
  },
  {
    text: "Your music is pure delight. I like it.",
    date: "Dec 14, 2015",
    author: "",
  },
  {
    text: "Awesome website",
    date: "Dec 11, 2015",
    author: "",
  },
  {
    text: "Great! Go ahead!",
    date: "Dec 08, 2015",
    author: "",
  }
]

// Additional code can be added here
// Language Switcher Functions
function initializeLanguageSwitcher() {
  const languageButton = document.getElementById("languageButton")
  const languageDropdown = document.getElementById("languageDropdown")
  const languageSwitcher = document.querySelector(".language-switcher")

  if (languageButton && languageDropdown) {
    languageButton.addEventListener("click", (e) => {
      e.stopPropagation()
      languageDropdown.classList.toggle("show")
      languageSwitcher.classList.toggle("open")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      languageDropdown.classList.remove("show")
      languageSwitcher.classList.remove("open")
    })

    // Prevent dropdown from closing when clicking inside
    languageDropdown.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  }
}

function switchLanguage(lang) {
  const currentPath = window.location.pathname
  const currentPage = currentPath.split("/").pop() || "index.html"

  if (lang === "english") {
    // Redirect to English version
    if (currentPath.includes("/english/")) {
      // Already on English version
      return
    }
    window.location.href = `english/${currentPage}`
  } else if (lang === "hindi") {
    // Redirect to Hindi version (root)
    if (currentPath.includes("/english/")) {
      // Remove english/ from path
      const page = currentPage === "index.html" ? "" : currentPage
      window.location.href = `../${page}`
    }
    // Already on Hindi version if not in english folder
  }
}

// DOM Elements
const loadingOverlay = document.getElementById("loadingOverlay")
const header = document.getElementById("header")

// Audio elements (only on pages that have them)
const playButton = document.getElementById("playButton")
const playIcon = document.getElementById("playIcon")
const pauseIcon = document.getElementById("pauseIcon")

// Populate Testimonials Grid
const audioPlayer = document.getElementById("audioPlayer")
const audioWaves = document.getElementById("audioWaves")
const progressBar = document.getElementById("progressBar")
const currentTimeEl = document.getElementById("currentTime")
const durationEl = document.getElementById("duration")

// Audio state
let isPlaying = false

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set HTML lang attribute
  const currentPath = window.location.pathname
  if (currentPath.includes("/english/")) {
    document.documentElement.lang = "en"
  } else {
    document.documentElement.lang = "hi"
  }

  initializeNavigation()
  highlightActiveLink()
  initializeLanguageSwitcher() // Add this line

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

  // Populate testimonials based on language
  populateTestimonials()
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

// Update the populateTestimonials function
function populateTestimonials() {
  const testimoniesGrid = document.getElementById("testimoniesGrid")
  if (!testimoniesGrid) return

  const currentPath = window.location.pathname
  const isEnglish = currentPath.includes("/english/")
  const testimonialsData = isEnglish ? englishTestimonials : testimonials

  testimonialsData.forEach((testimonial) => {
    const card = document.createElement("div")
    card.className = "glass-card p-6 rounded-2xl transition-all duration-300 hover:scale-105"

    const content = `
            <div class="mb-4">
                <svg class="w-8 h-8 text-red-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p class="text-gray-800 text-lg mb-4">${testimonial.text}</p>
            </div>
            <div class="flex items-center justify-between">
                ${testimonial.author ? `<p class="text-gray-600 font-medium">${testimonial.author}</p>` : "<div></div>"}
                <p class="text-gray-500 text-sm">${testimonial.date}</p>
            </div>
        `

    card.innerHTML = content
    testimoniesGrid.appendChild(card)
  })
}
