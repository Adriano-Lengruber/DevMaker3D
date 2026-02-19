declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    })
  }
}

// Custom events for DevMaker3D
export const analyticsEvents = {
  // Form events
  formSubmit: (formType: string) => {
    event({
      action: 'form_submit',
      category: 'engagement',
      label: formType,
    })
  },

  formError: (formType: string, error: string) => {
    event({
      action: 'form_error',
      category: 'engagement',
      label: `${formType}_${error}`,
    })
  },

  // CTA events
  ctaClick: (ctaType: string) => {
    event({
      action: 'cta_click',
      category: 'engagement',
      label: ctaType,
    })
  },

  // Service events
  serviceView: (serviceName: string) => {
    event({
      action: 'service_view',
      category: 'engagement',
      label: serviceName,
    })
  },

  serviceClick: (serviceName: string) => {
    event({
      action: 'service_click',
      category: 'engagement',
      label: serviceName,
    })
  },

  // Material events
  materialView: (materialName: string) => {
    event({
      action: 'material_view',
      category: 'engagement',
      label: materialName,
    })
  },

  // Portfolio events
  portfolioView: (projectName: string) => {
    event({
      action: 'portfolio_view',
      category: 'engagement',
      label: projectName,
    })
  },

  // Contact events
  contactMethod: (method: string) => {
    event({
      action: 'contact_method',
      category: 'conversion',
      label: method,
    })
  },

  // Navigation events
  navigation: (section: string) => {
    event({
      action: 'navigation',
      category: 'engagement',
      label: section,
    })
  },

  // Scroll events
  scrollDepth: (depth: number) => {
    event({
      action: 'scroll_depth',
      category: 'engagement',
      label: `${depth}%`,
      value: depth,
    })
  },

  // Time on page
  timeOnPage: (time: number) => {
    event({
      action: 'time_on_page',
      category: 'engagement',
      value: time,
    })
  },
}

// Scroll depth tracking
export const initScrollDepthTracking = () => {
  if (typeof window === 'undefined') return

  let maxScrollDepth = 0
  const scrollTracked = {
    25: false,
    50: false,
    75: false,
    90: false,
  }

  const trackScrollDepth = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollDepth = Math.floor((window.scrollY / scrollHeight) * 100)

    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth
    }

    // Track specific depths
    Object.keys(scrollTracked).forEach((depth) => {
      const depthNum = parseInt(depth)
      if (scrollDepth >= depthNum && !scrollTracked[depthNum as keyof typeof scrollTracked]) {
        scrollTracked[depthNum as keyof typeof scrollTracked] = true
        analyticsEvents.scrollDepth(depthNum)
      }
    })
  }

  window.addEventListener('scroll', trackScrollDepth)
  return () => window.removeEventListener('scroll', trackScrollDepth)
}

// Time on page tracking
export const initTimeOnPageTracking = () => {
  if (typeof window === 'undefined') return

  const startTime = Date.now()
  
  const trackTimeOnPage = () => {
    const timeOnPage = Math.floor((Date.now() - startTime) / 1000)
    analyticsEvents.timeOnPage(timeOnPage)
  }

  // Track time on page when user leaves
  window.addEventListener('beforeunload', trackTimeOnPage)
  
  // Track every 30 seconds
  const interval = setInterval(() => {
    const timeOnPage = Math.floor((Date.now() - startTime) / 1000)
    if (timeOnPage % 30 === 0) {
      analyticsEvents.timeOnPage(timeOnPage)
    }
  }, 30000)

  return () => {
    window.removeEventListener('beforeunload', trackTimeOnPage)
    clearInterval(interval)
  }
}