'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  serviceType: string
  file?: File
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
  serviceType?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: 'prototipagem',
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório'
    } else if (!/^\(?[0-9]{2}\)?[-.\s]?[0-9]{4,5}[-.\s]?[0-9]{4}$/.test(formData.phone)) {
      newErrors.phone = 'Telefone inválido'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('Arquivo muito grande. Tamanho máximo: 10MB')
        return
      }
      
      // Validate file type
      const allowedTypes = ['.stl', '.obj', '.3mf', '.step', '.stp', '.jpg', '.jpeg', '.png', '.pdf']
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
      
      if (!allowedTypes.includes(fileExtension)) {
        alert('Tipo de arquivo não permitido. Formatos aceitos: STL, OBJ, 3MF, STEP, STP, JPG, PNG, PDF')
        return
      }
      
      setFormData(prev => ({ ...prev, file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined) {
          formDataToSend.append(key, value)
        }
      })

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          serviceType: 'prototipagem',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <div>
            <h3 className="text-green-400 font-medium">Mensagem enviada com sucesso!</h3>
            <p className="text-green-300 text-sm mt-1">
              Obrigado pelo contato. Responderemos em até 24 horas.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div>
            <h3 className="text-red-400 font-medium">Erro ao enviar mensagem</h3>
            <p className="text-red-300 text-sm mt-1">
              Por favor, tente novamente ou entre em contato por telefone.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#A0A0A0] mb-2">
              Nome completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#F57C00] focus:border-transparent transition-all",
                errors.name && "border-red-500 focus:ring-red-500"
              )}
              placeholder="Seu nome"
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#A0A0A0] mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#F57C00] focus:border-transparent transition-all",
                errors.email && "border-red-500 focus:ring-red-500"
              )}
              placeholder="seu@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#A0A0A0] mb-2">
              Telefone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#F57C00] focus:border-transparent transition-all",
                errors.phone && "border-red-500 focus:ring-red-500"
              )}
              placeholder="(22) 99999-9999"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-[#A0A0A0] mb-2">
              Tipo de serviço
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F57C00] focus:border-transparent transition-all"
            >
              <option value="prototipagem">Prototipagem</option>
              <option value="pecas-funcionais">Peças funcionais</option>
              <option value="pecas-decorativas">Peças decorativas</option>
              <option value="modelagem-3d">Modelagem 3D</option>
              <option value="pos-processamento">Pós-processamento</option>
              <option value="producao-serie">Produção em série</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-[#A0A0A0] mb-2">
            Assunto *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={cn(
              "w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#F57C00] focus:border-transparent transition-all",
              errors.subject && "border-red-500 focus:ring-red-500"
            )}
            placeholder="Sobre o que se trata?"
          />
          {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#A0A0A0] mb-2">
            Mensagem *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className={cn(
              "w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#F57C00] focus:border-transparent transition-all resize-none",
              errors.message && "border-red-500 focus:ring-red-500"
            )}
            placeholder="Descreva seu projeto, necessidades e expectativas..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-[#A0A0A0] mb-2">
            Anexar arquivo (opcional)
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#F57C00] file:text-white hover:file:bg-[#FF9500] transition-all"
            accept=".stl,.obj,.3mf,.step,.stp,.jpg,.jpeg,.png,.pdf"
          />
          <p className="mt-1 text-xs text-[#666666]">
            Formatos aceitos: STL, OBJ, 3MF, STEP, STP, JPG, PNG, PDF (máx. 10MB)
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#F57C00] text-white font-medium rounded-lg transition-all duration-300",
            "hover:bg-[#FF9500] hover:shadow-[0_0_20px_rgba(245,124,0,0.4)]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Enviar mensagem
            </>
          )}
        </button>
      </form>
    </div>
  )
}