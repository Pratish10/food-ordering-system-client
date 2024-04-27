'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

const baseLinkStyles = 'mb-1 rounded-lg p-3 text-xs'
const activeLinkStyles = 'text-orange-500 bg-orange-100'
const hoverLinkStyles = 'hover:bg-slate-200'

interface Links {
  path?: string
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: React.ComponentType<any>
  dropdown?: Links[]
  isDropdown?: boolean
}

interface SideBarProps {
  Links: Links[]
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  expandedDropdowns: string[]
  setExpandedDropdowns: React.Dispatch<React.SetStateAction<string[]>>
}

export const Nav = ({
  Links,
  isCollapsed,
  expandedDropdowns,
  setExpandedDropdowns,
  setIsCollapsed
}: SideBarProps): JSX.Element => {
  const pathname = usePathname()

  const isLinkActive = (linkPath: string | undefined): boolean => {
    if (linkPath === undefined || linkPath === null) {
      return false
    }
    if (linkPath === '/') {
      return pathname === linkPath
    }
    return pathname.startsWith(linkPath)
  }

  const toggleDropdown = (label: string): void => {
    setIsCollapsed(false)
    setExpandedDropdowns((prevExpanded) => {
      if (prevExpanded.includes(label)) {
        return prevExpanded.filter((item) => item !== label)
      } else {
        return [...prevExpanded, label]
      }
    })
  }

  return (
    <nav className="overflow-y-auto overflow-x-hidden h-full">
      {Links.map((link, index) => (
        <div key={link.path ?? link.label + index}>
          {link.isDropdown === true
            ? (
            <div
              onClick={() => {
                toggleDropdown(link.label)
              }}
              className={`${baseLinkStyles} ${
                isLinkActive(link.path) ? activeLinkStyles : hoverLinkStyles
              }`}
            >
              <div className="flex items-center justify-between cursor-pointer w-48">
                <div className="flex items-center">
                  <div className="mr-2">
                    {link.icon != null && (
                      <link.icon
                        size={20}
                        color={isLinkActive(link.path) ? '#f58220' : '#333'}
                      />
                    )}
                  </div>
                  {!isCollapsed && link.label}
                </div>
                {!isLinkActive(link.path) && !isCollapsed && (
                  <div className="flex mr-10">
                    {expandedDropdowns.includes(link.label)
                      ? (
                      <ChevronUp size={20} />
                        )
                      : (
                      <ChevronDown size={20} />
                        )}
                  </div>
                )}
              </div>
            </div>
              )
            : (
            <div
              onClick={() => {
                setExpandedDropdowns([])
              }}
            >
              <Link href={link.path ?? '#'}>
                <div
                  className={`${baseLinkStyles} ${
                    isLinkActive(link.path) ? activeLinkStyles : hoverLinkStyles
                  }`}
                >
                  <div className="flex items-center">
                    <div className="mr-2">
                      {link.icon != null && (
                        <link.icon
                          size={20}
                          color={isLinkActive(link.path) ? '#f58220' : '#333'}
                        />
                      )}
                    </div>
                    {!isCollapsed && link.label}
                  </div>
                </div>
              </Link>
            </div>
              )}

          {link.isDropdown === true &&
            link.dropdown != null &&
            link.dropdown.length > 0 &&
            expandedDropdowns.includes(link.label) && (
              <div className="pl-4">
                {link.dropdown.map((dropdownItem) => (
                  <Link key={dropdownItem.path} href={dropdownItem.path ?? '#'}>
                    <div
                      className={`${baseLinkStyles} ${
                        isLinkActive(dropdownItem.path)
                          ? activeLinkStyles
                          : hoverLinkStyles
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="mr-2">
                          {dropdownItem.icon != null && (
                            <dropdownItem.icon
                              size={20}
                              color={
                                isLinkActive(dropdownItem.path)
                                  ? '#f58220'
                                  : '#333'
                              }
                            />
                          )}
                        </div>
                        {!isCollapsed && dropdownItem.label}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
          )}
        </div>
      ))}
    </nav>
  )
}
