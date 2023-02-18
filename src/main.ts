
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './sass/styles.scss'

const menuBtn: HTMLDivElement | null = document.querySelector(".menu")
const navbar: HTMLElement | null = document.querySelector(".nav__bar")
const topHeader: HTMLElement | null = document.querySelector('.top__header')
const sectionList: NodeListOf<HTMLElement> | null = document.querySelectorAll("section")
const navItems: NodeListOf<HTMLElement> | null = document.querySelectorAll(".nav-items")
const buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.btn')


let timerId: number | null = null
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

// toggle navbar
menuBtn?.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation()
    menuBtn.classList.toggle("active")

    toggleNavbar(menuBtn)
})

// custom sticky navbar
window.addEventListener("scroll", () => {
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

// active navbar after scroll

window.addEventListener("scroll", () => {

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
})


