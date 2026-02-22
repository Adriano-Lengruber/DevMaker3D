import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// POST /api/reactions - Criar/atualizar reação
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const { type, postId, commentId } = await request.json()

    if (!type || (!postId && !commentId)) {
      return NextResponse.json(
        { error: "Type and postId or commentId are required" },
        { status: 400 }
      )
    }

    // Verificar se já existe uma reação do mesmo tipo
    const existingReaction = await prisma.reaction.findUnique({
      where: {
        userId_postId_commentId_type: {
          userId: session.user.id,
          postId: postId || null,
          commentId: commentId || null,
          type
        }
      }
    })

    if (existingReaction) {
      // Remover reação existente (toggle)
      await prisma.reaction.delete({
        where: { id: existingReaction.id }
      })
      
      return NextResponse.json({ message: "Reaction removed" })
    } else {
      // Remover outras reações do mesmo item (só pode uma por item)
      await prisma.reaction.deleteMany({
        where: {
          userId: session.user.id,
          postId: postId || null,
          commentId: commentId || null
        }
      })

      // Criar nova reação
      const reaction = await prisma.reaction.create({
        data: {
          type,
          postId: postId || null,
          commentId: commentId || null,
          userId: session.user.id
        }
      })

      return NextResponse.json(reaction, { status: 201 })
    }
  } catch (error) {
    console.error("Error creating reaction:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// GET /api/reactions - Buscar reações de um post/comentário
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const postId = searchParams.get("postId")
    const commentId = searchParams.get("commentId")

    if (!postId && !commentId) {
      return NextResponse.json(
        { error: "Post ID or Comment ID is required" },
        { status: 400 }
      )
    }

    const reactions = await prisma.reaction.groupBy({
      by: ["type"],
      where: {
        postId: postId || null,
        commentId: commentId || null
      },
      _count: {
        type: true
      }
    })

    return NextResponse.json(reactions)
  } catch (error) {
    console.error("Error fetching reactions:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}