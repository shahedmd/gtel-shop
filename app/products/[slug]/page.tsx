import { ALL_PRODUCTS } from '@/Components/Ui/all-products-data' // <-- পরিবর্তিত ইম্পোর্ট
import ProductDetails from '@/Components/Ui/ProductDetails'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  const product = ALL_PRODUCTS.find(
    p => p.href === `/products/${slug}`
  )

  if (!product) {
    return notFound()
  }

  return <ProductDetails product={product} />
}