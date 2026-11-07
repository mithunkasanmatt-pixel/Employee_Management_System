import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🗑️  Clearing mock data from database...')
    console.log('')

    try {
        // Delete in correct order due to foreign key constraints
        console.log('Deleting notifications...')
        await prisma.notification.deleteMany({})

        console.log('Deleting overtime login requests...')
        await prisma.overtimeLoginRequest.deleteMany({})

        console.log('Deleting work from home requests...')
        await prisma.workFromHomeRequest.deleteMany({})

        console.log('Deleting leave requests...')
        await prisma.leaveRequest.deleteMany({})

        console.log('Deleting daily reports...')
        await prisma.dailyReport.deleteMany({})

        console.log('Deleting tasks...')
        await prisma.task.deleteMany({})

        console.log('Deleting attendance sessions...')
        await prisma.attendanceSession.deleteMany({})

        console.log('Deleting attendance records...')
        await prisma.attendance.deleteMany({})

        console.log('Deleting projects...')
        await prisma.project.deleteMany({})

        console.log('Deleting users (keeping protected admins)...')
        await prisma.user.deleteMany({
            where: {
                NOT: [
                    { email: 'admin@ems.com' },
                    { email: 'admin@mattengg.com' },
                ],
            },
        })

        console.log('')
        console.log('✅ Mock data cleared!')
        console.log('')
        console.log('📋 Remaining Protected Accounts:')
        console.log('═════════════════════════════════════════════════════════')
        console.log('🔒 ADMIN: admin@ems.com / Admin@123')
        console.log('🔒 LEGACY: admin@mattengg.com / Matt@4321admin')
        console.log('═════════════════════════════════════════════════════════')
        console.log('')
    } catch (error) {
        console.error('❌ Error clearing data:', error)
        throw error
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
