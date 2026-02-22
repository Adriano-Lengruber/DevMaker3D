import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function BlogAdminHeader() {
  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            DevMaker3D
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/blog"
              className="text-gray-300 hover:text-orange-500 transition-colors"
            >
              Ver Blog
            </Link>
            <Link
              href="/blog/admin/posts/new"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Novo Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}