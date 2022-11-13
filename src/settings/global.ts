import { ROUTES } from '../lib/route-links';

/*
{ href: ROUTES.PROFILE, label: 'Client Monitor', icon: '/images/sidebar_placeholder.svg' },
{ href: ROUTES.PROFILE, label: 'Account Office', icon: '/images/sidebar_placeholder.svg' },

*/
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
    { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: '/images/dashboard.svg' },
    { href: ROUTES.ASSETS, label: 'Assets', icon: '/images/pie-chart.svg' },
    { href: ROUTES.MANAGERS, label: 'Managers', icon: '/images/manager-svgrepo-com.svg' },
    { href: ROUTES.TICKETS, label: 'User Support', icon: '/images/user-support.svg' },
    { href: ROUTES.TEAM_GROUPS, label: 'Team Group', icon: '/images/team.svg' },
    { href: ROUTES.TEAM_MEMBERS, label: 'Team Members', icon: '/images/team-members.svg' },
    { href: ROUTES.PROFILE, label: 'Client Monitor', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.PROFILE, label: 'Account Office', icon: '/images/sidebar_placeholder.svg' },
  ],
  assetSideMenu: [
    { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: '/images/dashboard.svg' },
    { href: ROUTES.PROFILE, label: 'Assets', icon: '/images/sidebar_placeholder.svg' },
    { href: ROUTES.PROFILE, label: 'Account Office', icon: '/images/sidebar_placeholder.svg' },
  ],
  teamSideMenu: [
    { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: '/images/dashboard.svg' },
    { href: ROUTES.ASSETS, label: 'Assets', icon: '/images/pie-chart.svg' },
    { href: ROUTES.TEAM_GROUPS, label: 'Team Group', icon: '/images/team.svg' },
    { href: ROUTES.TEAM_MEMBERS, label: 'Team Members', icon: '/images/team-members.svg' },
  ]

}
