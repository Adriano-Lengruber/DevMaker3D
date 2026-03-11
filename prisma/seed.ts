import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  try {
    // 1. Limpar banco para evitar duplicatas (opcional mas recomendado em dev)
    // await prisma.reaction.deleteMany({});
    // await prisma.comment.deleteMany({});
    // await prisma.post.deleteMany({});
    // await prisma.user.deleteMany({});

    // 2. Criar usuários
    const adminUser = await prisma.user.upsert({
      where: { email: 'contato@adriano-lengruber.com' },
      update: {},
      create: {
        name: 'Adriano Lengruber',
        email: 'contato@adriano-lengruber.com',
        role: 'ADMIN',
        bio: 'Fundador da DevMaker3D, engenheiro de coração e entusiasta da fabricação aditiva.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    })

    const communityUser = await prisma.user.upsert({
      where: { email: 'ana.maker@example.com' },
      update: {},
      create: {
        name: 'Ana Maker',
        email: 'ana.maker@example.com',
        role: 'USER',
        bio: 'Designer de produto explorando os limites da impressão em resina.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
      }
    })

    // 3. Criar categorias
    const catEngineering = await prisma.category.upsert({
      where: { slug: 'engenharia' },
      update: {},
      create: {
        name: 'Engenharia',
        slug: 'engenharia',
        description: 'Técnicas avançadas, materiais técnicos e rigor mecânico.',
        color: '#F57C00'
      }
    })

    const catArt = await prisma.category.upsert({
      where: { slug: 'arte-design' },
      update: {},
      create: {
        name: 'Arte & Design',
        slug: 'arte-design',
        description: 'Pós-processamento, pintura e estética.',
        color: '#FFD700'
      }
    })

    // 4. Criar posts
    const post1 = await prisma.post.upsert({
      where: { slug: 'precisao-mecanica-impressao-3d' },
      update: {},
      create: {
        title: 'Precisão Mecânica: Além do Plástico Derretido',
        slug: 'precisao-mecanica-impressao-3d',
        excerpt: 'Como alcançar tolerâncias de 0.1mm em peças funcionais usando FDM e PETG.',
        content: `
          <h2>A Ciência das Tolerâncias</h2>
          <p>Muitos acreditam que a impressão 3D é um processo impreciso. No entanto, com o ajuste correto de passos por mm e compensação de fluxo, podemos atingir resultados industriais.</p>
          <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=600&fit=crop" alt="Engenharia 3D" />
          <h3>Material é Destino</h3>
          <p>Para peças que exigem esforço mecânico, o PETG se sobressai. Sua adesão entre camadas é o que define se a peça vai quebrar sob carga ou resistir como um bloco sólido.</p>
        `,
        coverImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=600&fit=crop',
        published: true,
        featured: true,
        readTime: 8,
        authorId: adminUser.id,
        categories: { connect: { id: catEngineering.id } },
        publishedAt: new Date()
      }
    })

    const post2 = await prisma.post.upsert({
      where: { slug: 'alma-de-artista-pos-processamento' },
      update: {},
      create: {
        title: 'Alma de Artista: O Segredo do Pós-Processamento',
        slug: 'alma-de-artista-pos-processamento',
        excerpt: 'Transformando as linhas de camada em superfícies vítreas. Técnicas de lixamento e pintura.',
        content: `
          <h2>O Trabalho Invisível</h2>
          <p>A impressão termina na bandeja, mas a obra nasce na bancada de lixamento. O processo de "grit progression" da lixa 200 até a 2000 é o que separa um brinquedo de uma peça de museu.</p>
          <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1200&h=600&fit=crop" alt="Acabamento" />
          <p>Em cada pincelada de primer, buscamos a perfeição que a máquina não consegue entregar sozinha.</p>
        `,
        coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&h=600&fit=crop',
        published: true,
        readTime: 5,
        authorId: adminUser.id,
        categories: { connect: { id: catArt.id } },
        publishedAt: new Date()
      }
    })

    // 5. Adicionar Comentários e Reações
    await prisma.comment.create({
      data: {
        content: 'Este guia de tolerâncias salvou meu projeto de engrenagens! Obrigado Adriano.',
        approved: true,
        postId: post1.id,
        authorId: communityUser.id
      }
    })

    await prisma.reaction.create({
      data: {
        type: 'LOVE',
        postId: post1.id,
        userId: communityUser.id
      }
    })

    console.log('✅ Blog materializado com sucesso!')
    
  } catch (error) {
    console.error('❌ Erro no nascimento do blog:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()