import prisma from './prisma'

export async function getBlogPosts(options?: {
  limit?: number
  page?: number
  category?: string
  tag?: string
  author?: string
  featured?: boolean
}) {
  try {
    const {
      limit = 10,
      page = 1,
      category,
      tag,
      author,
      featured
    } = options || {}

    const skip = (page - 1) * limit

    const where: any = {
      published: true
    }

    if (featured !== undefined) {
      where.featured = featured
    }

    if (category) {
      where.categories = {
        some: {
          slug: category
        }
      }
    }

    if (tag) {
      where.tags = {
        some: {
          slug: tag
        }
      }
    }

    if (author) {
      where.author = {
        id: author
      }
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true
            }
          },
          categories: true,
          tags: true,
          _count: {
            select: {
              comments: {
                where: {
                  approved: true
                }
              },
              reactions: true
            }
          }
        },
        orderBy: [
          { featured: 'desc' },
          { publishedAt: 'desc' }
        ]
      }),
      prisma.post.count({ where })
    ])

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return {
      posts: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
      }
    }
  }
}

export async function getBlogCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            posts: {
              where: {
                published: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getBlogTags() {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            posts: {
              where: {
                published: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return tags
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

export async function getPopularBlogPosts(limit = 5) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true
      },
      select: {
        id: true,
        title: true,
        slug: true,
        views: true
      },
      orderBy: {
        views: 'desc'
      },
      take: limit
    })

    return posts
  } catch (error) {
    console.error('Error fetching popular posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug,
        published: true
      },
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
          where: {
            approved: true
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true
              }
            },
            reactions: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            },
            _count: {
              select: {
                reactions: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
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
            comments: {
              where: {
                approved: true
              }
            },
            reactions: true
          }
        }
      }
    })

    return post
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

export async function incrementPostViews(postId: string) {
  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        views: {
          increment: 1
        }
      }
    })
  } catch (error) {
    console.error('Error incrementing post views:', error)
  }
}