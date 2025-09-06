// 'use client'
// import { useState } from 'react'
// import { Upload } from 'lucide-react'

// const SettingsPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: 'Joanne',
//     lastName: 'Featherington',
//     email: 'joannefeatherington@gmail.com',
//   })
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   })
//   const [profilePicture, setProfilePicture] = useState<string | null>(null)

//   const handleProfileUpdate = () => {
//     alert('Profile updated successfully!')
//   }

//   const handlePasswordUpdate = () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert('New passwords do not match!')
//       return
//     }
//     alert('Password updated successfully!')
//     setPasswordData({
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     })
//   }

//   const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (event) => {
//         const result = event.target?.result as string
//         setProfilePicture(result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const getInitials = (firstName: string, lastName: string) => {
//     return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}
//       <nav className="bg-white border-b border-gray-200 px-4 py-4">
//         <div className="flex items-center space-x-2 text-sm text-gray-600">
//           <span className="hover:text-gray-900 cursor-pointer">Home</span>
//           <span>•</span>
//           <span className="text-gray-900">Settings</span>
//         </div>
//       </nav>

//       <div className="px-4 py-6">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-xl font-semibold text-gray-900 mb-2">Settings</h1>
//           <p className="text-sm text-gray-600">
//             Manage your account, preferences, and learning experience.
//           </p>
//         </div>

//         <div className="space-y-6">
//           {/* Personal Information Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             <div className="px-4 py-4 border-b border-gray-200">
//               <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
//                 Personal Information
//               </h2>
//             </div>

//             <div className="p-4">
//               {/* Display Picture */}
//               <div className="mb-6">
//                 <h3 className="text-sm font-medium text-gray-900 mb-2">
//                   Display picture
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Personalize your profile with a photo
//                 </p>
                
//                 <div className="flex items-center space-x-4">
//                   <div className="relative">
//                     {profilePicture ? (
//                       <img
//                         src={profilePicture}
//                         alt="Profile"
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
//                         <span className="text-blue-800 font-semibold text-sm">
//                           {getInitials(formData.firstName, formData.lastName)}
//                         </span>
//                       </div>
//                     )}
//                   </div>
                  
//                   <label className="cursor-pointer">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleProfilePictureUpload}
//                       className="hidden"
//                     />
//                     <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
//                       <Upload className="w-4 h-4 text-gray-600" />
//                       <span className="text-sm text-gray-700">Upload</span>
//                     </div>
//                   </label>
//                 </div>
//               </div>

//               {/* Profile Information Form */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-900 mb-2">
//                   Profile Information
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Edit your details to keep your profile up to date
//                 </p>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       First name
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.firstName}
//                       onChange={(e) =>
//                         setFormData({ ...formData, firstName: e.target.value })
//                       }
//                       className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
//                       placeholder="Joanne"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Last name
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.lastName}
//                       onChange={(e) =>
//                         setFormData({ ...formData, lastName: e.target.value })
//                       }
//                       className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
//                       placeholder="Featherington"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email address
//                     </label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                       className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
//                       placeholder="joannefeatherington@gmail.com"
//                     />
//                   </div>

//                   <button
//                     onClick={handleProfileUpdate}
//                     className="w-full px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Save changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Security Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             <div className="px-4 py-4 border-b border-gray-200">
//               <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
//                 Security
//               </h2>
//             </div>

//             <div className="p-4">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-900 mb-2">
//                   Update password
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Keep your account safe with a new password
//                 </p>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Current Password
//                     </label>
//                     <input
//                       type="password"
//                       value={passwordData.currentPassword}
//                       onChange={(e) =>
//                         setPasswordData({
//                           ...passwordData,
//                           currentPassword: e.target.value,
//                         })
//                       }
//                       className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
//                       placeholder="••••••••••"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       New password
//                     </label>
//                     <input
//                       type="password"
//                       value={passwordData.newPassword}
//                       onChange={(e) =>
//                         setPasswordData({
//                           ...passwordData,
//                           newPassword: e.target.value,
//                         })
//                       }
//                       className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Retype password
//                     </label>
//                     <input
//                       type="password"
//                       value={passwordData.confirmPassword}
//                       onChange={(e) =>
//                         setPasswordData({
//                           ...passwordData,
//                           confirmPassword: e.target.value,
//                         })
//                       }
//                       className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
//                     />
//                   </div>

//                   <button
//                     onClick={handlePasswordUpdate}
//                     className="w-full px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Update password
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SettingsPage

'use client'

import React from 'react'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { AvatarUpload } from '@/components/ui/avatar-upload'
import { useSettingsStore } from '../../../store/useSettingsStore'

const SettingsPage = () => {
  const {
    user,
    passwordData,
    isLoading,
    updateUser,
    updatePassword,
    saveChanges,
    updatePasswordAction,
    uploadAvatar
  } = useSettingsStore()

//   const breadcrumbItems = [
//     { label: 'Home', href: '/' },
//     { label: 'Settings' }
//   ]

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const handleUserInputChange = (field: keyof typeof user) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateUser({ [field]: e.target.value })
  }

  const handlePasswordInputChange = (field: keyof typeof passwordData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updatePassword({ [field]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          {/* <Breadcrumb items={breadcrumbItems} /> */}
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account, preferences, and learning experience.
            </p>
          </div>
        </div>

        {/* Personal Information Section */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Personal Information
              </h2>
            </div>

            {/* Display Picture */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Display picture</h3>
              <p className="text-sm text-muted-foreground">
                Personalize your profile with a photo.
              </p>
              <AvatarUpload
                initials={getInitials(user.firstName, user.lastName)}
                avatar={user.avatar}
                onUpload={uploadAvatar}
                isLoading={isLoading}
              />
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Profile information</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Edit your details to keep your profile up to date.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    value={user.firstName}
                    onChange={handleUserInputChange('firstName')}
                    placeholder="First name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    value={user.lastName}
                    onChange={handleUserInputChange('lastName')}
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={handleUserInputChange('email')}
                  placeholder="Email address"
                />
              </div>

              <Button 
                onClick={saveChanges}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Security
              </h2>
            </div>

            {/* Update Password */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Update password</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Keep your account safe with a new password.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordInputChange('currentPassword')}
                    placeholder="••••••••"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordInputChange('newPassword')}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retypePassword">Retype password</Label>
                    <Input
                      id="retypePassword"
                      type="password"
                      value={passwordData.retypePassword}
                      onChange={handlePasswordInputChange('retypePassword')}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <Button 
                  onClick={updatePasswordAction}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? 'Updating...' : 'Update password'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage