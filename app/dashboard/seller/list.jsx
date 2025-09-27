'use client'

import { useRouter } from 'next/navigation'
import ListPropertyForm from '@/components/list-property-form'

export default function SellerListPropertyPage() {
  const router = useRouter()

  const handleSubmit = (data) => {
        router.push('/dashboard/seller/properties')
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <ListPropertyForm onSubmit={handleSubmit} onCancel={handleCancel} />
  )
}