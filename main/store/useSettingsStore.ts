import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  firstName: string
  lastName: string
  email: string
  avatar?: string
}

interface PasswordData {
  currentPassword: string
  newPassword: string
  retypePassword: string
}

interface SettingsState {
  user: User
  passwordData: PasswordData
  isLoading: boolean
  updateUser: (updates: Partial<User>) => void
  updatePassword: (updates: Partial<PasswordData>) => void
  saveChanges: () => Promise<void>
  updatePasswordAction: () => Promise<void>
  uploadAvatar: (file: File) => Promise<void>
  resetPasswordData: () => void
  initializeFromAuth: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      user: {
        firstName: '',
        lastName: '',
        email: '',
        avatar: ''
      },
      passwordData: {
        currentPassword: '',
        newPassword: '',
        retypePassword: ''
      },
      isLoading: false,

      updateUser: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates }
        }))
      },

      updatePassword: (updates) => {
        set((state) => ({
          passwordData: { ...state.passwordData, ...updates }
        }))
      },

      initializeFromAuth: () => {
        // Try to get user data from the user store
        try {
          const userStorage = localStorage.getItem('user-storage')
          if (userStorage) {
            const parsedStorage = JSON.parse(userStorage)
            const currentUser = parsedStorage.state?.currentUser
            
            if (currentUser) {
              set((state) => ({
                user: {
                  ...state.user,
                  firstName: currentUser.firstname || '',
                  lastName: currentUser.lastname || '',
                  email: currentUser.email || '',
                }
              }))
            }
          }
        } catch (error) {
          console.error('Failed to initialize from auth store:', error)
        }
      },

      saveChanges: async () => {
        set({ isLoading: true })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const { user } = get()
          console.log('Saving user changes:', user)
          
          // Update the user store with the new data
          try {
            const userStorage = localStorage.getItem('user-storage')
            if (userStorage) {
              const parsedStorage = JSON.parse(userStorage)
              if (parsedStorage.state?.currentUser) {
                // Update the current user in the user store
                parsedStorage.state.currentUser = {
                  ...parsedStorage.state.currentUser,
                  firstname: user.firstName,
                  lastname: user.lastName,
                  email: user.email,
                }
                
                // Also update the user in the users array
                const userIndex = parsedStorage.state.users.findIndex(
                  (u: any) => u.email === parsedStorage.state.currentUser.email
                )
                if (userIndex !== -1) {
                  parsedStorage.state.users[userIndex] = {
                    ...parsedStorage.state.users[userIndex],
                    firstname: user.firstName,
                    lastname: user.lastName,
                    email: user.email,
                  }
                }
                
                localStorage.setItem('user-storage', JSON.stringify(parsedStorage))
              }
            }
          } catch (error) {
            console.error('Failed to sync with user store:', error)
          }
          
          // Update auth store if it exists
          try {
            const authStorage = localStorage.getItem('complete-doc-auth-storage')
            if (authStorage) {
              const parsedAuthStorage = JSON.parse(authStorage)
              if (parsedAuthStorage.state?.user) {
                parsedAuthStorage.state.user = {
                  ...parsedAuthStorage.state.user,
                  name: `${user.firstName} ${user.lastName}`,
                  email: user.email,
                  avatar: user.avatar || parsedAuthStorage.state.user.avatar,
                }
                localStorage.setItem('complete-doc-auth-storage', JSON.stringify(parsedAuthStorage))
              }
            }
          } catch (error) {
            console.error('Failed to sync with auth store:', error)
          }
          
          alert('Changes saved successfully!')
          
        } catch (error) {
          console.error('Failed to save changes:', error)
          alert('Failed to save changes. Please try again.')
        } finally {
          set({ isLoading: false })
        }
      },

      updatePasswordAction: async () => {
        const { passwordData } = get()
        
        // Validate passwords match
        if (passwordData.newPassword !== passwordData.retypePassword) {
          alert('New passwords do not match')
          return
        }

        // Validate password strength
        if (passwordData.newPassword.length < 8) {
          alert('Password must be at least 8 characters long')
          return
        }

        if (!passwordData.currentPassword) {
          alert('Please enter your current password')
          return
        }

        set({ isLoading: true })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Here you would typically verify the current password first
          console.log('Updating password...')
          
          // Update password in user store
          try {
            const userStorage = localStorage.getItem('user-storage')
            if (userStorage) {
              const parsedStorage = JSON.parse(userStorage)
              if (parsedStorage.state?.currentUser) {
                // Update current user password
                parsedStorage.state.currentUser.password = passwordData.newPassword
                
                // Update in users array
                const userIndex = parsedStorage.state.users.findIndex(
                  (u: any) => u.email === parsedStorage.state.currentUser.email
                )
                if (userIndex !== -1) {
                  parsedStorage.state.users[userIndex].password = passwordData.newPassword
                }
                
                localStorage.setItem('user-storage', JSON.stringify(parsedStorage))
              }
            }
          } catch (error) {
            console.error('Failed to update password in user store:', error)
          }
          
          // Clear password fields after successful update
          get().resetPasswordData()
          
          alert('Password updated successfully!')
          
        } catch (error) {
          console.error('Failed to update password:', error)
          alert('Failed to update password. Please try again.')
        } finally {
          set({ isLoading: false })
        }
      },

      uploadAvatar: async (file: File) => {
        set({ isLoading: true })
        
        try {
          // Create a preview URL for the uploaded file
          const imageUrl = URL.createObjectURL(file)
          
          // Simulate upload delay
          await new Promise(resolve => setTimeout(resolve, 1500))
          
          console.log('Uploading avatar:', file.name)
          
          // Update user avatar
          set((state) => ({
            user: { ...state.user, avatar: imageUrl }
          }))
          
          // Update avatar in other stores
          try {
            const authStorage = localStorage.getItem('complete-doc-auth-storage')
            if (authStorage) {
              const parsedAuthStorage = JSON.parse(authStorage)
              if (parsedAuthStorage.state?.user) {
                parsedAuthStorage.state.user.avatar = imageUrl
                localStorage.setItem('complete-doc-auth-storage', JSON.stringify(parsedAuthStorage))
              }
            }
          } catch (error) {
            console.error('Failed to sync avatar with auth store:', error)
          }
          
        } catch (error) {
          console.error('Failed to upload avatar:', error)
          alert('Failed to upload avatar. Please try again.')
        } finally {
          set({ isLoading: false })
        }
      },

      resetPasswordData: () => {
        set({
          passwordData: {
            currentPassword: '',
            newPassword: '',
            retypePassword: ''
          }
        })
      }
    }),
    {
      name: 'settings-storage',
    }
  )
)