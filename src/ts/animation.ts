import { coordinates } from './functions/coordinates'
import scrolledPage from './functions/scrolled-page'

const setOffset = (element: HTMLElement): coordinates => {
  const coordinates: coordinates = {
    top: element.getBoundingClientRect().top + scrolledPage.init().top,
    left: element.getBoundingClientRect().left + scrolledPage.init().left,
  }

  return coordinates
}

const onScroll = (): void => {
  const items = document.querySelectorAll('*[data-anim]') as NodeListOf<Element>

  items.forEach((element: Element): void => {
    const item = element as HTMLElement

    if (!item) return

    const height: number = item.offsetHeight
    const offsetTop: number = setOffset(item).top
    const screenPosition = 4

    let point: number = window.innerHeight - height / screenPosition

    if (point > window.innerHeight) point = window.innerHeight - window.innerHeight / screenPosition

    if (scrolledPage.init().top > offsetTop - point && scrolledPage.init().top < offsetTop + height) {
      item.dataset.anim = 'show'
    } else {
      item.dataset.anim = 'hidden'
    }
  })
}

const init = (): void => {
  onScroll()

  document.addEventListener('scroll', onScroll as EventListener)
}

export default { init, onScroll }
