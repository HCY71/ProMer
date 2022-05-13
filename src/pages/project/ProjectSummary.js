// components
import Avatar from '../../components/Avatar'

// hooks
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'

// package
import { useNavigate } from 'react-router-dom'

const ProjectSummary = ({ project }) => {
    const { deleteDocument, response } = useFirestore('projects')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleClick = async () => {
        await deleteDocument(project.id)
        console.log(response)
        navigate('/')
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{ project.name }</h2>
                <p>By { project.createdBy.displayName }</p>
                <p className="due-date">Project due by { project.dueDate.toDate().toDateString() }</p>
                <p className="details">{ project.details }</p>
                <h4>Project is assigned to: </h4>
                <div className="assigned-users">
                    { project.assignedUserList.map(user => (
                        <div key={ user.id }>
                            <Avatar src={ user.photoURL } />
                        </div>
                    )) }
                </div>
            </div>
            {/* { user.uid === project.createdBy.id && ( */ }
            <button className="btn" onClick={ handleClick }>Mark as Complete</button>
            {/* ) } */ }
        </div>
    )
}

export default ProjectSummary