
import Navbar from '@/components/navbar'

export function generateStaticParams() {
  return [{}]; // This generates just the home page "/"
}

const page = () => {
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default page