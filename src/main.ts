
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './sass/styles.scss'


import Typed from 'typed.js'

const menuBtn: HTMLDivElement | null = document.querySelector(".menu")
const navbar: HTMLElement | null = document.querySelector(".nav__bar")
const topHeader: HTMLElement | null = document.querySelector('.top__header')
const sectionList: NodeListOf<HTMLElement> | null = document.querySelectorAll("section")
const navItems: NodeListOf<HTMLElement> | null = document.querySelectorAll(".nav-items")
const buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.btn')
const circle: HTMLElement | null = document.querySelector('.circle')

let quotes = "Talk-is-cheap.Show-me-the-code-"
circle?.style.setProperty("--length", `${quotes.length}`)
console.log(quotes.length);

for (let i = 0; i < quotes.length; i++) {
    let spanTag = document.createElement("span")
    spanTag.textContent = quotes.charAt(i)
    spanTag.style.setProperty("--i", `${i + 1}`)
    circle?.appendChild(spanTag)
}

let timerId: number | null
buttons.forEach((btn) => {
    btn.addEventListener("mousemove", function (e: MouseEventInit) {

        if (timerId !== null) return
        if (!e.clientX || !e.clientY) return
        const boudingRect = btn.getBoundingClientRect()
        let y = e.clientY - boudingRect.y
        let x = e.clientX - boudingRect.x

        let ripples: HTMLElement = document.createElement("span")
        ripples.style.left = `${x}px`
        ripples.style.top = `${y}px`
        btn.appendChild(ripples)

        timerId = setTimeout(() => {
            ripples.remove()
            timerId = null
        }, 1000);

    })
})
// toggle navbar
function toggleNavbar(menuBtn: HTMLElement) {
    if (!navbar) return

    if (menuBtn.classList.contains("active")) {
        navbar.style.height = (navbar.scrollHeight + 32) + 'px';
        return
    }

    navbar.style.height = `0px`;
}

// active navLink when scrolling
const activeNavLink = () => {
    if (!sectionList) return
    sectionList.forEach((element) => {
        const clientOffsetTop: number = element.offsetTop
        const clientHeight: number = element.clientHeight
        const isDisplay: boolean = scrollY >= (clientOffsetTop - clientHeight / 3)
        if (isDisplay) {
            const elementId = element.id
            navItems.forEach(navItem => {
                if (navItem.dataset.id === elementId) {
                    navItem.classList.add("active")
                    return
                }

                navItem.classList.remove("active")
            })
        }
    })
}

// toggle navbar
menuBtn?.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation()
    menuBtn.classList.toggle("active")

    toggleNavbar(menuBtn)
})

// custom sticky navbar
window.addEventListener("scroll", () => {
    activeNavLink()
    if (!topHeader) return

    if (window.scrollY > 0) {
        if (topHeader.classList.contains("fixed")) return
        topHeader.classList.add("fixed")
    }
    else {
        topHeader.classList.remove("fixed")
    }
})

// close navbar if click outside
document.body.addEventListener("click", (e: MouseEvent) => {
    if (!menuBtn || !menuBtn.classList.contains("active")) return

    menuBtn.classList.remove("active")

    toggleNavbar(menuBtn)
})


var typed = new Typed('#typed', {
    strings: ["", "I'm <span class='name'>Nguyen Doan Huy Son</span>"],
    typeSpeed: 100,
    startDelay: 0,
    backSpeed: 50,
    backDelay: 3000,
    loop: true,
    loopCount: Infinity,
    contentType: 'html',
    showCursor: true,
    cursorChar: '|'

});


document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            let element = (entry.target as HTMLElement)
            if (entry.isIntersecting) {
                if (element.dataset[`animeDesktop`] && window.innerWidth > - 760) {
                    let animeName = element.dataset['animeDesktop']
                    let duration = element.dataset['animeDesktopDuration'] || '1s'
                    let timing = element.dataset['animeDesktopTiming'] || 'ease-out'

                    element.style.animation = `${animeName} ${duration} ${timing}`
                    return
                }

                let animeName = element.dataset['anime']
                let duration = element.dataset['animeDuration'] || '1s'
                let timing = element.dataset['animeTiming'] || 'ease-out'
                element.style.animation = element.style.animation = `${animeName} ${duration} ${timing}`
                return
            }

        })
    })

    document.querySelectorAll("[data-anime],[data-anime-desktop]")?.forEach(item => {
        observer.observe(item)
    })
});