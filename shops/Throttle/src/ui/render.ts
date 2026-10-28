import type { ViewModel } from '../types'
import type { Elements } from './elements'
import { renderCards, renderCategories } from './list'
import { renderStatus } from './status'
import { renderControls, renderShop, renderSummary } from './summary'

export const renderPage = (els: Elements, view: ViewModel): void => {
  renderStatus(view.state, els)
  renderCards(view.cards, els)
  renderCategories(view.categories, view.filters.category, els)
  renderControls(view.filters, els)
  renderSummary(view.summary, els)
  renderShop(view.shop, els)
}
