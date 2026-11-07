import { Role } from '@/lib/auth'

export interface DemoRoleConfig {
    role: Role
    slug: string
    title: string
    shortTitle: string
    department: string
    designation: string
    description: string
    email: string
    password: string
    badgeColor: string
    accentBg: string
    iconName:
        | 'Shield'
        | 'Users'
        | 'Briefcase'
        | 'UserCheck'
        | 'Network'
        | 'LineChart'
        | 'ClipboardList'
        | 'Code2'
        | 'GraduationCap'
}

export const COMPANY_NAME = 'Employee Management System'
export const COMPANY_SHORT_NAME = 'Employee Management'
export const COMPANY_EST = 'Enterprise Workspace'
export const COMPANY_LOGO = '/logo.png'

export const DEMO_ROLES: DemoRoleConfig[] = [
    {
        role: 'ADMIN',
        slug: 'admin',
        title: 'System Administrator',
        shortTitle: 'Admin',
        department: 'Management',
        designation: 'System Administrator',
        description: 'Full system control, employee management, and configuration',
        email: 'admin@ems.com',
        password: 'Admin@123',
        badgeColor: 'bg-[#b12024]/10 text-[#b12024] border-[#b12024]/30',
        accentBg: 'bg-[#b12024]/10 text-[#b12024]',
        iconName: 'Shield',
    },
    {
        role: 'HR',
        slug: 'hr',
        title: 'HR Manager',
        shortTitle: 'HR',
        department: 'Human Resources',
        designation: 'HR Manager',
        description: 'Employee directory, attendance, leaves, and HR reporting',
        email: 'hr@ems.com',
        password: 'Hr@123',
        badgeColor: 'bg-pink-500/10 text-pink-600 border-pink-500/30',
        accentBg: 'bg-pink-500/10 text-pink-600',
        iconName: 'Users',
    },
    {
        role: 'MANAGER',
        slug: 'manager',
        title: 'Project Manager',
        shortTitle: 'Manager',
        department: 'Operations',
        designation: 'Project Manager',
        description: 'Project lifecycle oversight, team allocation, and review',
        email: 'manager@ems.com',
        password: 'Manager@123',
        badgeColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30',
        accentBg: 'bg-indigo-500/10 text-indigo-600',
        iconName: 'Briefcase',
    },
    {
        role: 'TEAM_LEADER',
        slug: 'team-leader',
        title: 'Team Leader',
        shortTitle: 'Team Leader',
        department: 'Engineering',
        designation: 'Team Leader',
        description: 'Task assignments, daily sprint monitoring, and report reviews',
        email: 'teamleader@ems.com',
        password: 'Leader@123',
        badgeColor: 'bg-violet-500/10 text-violet-600 border-violet-500/30',
        accentBg: 'bg-violet-500/10 text-violet-600',
        iconName: 'UserCheck',
    },
    {
        role: 'TEAM_COORDINATOR',
        slug: 'team-coordinator',
        title: 'Team Coordinator',
        shortTitle: 'Coordinator',
        department: 'Engineering',
        designation: 'Team Coordinator',
        description: 'Cross-functional alignment, task tracking, and coordination',
        email: 'coordinator@ems.com',
        password: 'Coordinator@123',
        badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
        accentBg: 'bg-blue-500/10 text-blue-600',
        iconName: 'Network',
    },
    {
        role: 'BA',
        slug: 'ba',
        title: 'Business Analyst',
        shortTitle: 'BA',
        department: 'Business Development',
        designation: 'Senior Business Analyst',
        description: 'Project requirements, milestone tracking, and deliverables',
        email: 'ba@ems.com',
        password: 'Ba@123',
        badgeColor: 'bg-[#13498a]/10 text-[#13498a] border-[#13498a]/30',
        accentBg: 'bg-[#13498a]/10 text-[#13498a]',
        iconName: 'LineChart',
    },
    {
        role: 'PA',
        slug: 'pa',
        title: 'Project Assistant',
        shortTitle: 'PA',
        department: 'Engineering',
        designation: 'Project Assistant',
        description: 'Project documentation, tracking assistance, and updates',
        email: 'pa@ems.com',
        password: 'Pa@123',
        badgeColor: 'bg-[#13498a]/10 text-[#13498a] border-[#13498a]/30',
        accentBg: 'bg-[#13498a]/10 text-[#13498a]',
        iconName: 'ClipboardList',
    },
    {
        role: 'EMPLOYEE',
        slug: 'employee',
        title: 'Software Engineer',
        shortTitle: 'Employee',
        department: 'Engineering',
        designation: 'Software Engineer',
        description: 'Daily project tasks, attendance check-in/out, and work logs',
        email: 'employee@ems.com',
        password: 'Employee@123',
        badgeColor: 'bg-slate-500/10 text-slate-600 border-slate-500/30',
        accentBg: 'bg-slate-500/10 text-slate-600',
        iconName: 'Code2',
    },
    {
        role: 'INTERN',
        slug: 'intern',
        title: 'Engineering Intern',
        shortTitle: 'Intern',
        department: 'Engineering',
        designation: 'Graduate Intern',
        description: 'Assigned learning tasks, daily reports, and training tracking',
        email: 'intern@ems.com',
        password: 'Intern@123',
        badgeColor: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/30',
        accentBg: 'bg-cyan-500/10 text-cyan-600',
        iconName: 'GraduationCap',
    },
]

export function getDemoRoleBySlug(slug: string): DemoRoleConfig | undefined {
    return DEMO_ROLES.find((r) => r.slug.toLowerCase() === slug.toLowerCase())
}
