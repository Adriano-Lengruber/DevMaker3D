import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  try {
    // Criar categorias básicas
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: 'impressao-3d' },
        update: {},
        create: {
          name: 'Impressão 3D',
          slug: 'impressao-3d',
          description: 'Tudo sobre impressão 3D, técnicas e materiais'
        }
      }),
      prisma.category.upsert({
        where: { slug: 'modelagem-3d' },
        update: {},
        create: {
          name: 'Modelagem 3D',
          slug: 'modelagem-3d',
          description: 'Tutoriais e dicas de modelagem 3D'
        }
      })
    ])

    console.log('✅ Categorias criadas com sucesso!')
    console.log('📁 Categorias:', categories.map(c => c.name).join(', '))
    
  } catch (error) {
    console.error('❌ Erro ao criar dados:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()