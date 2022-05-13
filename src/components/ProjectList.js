// styles
import './ProjectList.css'

// packages
import { Link } from 'react-router-dom'

// components
import Avatar from './Avatar'

const ProjectList = ({ projects }) => {
    return (
        <div className='project-list'>
            { !projects.length && <p>No projects yet!</p> }
            { projects.map((project) => (
                <Link key={ project.id } to={ `/projects/${project.id}` }>
                    <h4>{ project.name }</h4>
                    <p>Due by { project.dueDate.toDate().toDateString() }</p>
                    <div className='assigned-to'>
                        <ul>
                            { project.assignedUserList.map((user) => (
                                <li key={ user.id }>
                                    <Avatar src={ user.photoURL } />
                                </li>
                            )) }
                        </ul>
                    </div>
                </Link>
            ))
            }
        </div >
    )
}

export default ProjectList