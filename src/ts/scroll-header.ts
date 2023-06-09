import scrolledPage from './functions/scrolled-page'

const init = (): void => {
  const header = document.querySelector('*[data-header]') as HTMLElement

  if (!header) return

  let prevOffsetTop: number = scrolledPage.init().top

  const scrollHeader = (): void => {
    const currentOffsetTop: number = scrolledPage.init().top
    const headerHeight: number = header.offsetHeight

    prevOffsetTop > currentOffsetTop
      ? header.style.setProperty('--top', '0')
      : header.style.setProperty('--top', `-${headerHeight}px`)

    prevOffsetTop = currentOffsetTop
  }

  document.addEventListener('scroll', scrollHeader as EventListener)

  const smoothWrapper = document.querySelector('#smooth-wrapper') as HTMLElement

  if (smoothWrapper) {
    const wrapperResize = (): void => {
      smoothWrapper.style.paddingTop = `${header.offsetHeight}px`
    }

    wrapperResize()

    window.addEventListener('resize', wrapperResize as EventListener)
  }
}

export default { init }
