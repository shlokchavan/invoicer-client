import { IRMNavConfig } from 'src/app/shared/components/rm-nav/rm-nav.model';

// Use _ in start of Class Name to Define it is used in a plugin 
export class _NavigationConfig implements IRMNavConfig {
  isActive = false;
  BookmarkSelections = [];
  // NavItems = [
  //   {
  //     moduleId: "1",
  //     label: "Dashboard",
  //     icon: "manageSubscription",
  //     children: [
  //       {
  //         moduleId: "11",
  //         label: "Dashboard (SP)",
  //         isWIP: true,
  //         route: '/dashboard',
  //         showSubHeader: true
  //       },
  //       {
  //         moduleId: "12",
  //         label: "Dashboard (SR)",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       },
  //       {
  //         moduleId: "13",
  //         label: "Dashboard (Client)",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       },
  //       {
  //         moduleId: "14",
  //         label: "Bulletins",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       }
  //     ]
  //   },
  //   {
  //     moduleId: "2",
  //     label: "Administrator",
  //     icon: "manageSubscription",
  //     children: [
  //       {
  //         moduleId: "21",
  //         label: "Manage System Master",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       },
  //       {
  //         moduleId: "22",
  //         label: "Manage Subscription",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       },
  //       {
  //         moduleId: "23",
  //         label: "Manage Feature Module",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       },
  //       {
  //         moduleId: "24",
  //         label: "Manage Roles",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       },
  //       {
  //         moduleId: "25",
  //         label: "Manage Organization",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       },
  //       {
  //         moduleId: "26",
  //         label: "Manage User & Group",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       }
  //     ]
  //   },
  //   {
  //     moduleId: "3",
  //     label: "Client Management",
  //     icon: "manageSubscription",
  //     children: [
  //       {
  //         moduleId: "31",
  //         label: "Client Performance",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       },
  //       {
  //         moduleId: "32",
  //         label: "Service Management",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       }
  //     ]
  //   },
  //   {
  //     moduleId: "4",
  //     label: "Scoring Insights",
  //     icon: "manageSubscription",
  //     children: [
  //       {
  //         moduleId: "41",
  //         label: "Scoring Tracker",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       },
  //       {
  //         moduleId: "42",
  //         label: "Scoring Metrics",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       }
  //     ]
  //   },
  //   {
  //     moduleId: "5",
  //     label: "Configuration",
  //     icon: "manageSubscription",
  //     children: [
  //       {
  //         moduleId: "51",
  //         label: "Setup Report List",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       },
  //       {
  //         moduleId: "52",
  //         label: "Setup Workflow Filter",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       },
  //       {
  //         moduleId: "53",
  //         label: "Setup Email Templates",
  //         isWIP: true,
  //         route: '/wip',
  //         showSubHeader: true
  //       }
  //     ]
  //   },
  //   {
  //     moduleId: "6",
  //     label: "Notification",
  //     icon: "manageSubscription",
  //     children: []
  //   },
  //   {
  //     moduleId: "7",
  //     label: "System Monitoring",
  //     icon: "manageSubscription",
  //     children: []
  //   }
  // ];
  NavItems!: []

}