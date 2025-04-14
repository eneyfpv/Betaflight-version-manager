import { useEffect, useRef, useState } from 'react'
import { Input } from 'antd'

import * as S from './ListItem.styles'

const ListItem = ({ value, selected, onClick, onUpdate }) => {
  const [edit, setEdit] = useState(!value)
  const [input, editInput] = useState(value)
  const inputRef = useRef()

  useEffect(() => {
    editInput(value)
  }, [value])

  useEffect(() => {
    if (!inputRef.current) return
    const onClick = (e) => {
      if (inputRef.current.nativeElement.contains(e.target)) {
        return
      }
      setEdit(false)
      editInput(value)
    }

    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [edit])

  useEffect(() => {
    if (!edit) return

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onUpdate(input)
        setEdit(false)
      } else if (e.key === 'Escape') {
        setEdit(false)
        editInput(value)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [edit, input])

  return (
    <S.SmallSectionItem selected={selected} onClick={onClick} onDoubleClick={() => setEdit(true)}>
      {!edit && <>{value}</>}
      {edit && <Input value={input} onChange={(e) => editInput(e.target.value)} ref={inputRef} />}
    </S.SmallSectionItem>
  )
}

export default ListItem
