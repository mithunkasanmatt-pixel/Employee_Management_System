import React from 'react'
import {
    Shield,
    Users,
    Briefcase,
    UserCheck,
    Network,
    LineChart,
    ClipboardList,
    Code2,
    GraduationCap,
    type LucideProps,
} from 'lucide-react'

interface RoleIconProps extends LucideProps {
    name: string
}

export function RoleIcon({ name, ...props }: RoleIconProps) {
    switch (name) {
        case 'Shield':
            return <Shield {...props} />
        case 'Users':
            return <Users {...props} />
        case 'Briefcase':
            return <Briefcase {...props} />
        case 'UserCheck':
            return <UserCheck {...props} />
        case 'Network':
            return <Network {...props} />
        case 'LineChart':
            return <LineChart {...props} />
        case 'ClipboardList':
            return <ClipboardList {...props} />
        case 'Code2':
            return <Code2 {...props} />
        case 'GraduationCap':
            return <GraduationCap {...props} />
        default:
            return <UserCheck {...props} />
    }
}
