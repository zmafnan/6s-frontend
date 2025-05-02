"use client"

import { useState, useEffect } from "react"
import { AppShell, Burger, Group, NavLink, Text, Badge, Stack } from "@mantine/core"
import {
  IconHome2,
  IconClock,
  IconCalendar,
  IconChartBar,
  IconBuildingFactory,
  IconBuildingStore,
  IconClipboardList,
  IconChartPie,
} from "@tabler/icons-react"
import { Link, useLocation, Outlet } from "react-router-dom"
import logo from "../assets/mpi.png"

export default function AppLayout() {
  // Track both mobile visibility and sidebar width separately
  const [mobileOpened, setMobileOpened] = useState(false)
  const [desktopOpened, setDesktopOpened] = useState(false) // Changed to false for collapsed by default
  const [currentTime, setCurrentTime] = useState(new Date())
  const location = useLocation()

  const navItems = [
    { to: "/6S/dashboard", label: "Dashboard", icon: IconChartBar },
    { to: "/6S/advanced-dashboard", label: "Advanced Dashboard", icon: IconChartPie },
    { to: "/6S/trend", label: "Trend", icon: IconHome2 },
    { to: "/6S/departement", label: "Departement", icon: IconBuildingStore },
    { to: "/6S/schedule", label: "Schedule", icon: IconCalendar },
    { to: "/6S/production-audit", label: "Production Audit", icon: IconBuildingFactory },
    { to: "/6S/non-production-audit", label: "Non Production Audit", icon: IconClipboardList },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: desktopOpened ? 300 : 80,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={mobileOpened || desktopOpened}
              onClick={() => {
                // On mobile, toggle the mobile opened state
                if (window.innerWidth < 768) {
                  setMobileOpened(!mobileOpened)
                } else {
                  // On desktop, toggle the desktop opened state
                  setDesktopOpened(!desktopOpened)
                }
              }}
              size="sm"
            />
            <img src={logo || "/placeholder.svg"} alt="Logo" style={{ width: "40px", height: "40px" }} />
            <Text size="xl">6S Audit</Text>
          </Group>
          <Group>
            <Badge size="lg" variant="light" color="indigo" leftSection={<IconCalendar size="1rem" />}>
              {formatDate(currentTime)}
            </Badge>
            <Badge size="lg" variant="light" color="blue" leftSection={<IconClock size="1rem" />}>
              {formatTime(currentTime)}
            </Badge>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack justify="space-between" h="100%">
          <Stack gap="xs">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                component={Link}
                to={item.to}
                label={desktopOpened ? item.label : ""}
                leftSection={<item.icon size="1.2rem" stroke={1.5} />}
                active={location.pathname === item.to}
                style={{
                  padding: desktopOpened ? undefined : "12px",
                  justifyContent: desktopOpened ? undefined : "center",
                }}
              />
            ))}
          </Stack>

          <Badge
            component="a"
            href="https://zmafnan.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              width: desktopOpened ? "auto" : "60px",
              textAlign: "center",
            }}
          >
            {desktopOpened ? "Developed By LEAN PT MPI" : "LEAN"}
          </Badge>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
