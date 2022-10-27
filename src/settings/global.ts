import { ROUTES } from '../lib/route-links';
export const globalSettings = {

  topmenuLinks: [
    { href: ROUTES.DASHBOARD, label: 'Profile' },
  ],
  superSideMenu: [
    { href: ROUTES.HOME, label: 'Home', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.DISCOS, label: 'Discos', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.SUPERADMINS, label: 'Admins', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.USERS, label: 'Users', icon: '/images/sidebar_placeholder.svg' },
  ],
  adminSideMenu: [
    { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.ASSETS, label: 'Assets', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.MANAGERS, label: 'Managers', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.PROFILE, label: 'User Support', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.PROFILE, label: 'Team Group', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.PROFILE, label: 'Team', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.PROFILE, label: 'Client Monitor', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.PROFILE, label: 'Account Office', icon: '/images/sidebar_placeholder.svg' },
  ],
  assetSideMenu: [
    { href: ROUTES.PROFILE, label: 'Dashboard', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.PROFILE, label: 'Assets', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.PROFILE, label: 'Account Office', icon: '/images/sidebar_placeholder.svg' },
  ],
  teamSideMenu: [
    { href: ROUTES.PROFILE, label: 'Dashboard', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.PROFILE, label: 'Assets', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.PROFILE, label: 'Team Group', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.PROFILE, label: 'Team', icon: '/images/sidebar_placeholder.svg' },
  ]

}
