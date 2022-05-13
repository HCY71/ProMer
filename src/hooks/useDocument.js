import { useState, useEffect } from 'react'
import { projectDb } from '../firebase/firebase'

export const useDocument = (collection, id) => {
    const [ document, setDocument ] = useState(null)
    const [ error, setError ] = useState(null)

    // realtime data for document
    useEffect(() => {
        const ref = projectDb.collection(collection).doc(id)

        const unsubscribe = ref.onSnapshot((snapshot) => {
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            } else {
                setError('No such document exists.')
            }
        }, (e) => {
            console.log(e.message)
            setError('Failed to get document.')
        })

        return () => {
            unsubscribe()
        }
    }, [ collection, id ])

    return { document, error }
}