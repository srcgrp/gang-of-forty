import type { ReactNode } from 'react'
import { useCatalogContext } from '../../context/CatalogContext'
import SuccessContent from '../SuccessContent'

export default function HomePage(): ReactNode {
  const catalog = useCatalogContext()
  return <SuccessContent catalog={catalog} />
}
