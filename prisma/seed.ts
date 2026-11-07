import { PrismaClient, Role, UserStatus, ProjectStatus, TaskStatus, AttendanceStatus, LeaveStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting comprehensive database seeding for Employee Management System...')
    console.log('')

    // =========================================================================
    // 1. SEED USERS (10+ Meaningful Employees across all Roles & Hierarchy)
    // =========================================================================
    console.log('👤 Seeding Employees / Demo Accounts...')

    const passwordHashAdmin = await bcrypt.hash('Admin@123', 12)
    const passwordHashHr = await bcrypt.hash('Hr@123', 12)
    const passwordHashManager = await bcrypt.hash('Manager@123', 12)
    const passwordHashLeader = await bcrypt.hash('Leader@123', 12)
    const passwordHashCoordinator = await bcrypt.hash('Coordinator@123', 12)
    const passwordHashBa = await bcrypt.hash('Ba@123', 12)
    const passwordHashPa = await bcrypt.hash('Pa@123', 12)
    const passwordHashEmployee = await bcrypt.hash('Employee@123', 12)
    const passwordHashIntern = await bcrypt.hash('Intern@123', 12)
    const passwordHashLegacyAdmin = await bcrypt.hash('Matt@4321admin', 12)

    // Legacy admin preservation
    await prisma.user.upsert({
        where: { email: 'admin@mattengg.com' },
        update: {
            password: passwordHashLegacyAdmin,
            name: 'System Admin (Legacy)',
            role: Role.ADMIN,
            status: UserStatus.ACTIVE,
            department: 'Management',
            designation: 'Senior System Administrator',
        },
        create: {
            email: 'admin@mattengg.com',
            password: passwordHashLegacyAdmin,
            name: 'System Admin (Legacy)',
            role: Role.ADMIN,
            status: UserStatus.ACTIVE,
            department: 'Management',
            designation: 'Senior System Administrator',
        },
    })

    // 1. System Administrator
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@ems.com' },
        update: {
            name: 'System Admin',
            password: passwordHashAdmin,
            role: Role.ADMIN,
            status: UserStatus.ACTIVE,
            department: 'Management',
            designation: 'Chief Technology Officer',
            phone: '+1 (555) 019-2831',
        },
        create: {
            email: 'admin@ems.com',
            name: 'System Admin',
            password: passwordHashAdmin,
            role: Role.ADMIN,
            status: UserStatus.ACTIVE,
            department: 'Management',
            designation: 'Chief Technology Officer',
            phone: '+1 (555) 019-2831',
        },
    })

    // 2. HR Manager
    const hrUser = await prisma.user.upsert({
        where: { email: 'hr@ems.com' },
        update: {
            name: 'Sarah Jenkins',
            password: passwordHashHr,
            role: Role.HR,
            status: UserStatus.ACTIVE,
            department: 'Human Resources',
            designation: 'Head of Human Resources',
            phone: '+1 (555) 019-4822',
            managerId: adminUser.id,
        },
        create: {
            email: 'hr@ems.com',
            name: 'Sarah Jenkins',
            password: passwordHashHr,
            role: Role.HR,
            status: UserStatus.ACTIVE,
            department: 'Human Resources',
            designation: 'Head of Human Resources',
            phone: '+1 (555) 019-4822',
            managerId: adminUser.id,
        },
    })

    // 3. Project Manager
    const managerUser = await prisma.user.upsert({
        where: { email: 'manager@ems.com' },
        update: {
            name: 'Marcus Vance',
            password: passwordHashManager,
            role: Role.MANAGER,
            status: UserStatus.ACTIVE,
            department: 'Operations',
            designation: 'Principal Project Manager',
            phone: '+1 (555) 019-8391',
            managerId: adminUser.id,
        },
        create: {
            email: 'manager@ems.com',
            name: 'Marcus Vance',
            password: passwordHashManager,
            role: Role.MANAGER,
            status: UserStatus.ACTIVE,
            department: 'Operations',
            designation: 'Principal Project Manager',
            phone: '+1 (555) 019-8391',
            managerId: adminUser.id,
        },
    })

    // 4. Team Leader
    const leaderUser = await prisma.user.upsert({
        where: { email: 'teamleader@ems.com' },
        update: {
            name: 'David Chen',
            password: passwordHashLeader,
            role: Role.TEAM_LEADER,
            status: UserStatus.ACTIVE,
            department: 'Engineering',
            designation: 'Lead Solutions Architect',
            phone: '+1 (555) 019-7741',
            managerId: managerUser.id,
        },
        create: {
            email: 'teamleader@ems.com',
            name: 'David Chen',
            password: passwordHashLeader,
            role: Role.TEAM_LEADER,
            status: UserStatus.ACTIVE,
            department: 'Engineering',
            designation: 'Lead Solutions Architect',
            phone: '+1 (555) 019-7741',
            managerId: managerUser.id,
        },
    })

    // 5. Team Coordinator
    const coordinatorUser = await prisma.user.upsert({
        where: { email: 'coordinator@ems.com' },
        update: {
            name: 'Priya Sharma',
            password: passwordHashCoordinator,
            role: Role.TEAM_COORDINATOR,
            status: UserStatus.ACTIVE,
            department: 'Engineering',
            designation: 'Engineering Program Coordinator',
            phone: '+1 (555) 019-3382',
            managerId: leaderUser.id,
        },
        create: {
            email: 'coordinator@ems.com',
            name: 'Priya Sharma',
            password: passwordHashCoordinator,
            role: Role.TEAM_COORDINATOR,
            status: UserStatus.ACTIVE,
            department: 'Engineering',
            designation: 'Engineering Program Coordinator',
            phone: '+1 (555) 019-3382',
            managerId: leaderUser.id,
        },
    })

    // 6. Business Analyst
    const baUser = await prisma.user.upsert({
        where: { email: 'ba@ems.com' },
        update: {
            name: 'Liam Gallagher',
            password: passwordHashBa,
            role: Role.BA,
            status: UserStatus.ACTIVE,
            department: 'Business Development',
            designation: 'Senior Business Systems Analyst',
            phone: '+1 (555) 019-5519',
            managerId: managerUser.id,
        },
        create: {
            email: 'ba@ems.com',
            name: 'Liam Gallagher',
            password: passwordHashBa,
            role: Role.BA,
            status: UserStatus.ACTIVE,
            department: 'Business Development',
            designation: 'Senior Business Systems Analyst',
            phone: '+1 (555) 019-5519',
            managerId: managerUser.id,
        },
    })

    // 7. Project Assistant
    const paUser = await prisma.user.upsert({
        where: { email: 'pa@ems.com' },
        update: {
            name: 'Rachel Torres',
            password: passwordHashPa,
            role: Role.PA,
            status: UserStatus.ACTIVE,
            department: 'Engineering',
            designation: 'Technical Project Assistant',
            phone: '+1 (555) 019-6192',
            managerId: managerUser.id,
        },
        create: {
            email: 'pa@ems.com',
            name: 'Rachel Torres',
            password: passwordHashPa,
            role: Role.PA,
            status: UserStatus.ACTIVE,
            department: 'Engineering',
            designation: 'Technical Project Assistant',
            phone: '+1 (555) 019-6192',
            managerId: managerUser.id,
        },
    })

    // 8. Software Engineer (Demo Employee)
    const employeeUser = await prisma.user.upsert({
        where: { email: 'employee@ems.com' },
        update: {
            name: 'Alex Mercer',
            password: passwordHashEmployee,
            role: Role.EMPLOYEE,
            status: UserStatus.ACTIVE,
            department: 'Engineering',
            designation: 'Senior Full-Stack Engineer',
            phone: '+1 (555) 019-1120',
            managerId: leaderUser.id,
        },
        create: {
            email: 'employee@ems.com',
            name: 'Alex Mercer',
            password: passwordHashEmployee,
            role: Role.EMPLOYEE,
            status: UserStatus.ACTIVE,
            department: 'Engineering',
            designation: 'Senior Full-Stack Engineer',
            phone: '+1 (555) 019-1120',
            managerId: leaderUser.id,
        },
    })

    // 9. Additional Staff Engineer
    const ethanUser = await prisma.user.upsert({
        where: { email: 'ethan@ems.com' },
        update: {
            name: 'Ethan Hunt',
            password: passwordHashEmployee,
            role: Role.EMPLOYEE,
            status: UserStatus.ACTIVE,
            department: 'Engineering',
            designation: 'Cloud Infrastructure Engineer',
            phone: '+1 (555) 019-9403',
            managerId: leaderUser.id,
        },
        create: {
            email: 'ethan@ems.com',
            name: 'Ethan Hunt',
            password: passwordHashEmployee,
            role: Role.EMPLOYEE,
            status: UserStatus.ACTIVE,
            department: 'Engineering',
            designation: 'Cloud Infrastructure Engineer',
            phone: '+1 (555) 019-9403',
            managerId: leaderUser.id,
        },
    })

    // 10. Engineering Intern
    const internUser = await prisma.user.upsert({
        where: { email: 'intern@ems.com' },
        update: {
            name: 'Maya Lin',
            password: passwordHashIntern,
            role: Role.INTERN,
            status: UserStatus.ACTIVE,
            department: 'Engineering',
            designation: 'Graduate Software Intern',
            phone: '+1 (555) 019-2049',
            managerId: employeeUser.id,
        },
        create: {
            email: 'intern@ems.com',
            name: 'Maya Lin',
            password: passwordHashIntern,
            role: Role.INTERN,
            status: UserStatus.ACTIVE,
            department: 'Engineering',
            designation: 'Graduate Software Intern',
            phone: '+1 (555) 019-2049',
            managerId: employeeUser.id,
        },
    })

    console.log(`✅ Seeded 10+ Employees with organizational hierarchy.`)

    // =========================================================================
    // 2. SEED PROJECTS (10 Meaningful Enterprise Projects)
    // =========================================================================
    console.log('📁 Seeding Projects (10 records)...')

    const projectsData = [
        {
            title: 'Cloud Infrastructure Modernization',
            description: 'Migrating legacy monolith servers to high-availability AWS Kubernetes cluster with automated zero-downtime deployments.',
            status: ProjectStatus.IN_PROGRESS,
            priority: 'HIGH',
            startDate: new Date('2026-01-10T09:00:00Z'),
            endDate: new Date('2026-06-30T18:00:00Z'),
            githubLink: 'https://github.com/ems-enterprise/cloud-infra-core',
            createdById: adminUser.id,
            assignedToId: leaderUser.id,
        },
        {
            title: 'AI-Powered Workforce Analytics',
            description: 'Building deep predictive analytics models for employee workload distribution, sprint velocity, and attrition prediction.',
            status: ProjectStatus.IN_PROGRESS,
            priority: 'HIGH',
            startDate: new Date('2026-02-01T09:00:00Z'),
            endDate: new Date('2026-07-15T18:00:00Z'),
            githubLink: 'https://github.com/ems-enterprise/analytics-ai-engine',
            createdById: baUser.id,
            assignedToId: employeeUser.id,
        },
        {
            title: 'NextGen Mobile Banking Portal',
            description: 'Revamping mobile client with biometric login, contactless payments, and multi-currency global transfers.',
            status: ProjectStatus.IN_PROGRESS,
            priority: 'HIGH',
            startDate: new Date('2026-01-15T09:00:00Z'),
            endDate: new Date('2026-05-30T18:00:00Z'),
            githubLink: 'https://github.com/ems-enterprise/mobile-banking-app',
            createdById: managerUser.id,
            assignedToId: ethanUser.id,
        },
        {
            title: 'Enterprise HR & Payroll Automation',
            description: 'Automating compensation reviews, tax calculations, dynamic pay-stub exports, and statutory compliance checks.',
            status: ProjectStatus.COMPLETED,
            priority: 'HIGH',
            startDate: new Date('2025-10-01T09:00:00Z'),
            endDate: new Date('2026-02-28T18:00:00Z'),
            githubLink: 'https://github.com/ems-enterprise/payroll-automation',
            createdById: hrUser.id,
            assignedToId: coordinatorUser.id,
        },
        {
            title: 'Supply Chain & Logistics Telemetry',
            description: 'Real-time GPS dispatch tracking, refrigerated container temperature sensors, and automated warehouse inventory sync.',
            status: ProjectStatus.IN_PROGRESS,
            priority: 'MEDIUM',
            startDate: new Date('2026-02-15T09:00:00Z'),
            endDate: new Date('2026-08-30T18:00:00Z'),
            githubLink: 'https://github.com/ems-enterprise/logistics-telemetry',
            createdById: baUser.id,
            assignedToId: employeeUser.id,
        },
        {
            title: 'Zero-Trust Cyber Security & Audit',
            description: 'Enterprise-wide IAM policy overhaul, MFA hardware key enforcement, and automated external vulnerability scanning.',
            status: ProjectStatus.IN_PROGRESS,
            priority: 'HIGH',
            startDate: new Date('2026-01-05T09:00:00Z'),
            endDate: new Date('2026-04-30T18:00:00Z'),
            githubLink: 'https://github.com/ems-enterprise/security-audit-tooling',
            createdById: adminUser.id,
            assignedToId: leaderUser.id,
        },
        {
            title: 'Customer Self-Service Support Bot',
            description: 'Natural language conversational assistant for rapid FAQ answering, ticket escalation, and agent routing.',
            status: ProjectStatus.COMPLETED,
            priority: 'MEDIUM',
            startDate: new Date('2025-11-01T09:00:00Z'),
            endDate: new Date('2026-02-15T18:00:00Z'),
            githubLink: 'https://github.com/ems-enterprise/support-chat-bot',
            createdById: paUser.id,
            assignedToId: employeeUser.id,
        },
        {
            title: 'IoT Smart Office Energy Grid',
            description: 'Connecting ambient lighting, HVAC sensors, and conference room occupancy sensors for 30% reduction in power consumption.',
            status: ProjectStatus.IN_PROGRESS,
            priority: 'LOW',
            startDate: new Date('2026-02-20T09:00:00Z'),
            endDate: new Date('2026-09-01T18:00:00Z'),
            githubLink: 'https://github.com/ems-enterprise/smart-office-iot',
            createdById: managerUser.id,
            assignedToId: ethanUser.id,
        },
        {
            title: 'Multi-Tenant SaaS Billing Gateway',
            description: 'Unified billing microservice supporting Stripe, PayPal, SEPA, and wire transfers with automated tiered usage invoicing.',
            status: ProjectStatus.PENDING,
            priority: 'HIGH',
            startDate: new Date('2026-04-01T09:00:00Z'),
            endDate: new Date('2026-09-30T18:00:00Z'),
            githubLink: 'https://github.com/ems-enterprise/saas-billing-service',
            createdById: baUser.id,
            assignedToId: leaderUser.id,
        },
        {
            title: 'Employee Onboarding & Training Portal',
            description: 'Interactive training modules, NDA signature collection, workstation provisioning checklists, and buddy mentoring system.',
            status: ProjectStatus.COMPLETED,
            priority: 'LOW',
            startDate: new Date('2025-12-01T09:00:00Z'),
            endDate: new Date('2026-02-10T18:00:00Z'),
            githubLink: 'https://github.com/ems-enterprise/onboarding-portal',
            createdById: hrUser.id,
            assignedToId: internUser.id,
        },
    ]

    const seededProjects = []
    for (const p of projectsData) {
        const existing = await prisma.project.findFirst({ where: { title: p.title } })
        if (existing) {
            const updated = await prisma.project.update({
                where: { id: existing.id },
                data: p,
            })
            seededProjects.push(updated)
        } else {
            const created = await prisma.project.create({ data: p })
            seededProjects.push(created)
        }
    }
    console.log(`✅ Seeded ${seededProjects.length} Projects.`)

    // =========================================================================
    // 3. SEED TASKS (10 Realistic Allocated Tasks)
    // =========================================================================
    console.log('📌 Seeding Tasks (10 records)...')

    const tasksData = [
        {
            title: 'Design Microservices VPC Topology & Security Groups',
            description: 'Create multi-AZ VPC architecture with private subnets, NAT gateways, and egress filters.',
            status: TaskStatus.COMPLETED,
            priority: 'HIGH',
            startDate: new Date('2026-01-12T09:00:00Z'),
            endDate: new Date('2026-01-30T18:00:00Z'),
            projectId: seededProjects[0].id,
            assignedToId: leaderUser.id,
        },
        {
            title: 'Configure Terraform & Kubernetes Helm Charts',
            description: 'Set up reproducible infrastructure-as-code scripts and ArgoCD GitOps deployment manifests.',
            status: TaskStatus.IN_PROGRESS,
            priority: 'HIGH',
            startDate: new Date('2026-02-01T09:00:00Z'),
            endDate: new Date('2026-03-25T18:00:00Z'),
            projectId: seededProjects[0].id,
            assignedToId: ethanUser.id,
        },
        {
            title: 'Train Workload Prediction Model using Scikit-Learn',
            description: 'Process past sprint logs and train regression models to forecast delivery timelines.',
            status: TaskStatus.IN_PROGRESS,
            priority: 'HIGH',
            startDate: new Date('2026-02-05T09:00:00Z'),
            endDate: new Date('2026-03-30T18:00:00Z'),
            projectId: seededProjects[1].id,
            assignedToId: employeeUser.id,
        },
        {
            title: 'Integrate Biometric FaceID & Secure Enclave Keys',
            description: 'Implement native iOS/Android keychain access for zero-friction biometric re-authentication.',
            status: TaskStatus.IN_PROGRESS,
            priority: 'HIGH',
            startDate: new Date('2026-02-10T09:00:00Z'),
            endDate: new Date('2026-04-10T18:00:00Z'),
            projectId: seededProjects[2].id,
            assignedToId: employeeUser.id,
        },
        {
            title: 'Generate PDF Payslip Export Templates with Dynamic QR',
            description: 'Format compliant electronic tax receipts with cryptographically signed verification QR codes.',
            status: TaskStatus.COMPLETED,
            priority: 'MEDIUM',
            startDate: new Date('2026-01-15T09:00:00Z'),
            endDate: new Date('2026-02-20T18:00:00Z'),
            projectId: seededProjects[3].id,
            assignedToId: coordinatorUser.id,
        },
        {
            title: 'Develop Real-time WebSockets Driver Dispatch Channel',
            description: 'Establish bi-directional live GPS coordinate streaming between trucks and central dispatch map.',
            status: TaskStatus.IN_PROGRESS,
            priority: 'HIGH',
            startDate: new Date('2026-02-18T09:00:00Z'),
            endDate: new Date('2026-04-15T18:00:00Z'),
            projectId: seededProjects[4].id,
            assignedToId: ethanUser.id,
        },
        {
            title: 'Conduct Automated Penetration Testing & Report Remediations',
            description: 'Run comprehensive ZAP vulnerability scans and patch third-party npm dependency CVEs.',
            status: TaskStatus.IN_PROGRESS,
            priority: 'HIGH',
            startDate: new Date('2026-01-20T09:00:00Z'),
            endDate: new Date('2026-03-31T18:00:00Z'),
            projectId: seededProjects[5].id,
            assignedToId: leaderUser.id,
        },
        {
            title: 'Build Natural Language Fallback Intent Flows',
            description: 'Handle out-of-domain client inquiries and automatically transcribe context into Zendesk tickets.',
            status: TaskStatus.COMPLETED,
            priority: 'MEDIUM',
            startDate: new Date('2025-11-15T09:00:00Z'),
            endDate: new Date('2026-01-25T18:00:00Z'),
            projectId: seededProjects[6].id,
            assignedToId: paUser.id,
        },
        {
            title: 'Draft Tiered Subscription Specs & Stripe Checkout Flow',
            description: 'Author user journey flowcharts and API contract specifications for metered invoicing.',
            status: TaskStatus.PENDING,
            priority: 'HIGH',
            startDate: new Date('2026-04-01T09:00:00Z'),
            endDate: new Date('2026-05-15T18:00:00Z'),
            projectId: seededProjects[8].id,
            assignedToId: baUser.id,
        },
        {
            title: 'Build Interactive Security Awareness Quiz for New Hires',
            description: 'Interactive gamified module covering phishing defense, password hygiene, and clean desk policies.',
            status: TaskStatus.COMPLETED,
            priority: 'LOW',
            startDate: new Date('2025-12-10T09:00:00Z'),
            endDate: new Date('2026-01-20T18:00:00Z'),
            projectId: seededProjects[9].id,
            assignedToId: internUser.id,
        },
    ]

    const seededTasks = []
    for (const t of tasksData) {
        const existing = await prisma.task.findFirst({
            where: { title: t.title, projectId: t.projectId },
        })
        if (existing) {
            const updated = await prisma.task.update({
                where: { id: existing.id },
                data: t,
            })
            seededTasks.push(updated)
        } else {
            const created = await prisma.task.create({ data: t })
            seededTasks.push(created)
        }
    }
    console.log(`✅ Seeded ${seededTasks.length} Tasks.`)

    // =========================================================================
    // 4. SEED ATTENDANCE & SESSIONS (10 Realistic Days / Sessions)
    // =========================================================================
    console.log('⏰ Seeding Attendance Records (10 records)...')

    const attendanceDays = [
        { user: employeeUser, dateStr: '2026-03-01', inH: 9, inM: 0, outH: 18, outM: 0, hours: 9.0, status: AttendanceStatus.PRESENT, ot: 0.5 },
        { user: employeeUser, dateStr: '2026-03-02', inH: 8, inM: 45, outH: 17, outM: 45, hours: 9.0, status: AttendanceStatus.PRESENT, ot: 0.0 },
        { user: employeeUser, dateStr: '2026-03-03', inH: 9, inM: 15, outH: 18, outM: 15, hours: 9.0, status: AttendanceStatus.PRESENT, ot: 0.0 },
        { user: leaderUser,   dateStr: '2026-03-01', inH: 8, inM: 30, outH: 18, outM: 30, hours: 10.0, status: AttendanceStatus.PRESENT, ot: 1.5 },
        { user: leaderUser,   dateStr: '2026-03-02', inH: 9, inM: 0, outH: 18, outM: 0, hours: 9.0, status: AttendanceStatus.PRESENT, ot: 0.0 },
        { user: coordinatorUser, dateStr: '2026-03-01', inH: 9, inM: 0, outH: 17, outM: 30, hours: 8.5, status: AttendanceStatus.PRESENT, ot: 0.0 },
        { user: coordinatorUser, dateStr: '2026-03-02', inH: 9, inM: 10, outH: 18, outM: 0, hours: 8.8, status: AttendanceStatus.WFH, ot: 0.0 },
        { user: ethanUser,    dateStr: '2026-03-01', inH: 9, inM: 0, outH: 18, outM: 0, hours: 9.0, status: AttendanceStatus.PRESENT, ot: 0.0 },
        { user: ethanUser,    dateStr: '2026-03-02', inH: 8, inM: 50, outH: 19, outM: 20, hours: 10.5, status: AttendanceStatus.PRESENT, ot: 2.0 },
        { user: internUser,   dateStr: '2026-03-01', inH: 9, inM: 30, outH: 17, outM: 30, hours: 8.0, status: AttendanceStatus.PRESENT, ot: 0.0 },
    ]

    for (const a of attendanceDays) {
        const dateObj = new Date(`${a.dateStr}T00:00:00Z`)
        const checkInTime = new Date(`${a.dateStr}T${String(a.inH).padStart(2, '0')}:${String(a.inM).padStart(2, '0')}:00Z`)
        const checkOutTime = new Date(`${a.dateStr}T${String(a.outH).padStart(2, '0')}:${String(a.outM).padStart(2, '0')}:00Z`)

        const attendanceRecord = await prisma.attendance.upsert({
            where: {
                userId_date: {
                    userId: a.user.id,
                    date: dateObj,
                },
            },
            update: {
                status: a.status,
                totalHours: a.hours,
                isOvertime: a.ot > 0,
                overtimeHours: a.ot,
            },
            create: {
                userId: a.user.id,
                date: dateObj,
                status: a.status,
                totalHours: a.hours,
                isOvertime: a.ot > 0,
                overtimeHours: a.ot,
                notes: `Standard work log for ${a.user.name}`,
            },
        })

        // Check if session exists
        const existingSession = await prisma.attendanceSession.findFirst({
            where: { attendanceId: attendanceRecord.id },
        })

        if (!existingSession) {
            await prisma.attendanceSession.create({
                data: {
                    attendanceId: attendanceRecord.id,
                    checkIn: checkInTime,
                    checkOut: checkOutTime,
                    hoursWorked: a.hours,
                    isOvertime: a.ot > 0,
                    overtimeHours: a.ot,
                },
            })
        }
    }
    console.log(`✅ Seeded 10 Attendance records with check-in/out sessions.`)

    // =========================================================================
    // 5. SEED LEAVE REQUESTS (10 Meaningful Requests across Statuses)
    // =========================================================================
    console.log('🌴 Seeding Leave Requests (10 records)...')

    const leaveRequestsData = [
        {
            userId: employeeUser.id,
            startDate: new Date('2026-03-16T00:00:00Z'),
            endDate: new Date('2026-03-18T00:00:00Z'),
            reason: 'Annual family medical checkup and recovery period.',
            status: LeaveStatus.APPROVED,
        },
        {
            userId: ethanUser.id,
            startDate: new Date('2026-03-23T00:00:00Z'),
            endDate: new Date('2026-03-24T00:00:00Z'),
            reason: 'Attending elder sister’s wedding ceremony out of state.',
            status: LeaveStatus.APPROVED,
        },
        {
            userId: coordinatorUser.id,
            startDate: new Date('2026-04-06T00:00:00Z'),
            endDate: new Date('2026-04-08T00:00:00Z'),
            reason: 'Spring family holiday vacation trip booked in advance.',
            status: LeaveStatus.PENDING,
        },
        {
            userId: internUser.id,
            startDate: new Date('2026-03-12T00:00:00Z'),
            endDate: new Date('2026-03-13T00:00:00Z'),
            reason: 'Final university degree thesis defense and viva presentation.',
            status: LeaveStatus.APPROVED,
        },
        {
            userId: paUser.id,
            startDate: new Date('2026-03-20T00:00:00Z'),
            endDate: new Date('2026-03-20T00:00:00Z'),
            reason: 'Routine dental surgery consultation and recovery.',
            status: LeaveStatus.APPROVED,
        },
        {
            userId: baUser.id,
            startDate: new Date('2026-04-14T00:00:00Z'),
            endDate: new Date('2026-04-16T00:00:00Z'),
            reason: 'Attending IEEE International Systems Architecture Conference.',
            status: LeaveStatus.PENDING,
        },
        {
            userId: leaderUser.id,
            startDate: new Date('2026-03-09T00:00:00Z'),
            endDate: new Date('2026-03-09T00:00:00Z'),
            reason: 'Urgent home plumbing repair and contractor supervision.',
            status: LeaveStatus.REJECTED,
        },
        {
            userId: employeeUser.id,
            startDate: new Date('2026-04-20T00:00:00Z'),
            endDate: new Date('2026-04-22T00:00:00Z'),
            reason: 'Personal relocation and apartment lease transition.',
            status: LeaveStatus.PENDING,
        },
        {
            userId: hrUser.id,
            startDate: new Date('2026-03-27T00:00:00Z'),
            endDate: new Date('2026-03-27T00:00:00Z'),
            reason: 'National SHRM HR Leadership Summit representation.',
            status: LeaveStatus.APPROVED,
        },
        {
            userId: internUser.id,
            startDate: new Date('2026-04-02T00:00:00Z'),
            endDate: new Date('2026-04-03T00:00:00Z'),
            reason: 'Campus recruitment seminar coordination on university premises.',
            status: LeaveStatus.APPROVED,
        },
    ]

    for (const lr of leaveRequestsData) {
        const existing = await prisma.leaveRequest.findFirst({
            where: { userId: lr.userId, reason: lr.reason },
        })
        if (!existing) {
            await prisma.leaveRequest.create({ data: lr })
        }
    }
    console.log(`✅ Seeded 10 Leave Requests.`)

    // =========================================================================
    // 6. SEED WORK FROM HOME (WFH) REQUESTS (10 Records)
    // =========================================================================
    console.log('🏡 Seeding WFH Requests (10 records)...')

    const wfhRequestsData = [
        {
            userId: employeeUser.id,
            startDate: new Date('2026-03-10T00:00:00Z'),
            endDate: new Date('2026-03-10T00:00:00Z'),
            reason: 'High-speed fiber optic connection setup and diagnostic visit.',
            status: LeaveStatus.APPROVED,
        },
        {
            userId: ethanUser.id,
            startDate: new Date('2026-03-11T00:00:00Z'),
            endDate: new Date('2026-03-11T00:00:00Z'),
            reason: 'Overnight cloud migration watch; working remotely for focus.',
            status: LeaveStatus.APPROVED,
        },
        {
            userId: coordinatorUser.id,
            startDate: new Date('2026-03-13T00:00:00Z'),
            endDate: new Date('2026-03-13T00:00:00Z'),
            reason: 'Severe weather alert and municipal travel advisory.',
            status: LeaveStatus.APPROVED,
        },
        {
            userId: paUser.id,
            startDate: new Date('2026-03-17T00:00:00Z'),
            endDate: new Date('2026-03-17T00:00:00Z'),
            reason: 'Appliance delivery and home security technician window.',
            status: LeaveStatus.PENDING,
        },
        {
            userId: baUser.id,
            startDate: new Date('2026-03-18T00:00:00Z'),
            endDate: new Date('2026-03-19T00:00:00Z'),
            reason: 'Consecutive video calls with overseas enterprise clients in divergent timezones.',
            status: LeaveStatus.APPROVED,
        },
        {
            userId: leaderUser.id,
            startDate: new Date('2026-03-25T00:00:00Z'),
            endDate: new Date('2026-03-25T00:00:00Z'),
            reason: 'Deep-focus architectural diagram authoring sprint without interruption.',
            status: LeaveStatus.PENDING,
        },
        {
            userId: internUser.id,
            startDate: new Date('2026-03-26T00:00:00Z'),
            endDate: new Date('2026-03-26T00:00:00Z'),
            reason: 'Mild seasonal allergies; working from home as safety precaution.',
            status: LeaveStatus.APPROVED,
        },
        {
            userId: employeeUser.id,
            startDate: new Date('2026-04-01T00:00:00Z'),
            endDate: new Date('2026-04-02T00:00:00Z'),
            reason: 'Quarterly code freeze & regression testing cycle focus.',
            status: LeaveStatus.APPROVED,
        },
        {
            userId: ethanUser.id,
            startDate: new Date('2026-04-07T00:00:00Z'),
            endDate: new Date('2026-04-07T00:00:00Z'),
            reason: 'Childcare coverage while nursery is closed for staff training.',
            status: LeaveStatus.PENDING,
        },
        {
            userId: coordinatorUser.id,
            startDate: new Date('2026-04-10T00:00:00Z'),
            endDate: new Date('2026-04-10T00:00:00Z'),
            reason: 'Local electrical grid maintenance and substation upgrade.',
            status: LeaveStatus.REJECTED,
        },
    ]

    for (const wfh of wfhRequestsData) {
        const existing = await prisma.workFromHomeRequest.findFirst({
            where: { userId: wfh.userId, reason: wfh.reason },
        })
        if (!existing) {
            await prisma.workFromHomeRequest.create({ data: wfh })
        }
    }
    console.log(`✅ Seeded 10 Work From Home Requests.`)

    // =========================================================================
    // 7. SEED OVERTIME LOGIN REQUESTS (10 Records)
    // =========================================================================
    console.log('⚡ Seeding Overtime Login Requests (10 records)...')

    const overtimeRequestsData = [
        {
            userId: employeeUser.id,
            dateStr: '2026-03-07',
            status: LeaveStatus.APPROVED,
            reason: 'Saturday deployment of critical security patch for payment gateway.',
            reviewedById: managerUser.id,
        },
        {
            userId: ethanUser.id,
            dateStr: '2026-03-08',
            status: LeaveStatus.APPROVED,
            reason: 'Sunday database index defragmentation and replica failover test.',
            reviewedById: leaderUser.id,
        },
        {
            userId: leaderUser.id,
            dateStr: '2026-03-14',
            status: LeaveStatus.APPROVED,
            reason: 'Weekend release cut and client staging environment smoke test.',
            reviewedById: managerUser.id,
        },
        {
            userId: coordinatorUser.id,
            dateStr: '2026-03-15',
            status: LeaveStatus.PENDING,
            reason: 'Sunday coordination prep for Monday morning enterprise demo.',
            reviewedById: null,
        },
        {
            userId: baUser.id,
            dateStr: '2026-03-21',
            status: LeaveStatus.APPROVED,
            reason: 'Saturday finalization of RFP bid documentation for government tender.',
            reviewedById: managerUser.id,
        },
        {
            userId: paUser.id,
            dateStr: '2026-03-22',
            status: LeaveStatus.PENDING,
            reason: 'Project asset indexing and sprint documentation cleanup.',
            reviewedById: null,
        },
        {
            userId: employeeUser.id,
            dateStr: '2026-03-28',
            status: LeaveStatus.PENDING,
            reason: 'Saturday load testing for 100k concurrent WebSocket users.',
            reviewedById: null,
        },
        {
            userId: ethanUser.id,
            dateStr: '2026-03-29',
            status: LeaveStatus.REJECTED,
            reason: 'Overtime request rejected: standard hours sufficient for this task.',
            reviewedById: managerUser.id,
        },
        {
            userId: internUser.id,
            dateStr: '2026-04-04',
            status: LeaveStatus.APPROVED,
            reason: 'Assisting senior developer with Saturday staging rehearsal.',
            reviewedById: leaderUser.id,
        },
        {
            userId: leaderUser.id,
            dateStr: '2026-04-05',
            status: LeaveStatus.APPROVED,
            reason: 'Emergency production TLS certificate rotation and DNS health checks.',
            reviewedById: adminUser.id,
        },
    ]

    for (const ot of overtimeRequestsData) {
        const reqDate = new Date(`${ot.dateStr}T00:00:00Z`)
        await prisma.overtimeLoginRequest.upsert({
            where: {
                userId_requestDate: {
                    userId: ot.userId,
                    requestDate: reqDate,
                },
            },
            update: {
                status: ot.status,
                reason: ot.reason,
                reviewedById: ot.reviewedById,
                reviewedAt: ot.reviewedById ? new Date() : null,
            },
            create: {
                userId: ot.userId,
                requestDate: reqDate,
                status: ot.status,
                reason: ot.reason,
                reviewedById: ot.reviewedById,
                reviewedAt: ot.reviewedById ? new Date() : null,
            },
        })
    }
    console.log(`✅ Seeded 10 Overtime Login Requests.`)

    // =========================================================================
    // 8. SEED DAILY REPORTS (10 Realistic Reports with Manager Replies)
    // =========================================================================
    console.log('📝 Seeding Daily Reports (10 records)...')

    const dailyReportsData = [
        {
            userId: employeeUser.id,
            projectId: seededProjects[0].id,
            taskId: seededTasks[0].id,
            reportText: 'Completed private subnet routing tables and deployed VPC endpoint for S3 storage. Conducted internal latency benchmarks between cluster nodes with sub-millisecond response times.',
            hoursWorked: 8.5,
            date: new Date('2026-03-01T17:30:00Z'),
            replyText: 'Excellent work Alex. The latency numbers look solid. Proceed with NAT gateway tuning tomorrow.',
            repliedById: leaderUser.id,
        },
        {
            userId: ethanUser.id,
            projectId: seededProjects[0].id,
            taskId: seededTasks[1].id,
            reportText: 'Authored Kubernetes Helm values templates for staging and production environments. Verified secrets encryption at rest with AWS KMS.',
            hoursWorked: 8.0,
            date: new Date('2026-03-01T17:45:00Z'),
            replyText: 'Please make sure KMS key rotation policy is set to annual renewal.',
            repliedById: leaderUser.id,
        },
        {
            userId: employeeUser.id,
            projectId: seededProjects[1].id,
            taskId: seededTasks[2].id,
            reportText: 'Cleaned and normalized training dataset of historical engineering velocity. Model achieved 92% cross-validation accuracy on sprint burndown estimation.',
            hoursWorked: 8.5,
            date: new Date('2026-03-02T18:00:00Z'),
            replyText: 'Impressive accuracy metric. Let us present this in Friday’s sprint review demo.',
            repliedById: managerUser.id,
        },
        {
            userId: ethanUser.id,
            projectId: seededProjects[2].id,
            taskId: seededTasks[3].id,
            reportText: 'Completed iOS FaceID biometric integration via LocalAuthentication framework. Added defensive fallback to device passcode when biometric sensor fails.',
            hoursWorked: 9.0,
            date: new Date('2026-03-02T18:15:00Z'),
            replyText: 'Great UX fallback design. Ensure Android BiometricPrompt mirrors the exact error messaging.',
            repliedById: leaderUser.id,
        },
        {
            userId: coordinatorUser.id,
            projectId: seededProjects[3].id,
            taskId: seededTasks[4].id,
            reportText: 'Audited February payroll calculation matrices with finance team. Exported 140 verified payslips to secure S3 storage bucket with pre-signed access links.',
            hoursWorked: 8.0,
            date: new Date('2026-03-02T17:00:00Z'),
            replyText: 'All figures verified against bank ledger. Thank you Priya!',
            repliedById: hrUser.id,
        },
        {
            userId: employeeUser.id,
            projectId: seededProjects[4].id,
            taskId: seededTasks[5].id,
            reportText: 'Implemented Mapbox GL real-time driver breadcrumbs. Integrated Redis Pub/Sub cluster to handle 50,000 telemetry pings per minute smoothly.',
            hoursWorked: 9.5,
            date: new Date('2026-03-03T18:30:00Z'),
            replyText: 'The map visualization looks remarkably smooth. Great job on the Redis partitioning!',
            repliedById: managerUser.id,
        },
        {
            userId: leaderUser.id,
            projectId: seededProjects[5].id,
            taskId: seededTasks[6].id,
            reportText: 'Configured SonarQube static code analysis gate into GitHub Actions. Fixed 4 high-severity vulnerabilities in legacy session authentication library.',
            hoursWorked: 9.0,
            date: new Date('2026-03-03T18:00:00Z'),
            replyText: 'Crucial security update. Thank you for resolving those CVEs before the external audit.',
            repliedById: adminUser.id,
        },
        {
            userId: paUser.id,
            projectId: seededProjects[6].id,
            taskId: seededTasks[7].id,
            reportText: 'Updated 25 conversational dialog intents with latest 2026 service return and warranty policies. Verified deflection rate improved by 18% in sandbox.',
            hoursWorked: 7.5,
            date: new Date('2026-03-03T17:15:00Z'),
            replyText: 'Strong deflection metrics Rachel. Ready for production rollout.',
            repliedById: baUser.id,
        },
        {
            userId: baUser.id,
            projectId: seededProjects[8].id,
            taskId: seededTasks[8].id,
            reportText: 'Completed comprehensive API functional spec for Stripe usage metering webhooks. Defined idempotency key headers and error recovery retry algorithms.',
            hoursWorked: 8.0,
            date: new Date('2026-03-04T17:30:00Z'),
            replyText: 'The webhook idempotency documentation is very thorough. Handing over to engineering team.',
            repliedById: managerUser.id,
        },
        {
            userId: internUser.id,
            projectId: seededProjects[9].id,
            taskId: seededTasks[9].id,
            reportText: 'Added 10 new scenario-based security questions to the onboarding interactive quiz. Tested responsiveness on mobile devices and dark theme.',
            hoursWorked: 7.5,
            date: new Date('2026-03-04T16:45:00Z'),
            replyText: 'Great initiative Maya! The questions are engaging and realistic.',
            repliedById: hrUser.id,
        },
    ]

    for (const r of dailyReportsData) {
        const existing = await prisma.dailyReport.findFirst({
            where: {
                userId: r.userId,
                projectId: r.projectId,
                reportText: r.reportText,
            },
        })
        if (!existing) {
            await prisma.dailyReport.create({
                data: {
                    userId: r.userId,
                    projectId: r.projectId,
                    taskId: r.taskId,
                    reportText: r.reportText,
                    hoursWorked: r.hoursWorked,
                    date: r.date,
                    replyText: r.replyText,
                    repliedById: r.repliedById,
                    repliedAt: new Date(),
                },
            })
        }
    }
    console.log(`✅ Seeded 10 Daily Reports with replies.`)

    // =========================================================================
    // 9. SEED NOTIFICATIONS (10 Meaningful Notifications)
    // =========================================================================
    console.log('🔔 Seeding Notifications (10 records)...')

    const notificationsData = [
        {
            userId: employeeUser.id,
            title: 'Leave Request Approved',
            message: 'Your leave request for March 16 - March 18 has been approved by HR.',
            read: false,
        },
        {
            userId: employeeUser.id,
            title: 'Task Assigned: Scikit-Learn Model',
            message: 'Marcus Vance assigned you to task "Train Workload Prediction Model".',
            read: true,
        },
        {
            userId: leaderUser.id,
            title: 'New Daily Report Submitted',
            message: 'Alex Mercer submitted a daily report for Cloud Infrastructure Modernization.',
            read: false,
        },
        {
            userId: ethanUser.id,
            title: 'Overtime Request Approved',
            message: 'Your overtime login request for Sunday database maintenance was approved.',
            read: true,
        },
        {
            userId: coordinatorUser.id,
            title: 'WFH Request Approved',
            message: 'Your work from home request for March 13 has been approved.',
            read: false,
        },
        {
            userId: internUser.id,
            title: 'Daily Report Reviewed',
            message: 'Sarah Jenkins left feedback on your onboarding quiz daily report.',
            read: true,
        },
        {
            userId: hrUser.id,
            title: 'New Leave Request Received',
            message: 'Priya Sharma submitted a leave request pending your review.',
            read: false,
        },
        {
            userId: managerUser.id,
            title: 'Project Milestone Achieved',
            message: 'Customer Self-Service Support Bot project was marked as COMPLETED.',
            read: true,
        },
        {
            userId: baUser.id,
            title: 'Task Review Requested',
            message: 'Rachel Torres requested review on Dialog Intent Flows documentation.',
            read: false,
        },
        {
            userId: adminUser.id,
            title: 'System Security Audit Completed',
            message: 'Zero-Trust Cyber Security & Audit sprint flagged zero critical vulnerabilities.',
            read: false,
        },
    ]

    for (const n of notificationsData) {
        const existing = await prisma.notification.findFirst({
            where: { userId: n.userId, title: n.title, message: n.message },
        })
        if (!existing) {
            await prisma.notification.create({ data: n })
        }
    }
    console.log(`✅ Seeded 10 Notifications.`)

    // =========================================================================
    // SUMMARY CREDENTIALS TABLE FOR CLIENT PRESENTATION
    // =========================================================================
    console.log('')
    console.log('══════════════════════════════════════════════════════════════════════════════════════')
    console.log('                  EMPLOYEE MANAGEMENT SYSTEM - DEMO CREDENTIALS                       ')
    console.log('══════════════════════════════════════════════════════════════════════════════════════')
    console.log(' ROLE               EMAIL                    PASSWORD       PORTAL URL                ')
    console.log('──────────────────────────────────────────────────────────────────────────────────────')
    console.log(' System Admin       admin@ems.com            Admin@123      /login/admin              ')
    console.log(' HR Manager         hr@ems.com               Hr@123         /login/hr                 ')
    console.log(' Project Manager    manager@ems.com          Manager@123    /login/manager            ')
    console.log(' Team Leader        teamleader@ems.com       Leader@123     /login/team-leader        ')
    console.log(' Team Coordinator   coordinator@ems.com      Coordinator@123/login/team-coordinator   ')
    console.log(' Business Analyst   ba@ems.com               Ba@123         /login/ba                 ')
    console.log(' Project Assistant  pa@ems.com               Pa@123         /login/pa                 ')
    console.log(' Software Engineer  employee@ems.com         Employee@123   /login/employee           ')
    console.log(' Engineering Intern intern@ems.com           Intern@123     /login/intern             ')
    console.log('──────────────────────────────────────────────────────────────────────────────────────')
    console.log(' (Legacy Admin)     admin@mattengg.com       Matt@4321admin /login                    ')
    console.log('══════════════════════════════════════════════════════════════════════════════════════')
    console.log(' 🎉 All sections seeded with 10 realistic, fully-interconnected records!')
    console.log('')
}

main()
    .catch((e) => {
        console.error('❌ Error during database seeding:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
