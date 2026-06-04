import CategorySliderSection from '@/Components/Ui/CORE-COMPONENT/category-slider'
import CategoryScrollBar from '@/Components/Ui/CORE-COMPONENT/category-list'
import BestSellingProducts from '@/Components/Ui/best-selling'
import AllProducts from '@/Components/Ui/all-product'




export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <CategorySliderSection />
      <div className="mt-8">
        <CategoryScrollBar />
      </div>
      <BestSellingProducts />
      <AllProducts />
    </main>
  )
}