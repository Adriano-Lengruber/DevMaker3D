import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  try {
    // Criar usuários
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@devmaker3d.com' },
      update: {},
      create: {
        name: 'Admin DevMaker3D',
        email: 'admin@devmaker3d.com',
        password: hashedPassword,
        role: 'ADMIN',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    })

    const regularUser = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        name: 'João Silva',
        email: 'user@example.com',
        password: await bcrypt.hash('user123', 12),
        role: 'USER',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    })

    // Criar categorias
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
      }),
      prisma.category.upsert({
        where: { slug: 'materiais' },
        update: {},
        create: {
          name: 'Materiais',
          slug: 'materiais',
          description: 'Guia de materiais para impressão 3D'
        }
      }),
      prisma.category.upsert({
        where: { slug: 'projetos' },
        update: {},
        create: {
          name: 'Projetos',
          slug: 'projetos',
          description: 'Projetos e cases de sucesso'
        }
      })
    ])

    // Criar posts de exemplo
    const posts = await Promise.all([
      prisma.post.upsert({
        where: { slug: 'guia-completo-impressao-3d-iniciantes' },
        update: {},
        create: {
          title: 'Guia Completo de Impressão 3D para Iniciantes',
          slug: 'guia-completo-impressao-3d-iniciantes',
          excerpt: 'Aprenda tudo sobre impressão 3D: desde a escolha da impressora até as primeiras impressões. Um guia completo para iniciantes.',
          content: `
            <h2>O que é Impressão 3D?</h2>
            <p>A impressão 3D é uma tecnologia revolucionária que permite criar objetos físicos a partir de modelos digitais. Imagine poder transformar suas ideias em objetos reais com precisão milimétrica!</p>
            
            <h2>Como Funciona?</h2>
            <p>O processo de impressão 3D, também conhecido como fabricação aditiva, constrói objetos camada por camada. Cada camada é uma fatia horizontal fina do objeto final, depositada uma após a outra até completar o modelo.</p>
            
            <h3>Tipos de Impressão 3D</h3>
            <ul>
              <li><strong>FDM (Fused Deposition Modeling):</strong> O mais comum e acessível, ideal para iniciantes</li>
              <li><strong>SLA (Stereolithography):</strong> Alta precisão e acabamento superficial liso</li>
              <li><strong>SLS (Selective Laser Sintering):</strong> Ideal para prototipagem funcional</li>
            </ul>
            
            <h2>Escolhendo sua Primeira Impressora</h2>
            <p>Para iniciantes, recomendamos impressoras FDM por serem mais acessíveis e fáceis de operar. Aqui na DevMaker3D, trabalhamos com impressoras de alta qualidade que garantem resultados excepcionais.</p>
            
            <h3>Materiais Populares</h3>
            <p><strong>PLA:</strong> Biodegradável, fácil de imprimir, ideal para iniciantes</p>
            <p><strong>ABS:</strong> Mais resistente ao calor, perfeito para peças funcionais</p>
            <p><strong>PETG:</strong> Combina facilidade de impressão com durabilidade</p>
            
            <h2>Primeiros Passos</h2>
            <p>Comece com modelos simples, ajuste as configurações gradualmente e não desanime com os primeiros resultados. A impressão 3D é uma arte que requer paciência e prática!</p>
          `,
          coverImage: 'https://images.unsplash.com/photo-1581094794329-c8112b3f5c63?w=800&h=400&fit=crop',
          published: true,
          authorId: adminUser.id,
          categoryId: categories[0].id,
          tags: {
            connectOrCreate: [
              { where: { name: 'iniciantes' }, create: { name: 'iniciantes', slug: 'iniciantes' } },
              { where: { name: 'guia' }, create: { name: 'guia', slug: 'guia' } },
              { where: { name: 'tutorial' }, create: { name: 'tutorial', slug: 'tutorial' } }
            ]
          }
        }
      }),
      prisma.post.upsert({
        where: { slug: 'modelagem-3d-blender-dicas-essenciais' },
        update: {},
        create: {
          title: 'Modelagem 3D no Blender: Dicas Essenciais',
          slug: 'modelagem-3d-blender-dicas-essenciais',
          excerpt: 'Domine o Blender com estas dicas essenciais de modelagem 3D. Aprenda técnicas profissionais para criar modelos impressionantes.',
          content: `
            <h2>Por que Escolher o Blender?</h2>
            <p>O Blender é uma ferramenta poderosa e gratuita para modelagem 3D. Com recursos profissionais e uma comunidade ativa, é a escolha perfeita para iniciantes e profissionais.</p>
            
            <h2>Técnicas de Modelagem Essenciais</h2>
            <h3>1. Comece com Formas Simples</h3>
            <p>Sempre comece com primitivos básicos (cubo, esfera, cilindro) e vá refinando gradualmente. Esta abordagem torna o processo mais gerenciável.</p>
            
            <h3>2. Use Modificadores Inteligentemente</h3>
            <p>Modificadores como Mirror, Subdivision Surface e Boolean são ferramentas poderosas que economizam tempo e mantêm a geometria limpa.</p>
            
            <h3>3. Topologia é Fundamental</h3>
            <p>Uma boa topologia garante modelos que deformam corretamente na animação e imprimem bem em 3D. Evite n-gons e mantenha a geometria quadrada quando possível.</p>
            
            <h2>Dicas para Impressão 3D</h2>
            <p>Ao modelar para impressão 3D, lembre-se:</p>
            <ul>
              <li>Mantenha paredes com espessura mínima de 1mm</li>
              <li>Evite overhangs acentuados sem suporte</li>
              <li>Considere a necessidade de suportes internos</li>
              <li>Teste a estabilidade do modelo</li>
            </ul>
            
            <h2>Erros Comuns a Evitar</h2>
            <p>Modelos não-manifold, faces invertidas e geometria duplicada são problemas comuns que devem ser evitados para garantir uma impressão de qualidade.</p>
            
            <h2>Conclusão</h2>
            <p>A prática leva à perfeição. Comece com projetos simples e gradualmente aumente a complexidade. Aqui na DevMaker3D, estamos sempre disponíveis para ajudar com suas criações!</p>
          `,
          coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
          published: true,
          authorId: adminUser.id,
          categoryId: categories[1].id,
          tags: {
            connectOrCreate: [
              { where: { name: 'blender' }, create: { name: 'blender', slug: 'blender' } },
              { where: { name: 'modelagem' }, create: { name: 'modelagem', slug: 'modelagem' } },
              { where: { name: 'tutorial' }, create: { name: 'tutorial', slug: 'tutorial' } }
            ]
          }
        }
      })
    ])

    // Criar comentários de exemplo
    await Promise.all([
      prisma.comment.create({
        data: {
          content: 'Excelente artigo! Como iniciante, achei muito esclarecedor. Já estou ansioso para começar minha primeira impressão!',
          postId: posts[0].id,
          authorId: regularUser.id,
          approved: true
        }
      }),
      prisma.comment.create({
        data: {
          content: 'Muito bom! Vocês poderiam fazer um tutorial específico sobre configurações de temperatura para diferentes materiais?',
          postId: posts[0].id,
          authorId: regularUser.id,
          approved: true
        }
      })
    ])

    console.log('✅ Dados de exemplo criados com sucesso!')
    console.log('📧 Admin: admin@devmaker3d.com / admin123')
    console.log('📧 User: user@example.com / user123')
    
  } catch (error) {
    console.error('❌ Erro ao criar dados:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()