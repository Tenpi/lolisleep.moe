let newScrollY = 0
let lastScrollTop = 0
let element = null as any
let inertia = false
let mouseDown = false

export default class Functions {
  /** Promise SetTimeout */
  public static timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /** Gets the browser a user is using */
  public static getBrowser = () => {
    // @ts-ignore Not in types
    const Opera = (!!window["opr"] && !!opr.addons) || !!window["opera"] || navigator.userAgent.indexOf(" OPR/") >= 0
    // @ts-ignore Not in types
    const Firefox = typeof InstallTrigger !== "undefined"
    // @ts-ignore Not in types
    const Safari = /constructor/i.test(window.HTMLElement as unknown as string) || (function (p) {return p.toString() === "[object SafariRemoteNotification]" })(!window["safari"] || (typeof safari !== "undefined" && safari.pushNotification))
    const IE = false || !!document["documentMode"]
    // @ts-ignore
    const Edge = !IE && !!window.StyleMedia
    const Chrome = /Chrome/i.test(navigator.userAgent) && /Google Inc/i.test(navigator.vendor)
    return {Opera, Firefox, Safari, IE, Edge, Chrome}
  }

  /** Prevent image dragging */
  public static preventDragging = () => {
    document.querySelectorAll("img").forEach((img) => {
      img.draggable = false
    })
  }

  public static clearSelection() {
    window.getSelection()?.removeAllRanges()
  }

  public static dragScroll = (enabled?: boolean) => {
    if (inertia || mouseDown) return
    element?.removeEventListener("mousedown", element?.mouseDownFunc, false)
    window.removeEventListener("mouseup", element?.mouseUpFunc, false)
    window.removeEventListener("mousemove", element?.mouseMoveFunc, false)
    window.removeEventListener("scroll", element?.scrollFunc, false)

    element = document.querySelector(".drag") as HTMLElement
    if (!element || !enabled) return
    let lastClientY = 0
    mouseDown = false
    let time = null as any
    let id = 0

    element.addEventListener("mousedown", element.mouseDownFunc = (event: MouseEvent) => {
            if (event.button === 2) return 
            event.preventDefault()
            Functions.clearSelection()
            // @ts-ignore
            document.activeElement.blur()
            mouseDown = true
            inertia = false
            time = new Date()
            lastClientY = event.clientY
            let scrollElement = element
            if (element == document.body) scrollElement = document.documentElement
            lastScrollTop = scrollElement.scrollTop
            cancelAnimationFrame(id)
    }, false)

    window.addEventListener("scroll", element.scrollFunc = () => {
        cancelAnimationFrame(id)
    }, false)

    window.addEventListener("mouseup", element.mouseUpFunc = (event) => {
        mouseDown = false
        const timeDiff = (new Date() as any - time)
        let scrollElement = element
        if (element == document.body) scrollElement = document.documentElement
        let speedY = (scrollElement.scrollTop - lastScrollTop) / timeDiff * 25
        let speedYAbsolute = Math.abs(speedY)

        const draw = () => {
            let scrollElement = element
            if (element == document.body) scrollElement = document.documentElement
            if (speedYAbsolute > 0) {
                if (speedY > 0) {
                    scrollElement.scrollTop += speedYAbsolute--
                } else {
                    scrollElement.scrollTop -= speedYAbsolute--
                }
            } else {
                inertia = false
            }
            id = requestAnimationFrame(draw)
        }
        inertia = true
        draw()
    }, false)

    window.addEventListener("mousemove", element.mouseMoveFunc = (event) => {
        if (!mouseDown) return
        let scrollElement = element
        if (element == document.body) scrollElement = document.documentElement
        newScrollY = event.clientY - lastClientY
        lastClientY = event.clientY
        scrollElement.scrollTop -= newScrollY
    }, false)
}
}