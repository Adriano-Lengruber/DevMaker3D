'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RichTextEditor } from '@/components/blog/RichTextEditor'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getBlogCategories } from '@/lib/blog'

interface BlogPostFormProps {
  post?: {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    coverImage: string | null
    published: boolean
    categoryId: string
    tags: string[]
  }
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    coverImage: post?.coverImage || '',
    published: post?.published || false,
    categoryId: post?.categoryId || '',
    tags: post?.tags?.join(', ') || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Array<{id: string, name: string}>>([])

  // Carregar categorias
  useState(() => {
    getBlogCategories().then(setCategories).catch(console.error)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = post ? `/api/posts/${post.id}` : '/api/posts'
      const method = post ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        })
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/blog/admin`)
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao salvar post')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Erro ao salvar post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Título do Post
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => {
              const title = e.target.value
              setFormData(prev => ({
                ...prev,
                title,
                slug: generateSlug(title)
              }))
            }}
            placeholder="Digite o título do post"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Slug
          </label>
          <Input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="slug-do-post"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Resumo
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          placeholder="Escreva um breve resumo do post"
          rows={3}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Categoria
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags (separadas por vírgula)
          </label>
          <Input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="impressão-3d, modelagem, blender"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Imagem de Capa (URL)
        </label>
        <Input
          type="url"
          value={formData.coverImage}
          onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
          placeholder="https://exemplo.com/imagem.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Conteúdo do Post
        </label>
        <RichTextEditor
          content={formData.content}
          onChange={(content) => setFormData(prev => ({ ...prev, content }))}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
          className="h-4 w-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500"
        />
        <label htmlFor="published" className="text-sm text-gray-300">
          Publicar imediatamente
        </label>
      </div>

      <div className="flex space-x-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 hover:bg-orange-600"
        >
          {isSubmitting ? 'Salvando...' : (post ? 'Atualizar Post' : 'Criar Post')}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}