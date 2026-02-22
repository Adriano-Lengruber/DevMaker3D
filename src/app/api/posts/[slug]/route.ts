import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET /api/posts/[slug] - Buscar post por slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true
          }
        },
        categories: true,
        tags: true,
        comments: {
          where: { approved: true },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          },
          orderBy: { createdAt: "desc" }
        },
        reactions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        },
        _count: {
          select: {
            comments: { where: { approved: true } },
            reactions: true
          }
        }
      }
    })

    if (!post || !post.published) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    // Incrementar visualizações
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT /api/posts/[slug] - Atualizar post
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { title, content, excerpt, coverImage, categories, tags, published } = data

    const post = await prisma.post.update({
      where: { slug: params.slug },
      data: {
        title,
        content,
        excerpt,
        coverImage,
        published,
        publishedAt: published ? new Date() : null,
        categories: {
          set: categories?.map((id: string) => ({ id })) || []
        },
        tags: {
          set: tags?.map((id: string) => ({ id })) || []
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        categories: true,
        tags: true
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/posts/[slug] - Deletar post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    await prisma.post.delete({
      where: { slug: params.slug }
    })

    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}