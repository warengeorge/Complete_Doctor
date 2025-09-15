'use client'

import React, { useRef } from 'react'
import { Upload, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AvatarUploadProps {
  initials: string
  avatar?: string
  onUpload: (file: File) => void
  isLoading?: boolean
  className?: string
}

export function AvatarUpload({ 
  initials, 
  avatar, 
  onUpload, 
  isLoading = false, 
  className 
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div className={cn('flex items-center space-x-4', className)}>
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {avatar ? (
            <img 
              src={avatar} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-semibold text-muted-foreground">
              {initials}
            </span>
          )}
        </div>
      </div>
      
      <div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleUploadClick}
          disabled={isLoading}
          className="gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  )
}