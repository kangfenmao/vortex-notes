import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { displayName } from '@/utils'
import Navbar from '@/components/Navbar.tsx'
import { isAxiosError } from 'axios'
import { NoteType } from '@/types'
import useRequest from '@/hooks/useRequest.ts'
import MDEditor from '@uiw/react-md-editor'
import useDebouncedValue from '@/hooks/useDebouncedValue.ts'
import LoadingView from '@/components/LoadingView.tsx'

const NoteScreen: React.FC = () => {
  const [note, setNote] = useState<NoteType>()
  const params = useParams()
  const id = params.id
  const navigate = useNavigate()
  const { data, isLoading } = useRequest<NoteType>({ method: 'GET', url: `notes/${id}` })
  const loading = useDebouncedValue(false, isLoading, 1000)

  useEffect(() => {
    data && setNote(data)
  }, [data])

  const onEdit = () => {
    sessionStorage.setItem(`EDIT_NOTE:${id}`, JSON.stringify(note))
    navigate(`/notes/${id}/edit`)
  }

  const onDelete = async () => {
    if (!confirm(`Delete note ${note?.name}?`)) {
      return
    }

    try {
      await window.$http.delete(`notes/${id}`)
      navigate('/')
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          return alert('Delete note error: ' + error.response.data?.message)
        }
      }
      return alert('Delete note error')
    }
  }

  return (
    <main className="w-full">
      <Navbar />
      <div className="container mx-auto px-5 mt-20 max-w-lg sm:max-w-6xl">
        {loading && <LoadingView />}
        {note && (
          <>
            <div className="flex flex-row items-center mb-4">
              <h1 className="flex-1 text-2xl sm:text-3xl font-bold line-clamp-1">
                {displayName(note.name)}
              </h1>
              <button
                tabIndex={4}
                className="p-1 px-2 hover:bg-zinc-900 transition-all rounded-md flex flex-row items-center opacity-70 hover:opacity-100"
                onClick={onEdit}>
                <i className="iconfont icon-edit1 text-2xl mr-1"></i>
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                className="p-1 px-2 text-red-400 hover:bg-red-500 hover:text-white transition-all rounded-md flex flex-row items-center"
                onClick={onDelete}
                tabIndex={3}>
                <i className="iconfont icon-delete text-2xl mr-1"></i>
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
            <MDEditor.Markdown
              source={note.content}
              className="p-4 border-white border-opacity-20"
              style={{ borderWidth: 0.5, borderRadius: 3 }}
            />
          </>
        )}
        <footer className="h-10"></footer>
      </div>
    </main>
  )
}

export default NoteScreen
