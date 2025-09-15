"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaAngleDown } from "react-icons/fa6"
import { cn } from "@/lib/utils"

interface HeaderProps {
  className?: string
}

const HeaderLinks = ({ className }: HeaderProps) => {
  const pathname = usePathname()
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  const coursesRef = useRef<HTMLLIElement>(null)
  const resourcesRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (coursesRef.current && !coursesRef.current.contains(event.target as Node)) {
        setIsCoursesOpen(false)
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const mainCourses = ["MRCGP AKT Courses", "MRCGP SCA", "MSRA", "UKMLA PLAB 1", "UKMLA PLAB 2", "FY2 Standalone"]

  const subCourses = {
    "MRCGP AKT Courses": [
      { id: 'mrcpsych-paper-a', name: "MRCPsych Paper A Live Course" },
      { id: 'mrcpsych-paper-b', name: "MRCPsych Paper B Live Course" },
    ],
  }

  const resourcesLinks = [
    { name: "Neurology Points - Free", href: "/resources/neurology-points-free" },
    { name: "Neurology Points - Premium", href: "/resources/neurology-points-premium" },
    { name: "Neurology Points - Final", href: "/resources/neurology-points-final" },
  ]

  return (
    <div className={cn("hidden sm:flex items-center justify-between lg:w-auto lg:h-[36px]", className)}>
      <ul className="flex items-center lg:gap-[25px] list-none">
        <li className="text-[0.625rem] md:text-[0.8125rem] p-2.5">
          <HeaderLink href="/" active={pathname === "/"}>
            Home
          </HeaderLink>
        </li>
        <li
          ref={coursesRef}
          className="text-[0.625rem] flex items-center gap-1 md:text-[0.8125rem] p-2.5 relative"
          onClick={() => setIsCoursesOpen(!isCoursesOpen)}
        >
          <HeaderLink href="#" active={pathname.startsWith("/courses")}>
            <span className="flex items-center gap-2">
              Courses
              <FaAngleDown
                className={cn(
                  "text-[0.625rem] mt-0.5 transition-transform duration-200",
                  isCoursesOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </span>
          </HeaderLink>
          {isCoursesOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <ul className="py-1">
                {mainCourses.map((course) => (
                  <li
                    key={course}
                    className="relative"
                    onMouseEnter={() => setSelectedCourse(course)}
                    onMouseLeave={() => setSelectedCourse(null)}
                  >
                    <button className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700">{course}</button>
                    {/* Submenu */}
                    {selectedCourse === course && subCourses[course as keyof typeof subCourses] && (
                      <div className="absolute left-full top-0 w-64 bg-white rounded-md shadow-lg border border-gray-200">
                        <ul className="py-1">
                          {subCourses[course as keyof typeof subCourses].map((subCourse) => (
                            <Link key={subCourse.id} href={`/courses/${subCourse.id}`}>
                              <button className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700">
                                {subCourse.name}
                              </button>
                            </Link>
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
        <li className="text-[0.625rem] md:text-[0.8125rem] p-2.5">
          <HeaderLink href="/webinars-events" active={pathname === "/webinars-events"}>
            Webinars & Events
          </HeaderLink>
        </li>
        <li
          ref={resourcesRef}
          className="text-[0.625rem] flex items-center gap-1 md:text-[0.8125rem] p-2.5 relative"
          onClick={() => setIsResourcesOpen(!isResourcesOpen)}
        >
          <HeaderLink href="#" active={pathname.startsWith("/resources")}>
            <span className="flex items-center gap-2">
              Resources
              <FaAngleDown
                className={cn(
                  "text-[0.625rem] mt-0.5 transition-transform duration-200",
                  isResourcesOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </span>
          </HeaderLink>
          {isResourcesOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <ul className="py-1">
                {resourcesLinks.map((resource) => (
                  <li key={resource.name}>
                    <Link href={resource.href}>
                      <button className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700">
                        {resource.name}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
        <li className="text-[0.625rem] md:text-[0.8125rem] p-2.5">
          <HeaderLink href="/about-us" active={pathname === "/about-us"}>
            About Us
          </HeaderLink>
        </li>
        <li className="text-[0.625rem] md:text-[0.8125rem] p-2.5">
          <HeaderLink href="/contact-us" active={pathname === "/contact-us"}>
            Contact Us
          </HeaderLink>
        </li>
      </ul>
    </div>
  )
}

export default HeaderLinks

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
