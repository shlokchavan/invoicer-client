import { IRMNavItemConfig } from "../shared/components/rm-nav/rm-nav.model";
import { currentOrg } from "../shared/utils/current-org";
import { currentOrgType } from "../shared/utils/current-org-type";
import { currentUser } from "../shared/utils/current-user";

export const NavRouteConfig: IRMNavItemConfig[] = [
  {
    moduleId: 0,
    route: "/my-account",
    SubHeaderOptions: {
      title: "My Account",
      breadcrumb: [
        { label: "Home", isActive: false, route: "/dashboard" },
        { label: "My Account", isActive: true },
      ],
    },
  },
  {
    moduleId: 100,
    icon: "Module-Dashboard",
    children: [
      //ADMIN SP
      {
        moduleId: 101,
        route: "/dashboard",
        SubHeaderOptions: {
          title: "SP Dashboard",
          breadcrumb: [],
        },
      },
      //SR Dashboard
      {
        moduleId: 103,
        route: "/dashboard/sr",
        SubHeaderOptions: {
          title: "SR Dashboard",
          breadcrumb: [
            {
              label: "Home",
              isActive: true,
              route: "/dashboard/sr",
            },
            { label: "Dashboard", isActive: true },
          ],
        },
      },
      // Client Admin Dashboard
      // {
      //   moduleId: 0,
      //   route: "/dashboard",
      //   SubHeaderOptions: {
      //     title: "Dashboard",
      //     breadcrumb: [],
      //   },
      // },
      {
        moduleId: 101,
        route: "/dashboard/sp",
        SubHeaderOptions: {
          title: "SP Dashboard",
          breadcrumb: [
            {
              label: "Home",
              isActive: true,
              route: "/dashboard/sp",
            },
            { label: "Dashboard", isActive: true },
          ],
        },
      },
      // Client Admin Dashboard
      {
        moduleId: 105,
        route: "/dashboard/client-admin",
        SubHeaderOptions: {
          title: "Client Admin Dashboard",
          breadcrumb: [
            {
              label: "Home",
              isActive: false,
              route: "/dashboard/client-admin",
            },
            { label: "Dashboard", isActive: true },
          ],
        },
      },
      {
        moduleId: 105,
        route: "/dashboard/supervisor",
        SubHeaderOptions: {
          title: "Supervisor Dashboard",
          // title: "Supervisor Dashboard",
          breadcrumb: [
            {
              label: "Home",
              isActive: false,
              route: "/dashboard/supervisor",
            },
            { label: "Dashboard", isActive: true },
          ],
        },
      },
      // Auditor Dashboard
      {
        moduleId: 107,
        route: "/dashboard/auditor",
        SubHeaderOptions: {
          title: "Auditor Dashboard",
          breadcrumb: [
            {
              label: "Home",
              isActive: false,
              route: "/dashboard/auditor",
            },
            { label: "Dashboard", isActive: true },
          ],
        },
      },
    ],
  },
  {
    moduleId: 150,
    icon: "administrator",
    children: [
      // Manage Master SP
      {
        moduleId: 151,
        route: "/manage-master/sp",
        SubHeaderOptions: {
          title: "System Master (SA)",
          breadcrumb: [
            // { label: "Home", isActive: false, route: "/dashboard" },
            { label: "System Master", isActive: true },
          ],
        },
      },
      // Manage Subscription SP
      {
        moduleId: 152,
        route: "/manage-subscription/sp",
        SubHeaderOptions: {
          title: "Manage Subscription (SA)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Subscription", isActive: true },
          ],
        },
      },
      {
        moduleId: 152,
        route: "/manage-subscription/sp/new-package",
        SubHeaderOptions: {
          title: "New Package",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Subscription",
              isActive: false,
              route: "/manage-subscription/sp",
              queryRoute: { view: "package" },
            },
            { label: "Add Package", isActive: true },
          ],
        },
      },
      {
        moduleId: 152,
        route: "/manage-subscription/sp/edit-package",
        SubHeaderOptions: {
          title: "Edit Package",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Subscription",
              isActive: false,
              route: "/manage-subscription/sp",
              queryRoute: { view: "package" },
            },
            { label: "Edit Package", isActive: true },
          ],
        },
      },
      // Manage Feature SP
      {
        moduleId: 153,
        route: "/manage-feature",
        SubHeaderOptions: {
          title: "Manage Feature",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Feature", isActive: true },
          ],
        },
      },
      // Manage Roles SP
      {
        moduleId: 154,
        route: "/manage-roles",
        SubHeaderOptions: {
          title: "Manage Roles (SA)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Roles", isActive: true },
          ],
        },
      },
      {
        moduleId: 154,
        route: "/manage-roles/create-role",
        SubHeaderOptions: {
          title: "Create New Role",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Roles", isActive: false, route: "/manage-roles" },
            { label: "Create New Role", isActive: true },
          ],
        },
      },
      {
        moduleId: 154,
        route: "/manage-roles/edit-role",
        SubHeaderOptions: {
          title: "Edit Role",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Roles", isActive: false, route: "/manage-roles" },
            { label: "Edit Role", isActive: true },
          ],
        },
      },
      // Manage Organization (SA)
      {
        moduleId: 155,
        route: "/manage-org/sp",
        SubHeaderOptions: {
          title: "Manage Organization (SA)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Organization", isActive: true },
          ],
        },
      },
      {
        moduleId: 155,
        route: "/manage-org/create-sr-org",
        SubHeaderOptions: {
          title: "Add New Organisation",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Organisation",
              isActive: false,
              route: "/manage-org/sp",
            },
            { label: "Add New Organisation (SR)", isActive: true },
          ],
        },
      },
      {
        moduleId: 155,
        route: "/manage-org/edit-org",
        SubHeaderOptions: {
          title: "Edit Organisation",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Organisation",
              isActive: false,
              route: "/manage-org/sp",
            },
            { label: "Edit Organisation", isActive: true },
          ],
        },
      },
      //   Manage Users & Groups (SA)
      {
        moduleId: 156,
        route: "/manage-user-and-group/sp",
        SubHeaderOptions: {
          title: "Manage Users and Groups",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Users and Groups", isActive: true },
          ],
        },
      },
      // ADMIN SR
      // Manage Subscription (SR)
      {
        moduleId: 159,
        route: "/manage-subscription/sr",
        SubHeaderOptions: {
          title: "Manage Subscription (SR)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Subscription", isActive: true },
          ],
        },
      },
      {
        moduleId: 159,
        route: "/manage-subscription/sr/custom-package",
        SubHeaderOptions: {
          title: "Custom Package",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Subscription",
              isActive: false,
              route: "/manage-subscription/sr",
            },
            { label: "Add Package", isActive: true },
          ],
        },
      },
      {
        moduleId: 159,
        route: "/manage-subscription/sr/edit-package",
        SubHeaderOptions: {
          title: "Edit Package",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Subscription",
              isActive: false,
              route: "/manage-subscription/sr",
            },
            { label: "Edit Package", isActive: true },
          ],
        },
      },
      // Manage Roles (SR)
      {
        moduleId: 160,
        route: "/manage-roles/sr",
        SubHeaderOptions: {
          title: "Manage Roles (SR)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Roles", isActive: true },
          ],
        },
      },
      {
        moduleId: 160,
        route: "/manage-roles/sr/custom/create-role",
        SubHeaderOptions: {
          title: "Create Custom Role",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Roles",
              isActive: false,
              route: "/manage-roles/sr",
            },
            { label: "Create Role", isActive: true },
          ],
        },
      },
      {
        moduleId: 160,
        route: "/manage-roles/sr/custom/edit-role",
        SubHeaderOptions: {
          title: "Edit Custom Role",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Roles",
              isActive: false,
              route: "/manage-roles/sr",
            },
            { label: "Edit Role", isActive: true },
          ],
        },
      },
      // Manage Org (SR)
      {
        moduleId: 161,
        route: "/manage-org/sr",
        SubHeaderOptions: {
          title: "Manage Organisation (SR)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Organisation", isActive: true },
          ],
        },
      },
      {
        moduleId: 161,
        route: "/manage-org/create-client-org",
        SubHeaderOptions: {
          title: "Add New Organisation",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Organisation",
              isActive: false,
              route: "/manage-org/sr",
            },
            { label: "Add New Organisation", isActive: true },
          ],
        },
      },
      // Manage User & Group (SR)
      {
        moduleId: 162,
        route: "/manage-user-and-group/sr",
        SubHeaderOptions: {
          title: "Manage Users and Groups (SR)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Users and Groups (SR)", isActive: true },
          ],
        },
      },
      //ADMIN Client
      {
        moduleId: 157,
        route: "/manage-master/client",
        SubHeaderOptions: {
          title: "Manage Client Master",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Master", isActive: true },
          ],
        },
      },
      {
        moduleId: 168,
        route: "/manage-master/client",
        SubHeaderOptions: {
          title: "Manage Client Master",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Master", isActive: true },
          ],
        },
      },
      // Manage Subscription Client
      {
        moduleId: 164,
        route: "/manage-subscription/client",
        SubHeaderOptions: {
          title: "Manage Subscription (CL)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Subscription", isActive: true },
          ],
        },
      },
      // Manage Roles (Client)
      {
        moduleId: 165,
        route: "/manage-roles/client",
        SubHeaderOptions: {
          title: "Manage Roles (CL)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Roles", isActive: true },
          ],
        },
      },
      {
        moduleId: 165,
        route: "/manage-roles/client/custom/create-role",
        SubHeaderOptions: {
          title: "Create Custom Role",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Roles",
              isActive: false,
              route: "/manage-roles/client",
            },
            { label: "Create Role", isActive: true },
          ],
        },
      },
      {
        moduleId: 165,
        route: "/manage-roles/client/custom/edit-role",
        SubHeaderOptions: {
          title: "Create Custom Role",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Roles",
              isActive: false,
              route: "/manage-roles/client",
            },
            { label: "Edit Role", isActive: true },
          ],
        },
      },
      // Manage Organization (Client)
      {
        moduleId: 166,
        route: "/manage-org/client",
        SubHeaderOptions: {
          title: `${currentOrg()?.name}`,
          // title: "Manage Organization (CL)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Organization", isActive: true },
          ],
        },
      },
      // Manage Users and Groups (Client)
      {
        moduleId: 167,
        route: "/manage-user-and-group/client",
        SubHeaderOptions: {
          title: "Manage Users and Groups (CL)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Users and Groups", isActive: true },
          ],
        },
      },
    ],
  },
  {
    moduleId: 200,
    icon: "Account-View",
    children: [
      {
        moduleId: 201,
        route: "/account-review/unbilled",
        SubHeaderOptions: {
          title: "Account Review - Unbilled",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Account Review - Unbilled", isActive: true },
          ],
        },
      },
      {
        moduleId: 202,
        route: "/account-review/billed",
        SubHeaderOptions: {
          title: "Account Review - Billed",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Account Review - Billed", isActive: true },
          ],
        },
      },
      {
        moduleId: 203,
        route: "/account-review/priority",
        SubHeaderOptions: {
          title: "Account Review - Priority",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Account Review - Priority", isActive: true },
          ],
        },
      },
      {
        moduleId: null,
        route: "/account-review/details",
        SubHeaderOptions: {
          title: "Account Details",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Account Review - Details", isActive: true },
          ],
        },
      },
      {
        moduleId: null,
        route: "/account-review/details/similar",
        SubHeaderOptions: {
          title: "Similar Accounts",
          isBackOption: true,
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Account Review", isActive: true },
          ],
        },
      },
    ],
  },
  // Message Board
  {
    moduleId: 350,
    icon: "Message-Board",
    children: [
      // Auditor
      {
        moduleId: 351,
        route: "/message-board",
        SubHeaderOptions: {
          title: "Message Board",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Message Board", isActive: true },
          ],
        },
      },
      // Supervisor
      {
        moduleId: 352,
        route: "/message-board",
        SubHeaderOptions: {
          title: "Message Board",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Message Board", isActive: true },
          ],
        },
      },
    ],
  },
  {
    moduleId: 250,
    icon: "My-Workspace",
    children: [
      {
        moduleId: 251,
        route: "/workspace",
        SubHeaderOptions: {
          title: "My Workspace",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Workspace", isActive: true },
          ],
        },
      },
    ],
  },
  {
    moduleId: 400,
    icon: "insights",
    children: [
      // client scoring insights
      {
        moduleId: 401,
        route: "/client-scoring-status",
        SubHeaderOptions: {
          title: "Live Scoring Tracker",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Scoring Insight", isActive: true },
          ],
        },
      },
      {
        moduleId: 403,
        route: "/client-scoring-status/sr",
        SubHeaderOptions: {
          title: "Live Scoring Tracker",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Scoring Insight", isActive: true },
          ],
        },
      },
      {
        moduleId: 405,
        route: "/client-scoring-status/client",
        SubHeaderOptions: {
          title: "Live Scoring Tracker",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Scoring Insight", isActive: true },
          ],
        },
      },
      // client scoring insights
      {
        moduleId: 402,
        route: "/client-scoring-metrics",
        SubHeaderOptions: {
          title: "Scoring Metrics",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Scoring Insight", isActive: true },
          ],
        },
      },
      {
        moduleId: 404,
        route: "/client-scoring-metrics/sr",
        SubHeaderOptions: {
          title: "Scoring Metrics",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Scoring Insight", isActive: true },
          ],
        },
      },
      {
        moduleId: 406,
        route: "/client-scoring-metrics/client",
        SubHeaderOptions: {
          title: "Scoring Metrics",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Scoring Insight", isActive: true },
          ],
        },
      },
    ],
  },
  {
    moduleId: 450,
    icon: "report",
    children: [
      {
        moduleId: 454,
        route: "/report",
        SubHeaderOptions: {
          title: "Confirmed Charge Report",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Confirmed Charge Report", isActive: true },
          ],
        },
      },
      {
        moduleId: 451,
        route: "/report/system-performance",
        SubHeaderOptions: {
          title: "System Performance",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Report", isActive: true },
          ],
        },
      },
      {
        moduleId: 452,
        route: "/report/auditor-performance",
        SubHeaderOptions: {
          title: "Auditor Performance",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Auditor Performance", isActive: true },
          ],
        },
      },
      {
        moduleId: 453,
        route: "/report/code-analysis",
        SubHeaderOptions: {
          title: "Code Analysis",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Code Analysis", isActive: true },
          ],
        },
      },
    ],
  },
  {
    moduleId: 500,
    icon: "Supervision-Tools",
    children: [
      // supervision-tools
      {
        moduleId: 501,
        route: "/supervision-tools/live-summary",
        SubHeaderOptions: {
          title: "Live Summary",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Live Summary", isActive: true },
          ],
        },
      },
      {
        moduleId: 503,
        route: "/supervision-tools/report-user-assignment",
        SubHeaderOptions: {
          title: "Report User Assignment",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Report User Assignment", isActive: true },
          ],
        },
      },
      {
        moduleId: 504,
        route: "/supervision-tools/account-search",
        SubHeaderOptions: {
          title: "Account Lifecycle",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Account Lifecycle", isActive: true },
          ],
        },
      },
      {
        moduleId: 502,
        route: "/supervision-tools/auditor-assignment",
        SubHeaderOptions: {
          title: "Auditor Assignment",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Auditor Assignment", isActive: true },
          ],
        },
      },
      {
        moduleId: 502,
        route: "/supervision-tools/auditor-assignment/add-queue",
        SubHeaderOptions: {
          title: "Add New Queue",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Auditor Assignment",
              isActive: false,
              route: "/supervision-tools/auditor-assignment",
            },
            { label: "Auditor Queue", isActive: true },
          ],
        },
      },
      {
        moduleId: 502,
        route: "/supervision-tools/auditor-assignment/edit-queue",
        SubHeaderOptions: {
          title: "Edit New Queue",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Auditor Assignment",
              isActive: false,
              route: "/supervision-tools/auditor-assignment",
            },
            { label: "Auditor Queue", isActive: true },
          ],
        },
      },
    ],
  },
  {
    // Configurations
    moduleId: 550,
    icon: "settings",
    children: [
      // Manage System Flags
      {
        moduleId: 563,
        route: "/configurations/manage-system-flags",
        SubHeaderOptions: {
          title: "Manage System Flags",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Configurations", isActive: true },
          ],
        },
      },
      //Client Workflow
      {
        moduleId: 560,
        route: "/configurations/client-workflow",
        SubHeaderOptions: {
          title: "Manage Workflow",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Configurations", isActive: true },
          ],
        },
      },
      {
        moduleId: 560,
        route: "/configurations/client-workflow/edit-workflow",
        SubHeaderOptions: {
          title: "Edit Workflow",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Configurations", route: "/configurations/client-workflow", isActive: false },
            { label: "Edit Workflow", isActive: true },
          ],
        },
      },
      {
        moduleId: 552,
        route: "/configurations/sp-workflow",
        SubHeaderOptions: {
          title: "Manage Workflow",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Configurations", isActive: true },
          ],
        },
      },
      {
        moduleId: 552,
        route: "/configurations/sp-workflow/edit-workflow",
        SubHeaderOptions: {
          title: "Edit Workflow",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Configurations", route: "/configurations/sp-workflow", isActive: false },
            { label: "Edit Workflow", isActive: true },
          ],
        },
      },
      {
        moduleId: 552,
        route: "/configurations/sp-workflow/add-workflow",
        SubHeaderOptions: {
          title: "Add Workflow",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Configurations", route: "/configurations/sp-workflow", isActive: false },
            { label: "Add Workflow", isActive: true },
          ],
        },
      },
      {
        moduleId: 555,
        route: "/configurations/sr-workflow",
        SubHeaderOptions: {
          title: "Manage Workflow",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Configurations", isActive: true },
          ],
        },
      },
      {
        moduleId: 558,
        route: "/configurations/published-codes",
        SubHeaderOptions: {
          title: "Manage Code Queues",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Configurations", isActive: true },
          ],
        },
      },
      {
        moduleId: 551,
        route: "/configurations/sp-report",
        SubHeaderOptions: {
          title: "SP Report Configuration",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Configurations", isActive: true },
          ],
        },
      },
      {
        moduleId: 554,
        route: "/configurations/sr-report",
        SubHeaderOptions: {
          title: "SR Report Configuration",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Configurations", isActive: true },
          ],
        },
      },
      {
        moduleId: 557,
        route: "/configurations/manage-rules",
        SubHeaderOptions: {
          title: "Manage Rules",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Rules", isActive: true },
          ],
        },
      },
      {
        moduleId: 557,
        route: "/configurations/manage-rules/add-rule",
        SubHeaderOptions: {
          title: "Add Rule",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Rules", route: "/configurations/manage-rules", isActive: false },
            { label: "Add Rule", isActive: true },
          ],
        },
      },
      {
        moduleId: 557,
        route: "/configurations/manage-rules/edit-rule",
        SubHeaderOptions: {
          title: "Edit Rule",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Rules", route: "/configurations/manage-rules", isActive: false },
            { label: "Edit Rule", isActive: true },
          ],
        },
      },
      {
        moduleId: 559,
        route: "/configurations/client-report",
        SubHeaderOptions: {
          title: "Client Report Configuration",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Configurations", isActive: true },
          ],
        },
      },
      {
        moduleId: 559,
        route: "/configurations/client-report/edit-client-report",
        SubHeaderOptions: {
          title: "Edit Report",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Configurations",
              isActive: false,
              route: "/configurations/client-report",
            },
            { label: "Edit Report", isActive: true },
          ],
        },
      },
      {
        moduleId: 559,
        route: "/configurations/client-report/child-client-report",
        SubHeaderOptions: {
          title: "Child Report Configuration",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Configurations",
              isActive: false,
              route: "/configurations/client-report",
            },
            { label: "Child Report", isActive: true },
          ],
        },
      },
    ],
  },
  {
    // Manage Notification
    moduleId: 600,
    icon: "notification",
    children: [
      // Manage Notification (Events)
      {
        moduleId: 601,
        route: "/notification/events",
        SubHeaderOptions: {
          title: "Manage Notificaton (SA)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Notificaton (SA)", isActive: true },
          ],
        },
      },
      {
        moduleId: 605,
        route: "/notification/events/sr",
        SubHeaderOptions: {
          title: "Manage Notificaton (SR)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Notificaton (SR)", isActive: true },
          ],
        },
      },
      {
        moduleId: 606,
        route: "/notification/events/client",
        SubHeaderOptions: {
          title: "Manage Notificaton (Client)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Manage Notificaton (Client)", isActive: true },
          ],
        },
      },
      {
        moduleId: 601,
        route: "/notification/events/system-add",
        SubHeaderOptions: {
          title: "Manage Notificaton (SA)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Notificaton",
              route: "/notification/events",
              isActive: false,
            },
            { label: "Create Event", isActive: true },
          ],
        },
      },
      {
        moduleId: 601,
        route: "/notification/events/system-edit",
        SubHeaderOptions: {
          title: "Manage Notificaton (SA)",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Manage Notificaton",
              route: "/notification/events",
              isActive: false,
            },
            { label: "Edit Event", isActive: true },
          ],
        },
      },
      // Manage Notifications >> Templates
      {
        moduleId: 602,
        route: "/notification/templates/sp",
        SubHeaderOptions: {
          title: "Manage Templates",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Notifications",
              isActive: false,
              route: "/notification/templates/sp",
            },
            { label: "Templates", isActive: true },
          ],
        },
      },
      {
        moduleId: 603,
        route: "/notification/templates/sr",
        SubHeaderOptions: {
          title: "Manage Templates",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Notifications",
              isActive: false,
              route: "/notification/templates/sr",
            },
            { label: "Templates", isActive: true },
          ],
        },
      },
      {
        moduleId: 604,
        route: "/notification/templates/client",
        SubHeaderOptions: {
          title: "Manage Templates",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Notifications",
              isActive: false,
              route: "/notification/templates/client",
            },
            { label: "Templates", isActive: true },
          ],
        },
      },
      {
        moduleId: 602,
        route: "/notification/templates/add-template",
        SubHeaderOptions: {
          title: "Add New Template",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Notifications", isActive: false, route: "/notification" },
            {
              label: "Manage Templates",
              isActive: false,
              route: "/notification/templates/sp",
            },
            { label: "Create Template", isActive: true },
          ],
        },
      },
      {
        moduleId: 602,
        route: "/notification/templates/edit-sys-template",
        SubHeaderOptions: {
          title: "Edit Template",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Notifications", isActive: false, route: "/notification" },
            {
              label: "Manage Templates",
              isActive: false,
              route: "/notification/templates/sp",
            },
            { label: "Edit Template", isActive: true },
          ],
        },
      },
      {
        moduleId: 602,
        route: "/notification/templates/edit-template",
        SubHeaderOptions: {
          title: "Edit Template",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            {
              label: "Notifications",
              isActive: false,
              route: `/notification/templates/${currentOrgType()}`,
            },
            {
              label: "Manage Templates",
              isActive: false,
              route: `/notification/templates/${currentOrgType()}`,
            },
            { label: "Edit Template", isActive: true },
          ],
        },
      },
    ],
  },

  {
    moduleId: 650,
    icon: "Client-Management",
    children: [],
  },
  {
    moduleId: 700,
    icon: "System-Monitoring",
    children: [],
  },
  {
    moduleId: 300, //Temp
    icon: "Account-Explorer",
    children: [
      {
        moduleId: 301,
        route: "/account-review/explorer",
        SubHeaderOptions: {
          title: "Account Explorer",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Account Explorer", isActive: true },
          ],
        },
      },
    ],
  },
  // {
  //   // Manage Notification
  //   moduleId: 900,
  //   icon: "notification",
  //   children: []
  // },
  {
    moduleId: 900,
    icon: "dataflow",
    children: [
      // Manage Dataflow
      {
        moduleId: 901,
        route: "/dataflow",
        SubHeaderOptions: {
          title: "Data Flow",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Data Flow", isActive: true },
          ],
        },
      },
      {
        moduleId: 901,
        route: "/dataflow/add-new-job",
        SubHeaderOptions: {
          title: "Add Job Configuration",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Data Flow", isActive: false, route: "/dataflow" },
            { label: "Add Job Configuration", isActive: true },
          ],
        },
      },
      {
        moduleId: 901,
        route: "/dataflow/copy-job",
        SubHeaderOptions: {
          title: "Add Job Configuration",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Data Flow", isActive: false, route: "/dataflow" },
            { label: "Add Job Configuration", isActive: true },
          ],
        },
      },
      {
        moduleId: 901,
        route: "/dataflow/edit-job",
        SubHeaderOptions: {
          title: "Edit Job Configuration",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Data Flow", isActive: false, route: "/dataflow" },
            { label: "Edit Job Configuration", isActive: true },
          ],
        },
      },
      {
        moduleId: 901, // Temp
        route: "/dataflow/system-settings",
        SubHeaderOptions: {
          title: "Data Flow - System Setting",
          breadcrumb: [
            { label: "Home", isActive: false, route: "/dashboard" },
            { label: "Data Flow", isActive: false, route: "/dataflow" },
            { label: "System Setting", isActive: true },
          ],
        },
      },
      {
        moduleId: 902,
        route: "/dataflow/job-run-history",
        SubHeaderOptions: {
          title: "Job Run History",
          breadcrumb: [
            { label: "Data Flow", isActive: true },
            { label: "Job Run History", isActive: true },
          ],
        },
      },
      
    ],
    // route: "/dataflow",
    // SubHeaderOptions: {
    //   title: "Dataflow",
    //   breadcrumb: [
    //     { label: "Home", isActive: false, route: "/dashboard" },
    //     { label: "Dataflow", isActive: true },
    //   ],
    // },
  },
  // {
  //   moduleId: 759, //Temp
  //   route: "/report/auditor-performance",
  //   SubHeaderOptions: {
  //     title: "Auditor Performance",
  //     breadcrumb: [
  //       { label: "Home", isActive: false, route: "/dashboard" },
  //       { label: "Report", isActive: true },
  //     ],
  //   },
  // },
  // {
  //   moduleId: 769, //Temp
  //   route: "/supervision-tools",
  //   SubHeaderOptions: {
  //     title: "Live Summary",
  //     breadcrumb: [
  //       { label: "Home", isActive: false, route: "/dashboard" },
  //       { label: "Supervision Tools", isActive: true },
  //     ],
  //   },
  // },
  // {
  //   moduleId: 779, //Temp
  //   route: "/supervision-tools/auditor-assignment",
  //   SubHeaderOptions: {
  //     title: "Auditor Assignment",
  //     breadcrumb: [
  //       { label: "Home", isActive: false, route: "/dashboard" },
  //       { label: "Supervision Tools", isActive: true },
  //     ],
  //   },
  // },
  // {
  //   moduleId: 789, //Temp
  //   route: "/supervision-tools/report-user-assignment",
  //   SubHeaderOptions: {
  //     title: "Report User Assignment",
  //     breadcrumb: [
  //       { label: "Home", isActive: false, route: "/dashboard" },
  //       { label: "Supervision Tools", isActive: true },
  //     ],
  //   },
  // },
];

export function getModuleNavConfigById(moduleId: any) {
  const data = NavRouteConfig.find((value) => {
    return value.moduleId == moduleId;
  });
  return data;
}

export function getSubModuleNavConfigById(moduleId: any, subModuleId: any) {
  const data: any = NavRouteConfig.find((value) => {
    return value.moduleId == moduleId;
  });
  if (data) {
    const subData = data.children.find((value: any) => {
      return value.moduleId == subModuleId;
    });
    return subData;
  } else {
    return null;
  }
}
