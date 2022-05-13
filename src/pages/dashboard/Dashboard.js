// styles
import './Dashboard.css'

// hooks
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'

// components
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'

const Dashboard = () => {
    const { documents, error } = useCollection('projects')
    const { user } = useAuthContext()
    const [ currentFilter, setCurrentFilter ] = useState('all')

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }
    const projects = documents && documents.filter((doc) => {
        switch (currentFilter) {
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                doc.assignedUserList.forEach((u) => {
                    if (user.uid === u.id) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'development':
            case 'design':
            case 'sales':
            case 'marketing':
                return doc.category === currentFilter
            default:
                return true
        }
    })

    return (
        <div className="dashboard">
            <h2 className='page-title'>Dashboard</h2>
            { error && <p className='error'>{ error }</p> }
            { documents && (
                < ProjectFilter currentFilter={ currentFilter } changeFilter={ changeFilter } />
            ) }
            { projects && <ProjectList projects={ projects } /> }
        </div>
    )
}

export default Dashboard