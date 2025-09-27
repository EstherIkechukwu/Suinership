'use client'

import type React from 'react'
import { useState } from 'react'
import { Upload, X, FileText, ImageIcon, Building, MapPin, DollarSign, Users, Shield, Percent } from 'lucide-react'

interface PropertyFormData {
  name: string
  type: string
  location: string
  description: string
  totalValue: string
  pricePerFraction: string
  totalFractions: string
  expectedROI: string
  percentageToSell: string
  images: File[]
  documents: File[]
  verificationType: string
  verificationContact: string
  verificationEmail: string
  verificationPhone: string
}

interface ListPropertyFormProps {
  onSubmit?: (data: PropertyFormData) => void
  onCancel?: () => void
}

export default function ListPropertyForm({ onSubmit, onCancel }: ListPropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    type: '',
    location: '',
    description: '',
    totalValue: '',
    pricePerFraction: '',
    totalFractions: '',
    expectedROI: '',
    percentageToSell: '',
    images: [],
    documents: [],
    verificationType: '',
    verificationContact: '',
    verificationEmail: '',
    verificationPhone: '',
  })

  const [dragActive, setDragActive] = useState<'images' | 'documents' | null>(null)

  const handleInputChange = (field: keyof PropertyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (files: FileList | null, type: 'images' | 'documents') => {
    if (!files) return
    const newFiles = Array.from(files)
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ...newFiles],
    }))
  }

  const removeFile = (index: number, type: 'images' | 'documents') => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }))
  }

  const handleDrag = (e: React.DragEvent, type: 'images' | 'documents') => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(type)
    } else if (e.type === 'dragleave') {
      setDragActive(null)
    }
  }

  const handleDrop = (e: React.DragEvent, type: 'images' | 'documents') => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(null)
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files, type)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  const verificationTypes = [
    'Law Firm',
    'Real Estate Agent',
    'Licensed Surveyor',
    'Property Valuer',
    'Government Registry',
    'Certified Appraiser',
  ]

  return (
    <div className="min-h-screen bg-[#0B1426] text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">List New Property</h1>
            <p className="text-gray-400">Add a new fractional real estate property to your portfolio</p>
          </div>
          {onCancel && (
            <button onClick={onCancel} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Property Information */}
          {/* ... (rest of the form as in your provided code) ... */}
        </form>
      </div>
    </div>
  )
}