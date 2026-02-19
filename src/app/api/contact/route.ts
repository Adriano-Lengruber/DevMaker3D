import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schema de validação
const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().email('Email inválido').max(100),
  phone: z.string().min(10, 'Telefone inválido').max(20),
  subject: z.string().min(5, 'Assunto deve ter pelo menos 5 caracteres').max(200),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(2000),
  serviceType: z.enum([
    'prototipagem',
    'pecas-funcionais', 
    'pecas-decorativas',
    'modelagem-3d',
    'pos-processamento',
    'producao-serie'
  ]),
})

// Configuração para multipart/form-data (nova sintaxe App Router)
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Função auxiliar para parsear multipart/form-data
async function parseFormData(request: NextRequest) {
  const formData = await request.formData()
  const data: Record<string, string> = {}
  const file = formData.get('file') as File | null

  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      data[key] = value
    }
  }

  return { data, file }
}

// Função para enviar email (mock - implementar com Resend ou similar)
async function sendContactEmail(data: z.infer<typeof contactFormSchema>, file?: File) {
  // Aqui você implementaria o envio real de email
  // Por exemplo, usando Resend, SendGrid, ou outro serviço
  
  console.warn('📧 Email de contato enviado:', {
    to: process.env.RESEND_TO_EMAIL || 'contato@devmaker3d.com.br',
    from: process.env.RESEND_FROM_EMAIL || 'contato@devmaker3d.com.br',
    subject: `Novo contato - ${data.subject}`,
    data,
    file: file ? {
      name: file.name,
      size: file.size,
      type: file.type
    } : null
  })

  // Simula envio de email
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return { success: true }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Muitas requisições. Tente novamente em alguns minutos.' 
        },
        { status: 429 }
      )
    }
    
    const { data, file } = await parseFormData(request)
    
    // Validação dos dados
    const validationResult = contactFormSchema.safeParse(data)
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message
        return acc
      }, {} as Record<string, string>)
      
      return NextResponse.json(
        { 
          success: false, 
          errors,
          message: 'Dados inválidos' 
        },
        { status: 400 }
      )
    }

    // Validação do arquivo (se existir)
    if (file) {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = [
        'application/sla',
        'application/vnd.ms-pki.stl', 
        'application/octet-stream',
        'model/stl',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/pdf'
      ]
      
      if (file.size > maxSize) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Arquivo muito grande. Tamanho máximo: 10MB' 
          },
          { status: 400 }
        )
      }
      
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Tipo de arquivo não permitido' 
          },
          { status: 400 }
        )
      }
    }

    // Enviar email
    const emailResult = await sendContactEmail(validationResult.data, file || undefined)
    
    if (!emailResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Erro ao enviar email' 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso!'
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro interno do servidor' 
      },
      { status: 500 }
    )
  }
}

// Rate limiting (simple implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 10
  
  const record = requestCounts.get(ip)
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}