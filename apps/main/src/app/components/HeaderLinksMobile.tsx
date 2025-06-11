"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import useModalStore from "@/lib/store/useModal"
import { FaAngleDown } from "react-icons/fa6"
import { cn } from "@/lib/utils"

interface HeaderProps {
  className?: string
}

const HeaderLinksMobile = ({ className }: HeaderProps) => {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  const { closeMenu } = useModalStore()

  const mainCourses = ["MRCGP AKT Courses", "MRCGP SCA", "MSRA", "UKMLA PLAB 1", "UKMLA PLAB 2", "FY2 Standalone"]

  const subCourses = {
    "MRCGP AKT Courses": [
      { id: 234, name: "AKT Ultimate Package" },
      { id: 235, name: "AKT Live Course" },
      { id: 236, name: "AKT Video Course" },
      { id: 237, name: "AKT Audiobook" },
      { id: 238, name: "AKT Mock Exams" },
    ],
  }

  const handleMenu = () => {
    closeMenu()
  }

  const handleCoursesClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <div className={cn("w-full h-full flex sm:hidden justify-center", className)}>
      <ul className="w-full flex flex-col list-none gap-2.5">
        <li
          className="text-base pl-5 flex items-center font-medium w-full h-10 border-b-[.4px] border-[#ECECEC]"
          onClick={handleMenu}
        >
          <HeaderLink href="/" active={pathname === "/"}>
            Home
          </HeaderLink>
        </li>

        {/* Courses dropdown - Fixed positioning */}
        <li className="relative text-base font-medium w-full border-b-[.4px] border-[#ECECEC]">
          <div
            className="px-5 flex items-center justify-between w-full h-10 cursor-pointer hover:text-gray-900"
            onClick={handleCoursesClick}
          >
            <span
              className={cn(
                "transition-colors",
                pathname === "/courses" ? "text-[#151515] font-semibold" : "text-gray-500",
              )}
            >
              Courses
            </span>
            <FaAngleDown className={cn("transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0")} />
          </div>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="w-full bg-white border-t border-gray-200">
              <ul className="py-1">
                {mainCourses.map((course) => (
                  <li
                    key={course}
                    className="relative"
                    onMouseEnter={() => setSelectedCourse(course)}
                    onMouseLeave={() => setSelectedCourse(null)}
                  >
                    <button className="w-full text-left px-8 py-2 hover:bg-blue-50 text-gray-700 text-sm">
                      {course}
                    </button>

                    {/* Submenu */}
                    {selectedCourse === course && subCourses[course as keyof typeof subCourses] && (
                      <div className="w-full bg-gray-50 border-t border-gray-100 border">
                        <ul className="py-1">
                          {subCourses[course as keyof typeof subCourses].map((subCourse) => (
                            <li key={subCourse.id}>
                              <Link href={`/courses/${subCourse.id}`} onClick={handleMenu}>
                                <button className="w-full text-left px-12 py-2 hover:bg-blue-100 text-gray-600 text-sm">
                                  {subCourse.name}
                                </button>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>

        <HeaderLink href="/webinars-events" active={pathname === "/webinars-events"}>
          <li
            className="text-base pl-5 flex items-center font-medium w-full h-10 border-b-[.4px] border-[#ECECEC]"
            onClick={handleMenu}
          >
            Webinars & Events
          </li>
        </HeaderLink>
        <HeaderLink href="/about-us" active={pathname === "/about-us"}>
          <li
            className="text-base pl-5 flex items-center font-medium w-full h-10 border-b-[.4px] border-[#ECECEC]"
            onClick={handleMenu}
          >
            About Us
          </li>
        </HeaderLink>
        <li
          className="text-base pl-5 flex items-center font-medium w-full h-10 border-b-[.4px] border-[#ECECEC]"
          onClick={handleMenu}
        >
          <HeaderLink href="/contact-us" active={pathname === "/contact-us"}>
            Contact Us
          </HeaderLink>
        </li>
        <li
          className="text-base pl-5 flex items-center font-medium w-full h-10 border-b-[.4px] border-[#ECECEC]"
          onClick={handleMenu}
        >
          <HeaderLink href="/login" active={pathname === "/login"}>
            Sign in
          </HeaderLink>
        </li>
      </ul>
    </div>
  )
}

export default HeaderLinksMobile

interface HeaderLinkProps {
  href: string
  active?: boolean
  children: React.ReactNode
}

function HeaderLink({ href, active, children }: HeaderLinkProps) {
  return (
    <Link
      href={href}
      className={cn("transition-colors hover:text-gray-900", active ? "text-[#151515] font-semibold" : "text-gray-500")}
    >
      {children}
    </Link>
  )
}
