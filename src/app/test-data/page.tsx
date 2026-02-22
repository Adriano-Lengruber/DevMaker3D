import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function TestDataPage() {
  try {
    // Criar categoria de teste
    const category = await prisma.category.upsert({
      where: { slug: 'teste' },
      update: {},
      create: {
        name: 'Categoria Teste',
        slug: 'teste',
        description: 'Categoria para testes'
      }
    })

    // Criar usuário de teste
    const hashedPassword = await bcrypt.hash('test123', 12)
    const user = await prisma.user.upsert({
      where: { email: 'teste@devmaker3d.com' },
      update: {},
      create: {
        name: 'Usuário Teste',
        email: 'teste@devmaker3d.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    // Criar post de teste
    const post = await prisma.post.upsert({
      where: { slug: 'post-teste' },
      update: {},
      create: {
        title: 'Post de Teste',
        slug: 'post-teste',
        excerpt: 'Este é um post de teste para verificar a funcionalidade do blog',
        content: '<h2>Testando o Blog</h2><p>Este é um post de teste para verificar se todos os componentes estão funcionando corretamente.</p><h3>Funcionalidades</h3><ul><li>Comentários</li><li>Reações</li><li>Formatação de texto</li></ul>',
        coverImage: 'https://images.unsplash.com/photo-1581094794329-c8112b3f5c63?w=800&h=400&fit=crop',
        published: true,
        authorId: user.id,
        categoryId: category.id
      }
    })

    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dados de Teste Criados!</h1>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Resumo dos Dados</h2>
            <ul className="space-y-2">
              <li>✅ Categoria: {category.name}</li>
              <li>✅ Usuário: {user.name} ({user.email})</li>
              <li>✅ Post: {post.title}</li>
            </ul>
          </div>

          <div className="bg-blue-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Próximos Passos</h2>
            <p className="mb-4">Agora você pode:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Visitar o blog em <a href="/blog" className="text-orange-500 hover:text-orange-400">/blog</a></li>
              <li>Ver o post de teste em <a href="/blog/post-teste" className="text-orange-500 hover:text-orange-400">/blog/post-teste</a></li>
              <li>Testar os comentários no post</li>
              <li>Verificar o painel admin em <a href="/blog/admin" className="text-orange-500 hover:text-orange-400">/blog/admin</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Erro ao criar dados de teste:', error)
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-red-400">Erro ao Criar Dados</h1>
          <div className="bg-red-900 rounded-lg p-6">
            <p className="mb-4">Ocorreu um erro ao criar os dados de teste:</p>
            <pre className="bg-black p-4 rounded text-sm overflow-auto">
              {error instanceof Error ? error.message : String(error)}
            </pre>
          </div>
        </div>
      </div>
    )
  } finally {
    await prisma.$disconnect()
  }
}