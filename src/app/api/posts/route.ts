import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where: any = { published: true }

    if (category) {
      where.category = { slug: category }
    }

    if (tag) {
      where.tags = { some: { name: tag } }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { name: true, image: true }
          },
          category: {
            select: { name: true, slug: true }
          },
          tags: {
            select: { name: true, slug: true }
          },
          _count: {
            select: { comments: true, reactions: true }
          }
        }
      }),
      prisma.post.count({ where })
    ])

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, slug, excerpt, content, coverImage, published, categoryId, tags } = await request.json()

    // Validar dados
    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Título, slug, resumo e conteúdo são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se o slug já existe
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    })

    if (existingPost) {
      return NextResponse.json(
        { error: 'Slug já existe' },
        { status: 400 }
      )
    }

    // Criar post
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        published,
        authorId: session.user.id,
        categoryId,
        tags: {
          connectOrCreate: tags.map((tagName: string) => ({
            where: { name: tagName },
            create: { name: tagName, slug: tagName.toLowerCase().replace(/\s+/g, '-') }
          }))
        }
      },
      include: {
        author: {
          select: { name: true, image: true }
        },
        category: {
          select: { name: true, slug: true }
        },
        tags: {
          select: { name: true, slug: true }
        }
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Erro ao criar post' },
      { status: 500 }
    )
  }
}