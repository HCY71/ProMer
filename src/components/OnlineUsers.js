// styles
import './OnlineUsers.css'

import Avatar from './Avatar'

import { useCollection } from '../hooks/useCollection'

const OnlineUsers = () => {
    const { documents, error } = useCollection('users')

    return (
        <div className="user-list">
            <h2>All Users</h2>
            { error && <div className='error'>{ error }</div> }
            { documents && documents.map((doc) => (
                <div key={ doc.id } className="user-list-item">
                    { doc.online && <span className='online-user'></span> }
                    <span>{ doc.displayName }</span>
                    <Avatar src={ doc.photoURL } />
                </div>
            )) }
        </div>
    )
}

export default OnlineUsers