'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useModalStore from '@/lib/store/useModal'
import { IoMdClose } from 'react-icons/io'
import HeaderLinksMobile from './HeaderLinksMobile'

const Menu = () => {
  const { isMenuOpen, closeMenu } = useModalStore()
  const menuRef = useRef<HTMLUListElement>(null)

  const handleMenu = () => {
    closeMenu()
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu()
    }
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <div
      className={`w-screen h-screen fixed top-0 left-0 z-50 bg-white transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isMenuOpen}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full h-[86px] flex sm:hidden items-center justify-center px-5 py-[30px]">
        <div className="w-full flex items-center justify-between">
          <Link href="/">
            <Image src="/icons/complete-doc-logo.svg" alt="logo" width={125} height={26} />
          </Link>
          <span
            className="h-7 w-7 bg-[#EFEFEF] hover:bg-gray-100 rounded-full flex items-center justify-center cursor-pointer mr-1.5"
            onClick={handleMenu}
          >
            <IoMdClose className="text-base text-black w-6 h-6" />
          </span>
        </div>
      </div>
      <HeaderLinksMobile />
    </div>
  )
}

export default Menu
