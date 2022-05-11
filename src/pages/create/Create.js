// styles
import './Create.css'

// hooks
import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

// packages
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'

import { timestamp } from '../../firebase/firebase'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
]

const Create = () => {
    const { addDocument, response } = useFirestore('projects')
    const { documents } = useCollection('users')
    const { user } = useAuthContext()
    const [ users, setUsers ] = useState([])

    const [ name, setName ] = useState('')
    const [ details, setDetails ] = useState('')
    const [ dueDate, setDueDate ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ assignedUsers, setAssignedUsers ] = useState([])
    const [ formError, setFormError ] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!category) {
            setFormError('Please select a project category.')
            return
        }
        if (!assignedUsers.length) {
            setFormError('Please assign the project to at least one user.')
            return
        }
        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }
        const assignedUserList = assignedUsers.map((assignedUser) => {
            return {
                displayName: assignedUser.value.displayName,
                photoURL: assignedUser.value.photoURL,
                id: assignedUser.value.id
            }
        })

        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUserList
        }

        await addDocument(project)
        if (!response.error) {
            navigate('/')
        }

    }

    useEffect(() => {
        if (documents) {
            const options = documents.map((user) => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [ documents ])


    return (
        <div className="create-form">
            <h2 className="page-title">
                Create a New Project
                <form onSubmit={ handleSubmit }>
                    <label>
                        <span>Project name:</span>
                        <input
                            type="text"
                            required
                            onChange={ (e) => setName(e.target.value) }
                            value={ name }
                        />
                    </label>
                    <label>
                        <span>Project details:</span>
                        <textarea
                            required
                            onChange={ (e) => setDetails(e.target.value) }
                            value={ details }
                        />
                    </label>
                    <label>
                        <span>Project due date:</span>
                        <input
                            type="date"
                            required
                            onChange={ (e) => setDueDate(e.target.value) }
                            value={ dueDate }
                        />
                    </label>
                    <label>
                        <span>Project category</span>
                        <Select
                            options={ categories }
                            onChange={ (option) => setCategory(option) }
                        />
                    </label>
                    <label>
                        <span>Assign to:</span>
                        <Select
                            options={ users }
                            onChange={ (option) => setAssignedUsers(option) }
                            isMulti
                        />
                    </label>
                    <button className="btn">Add Project</button>
                    { formError && <p className='error'>{ formError }</p> }
                </form>
            </h2>
        </div>
    )
}

export default Create