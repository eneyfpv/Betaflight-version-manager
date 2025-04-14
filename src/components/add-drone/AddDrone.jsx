import { useState } from 'react'
import { Button, Input } from 'antd'

import * as S from './AddDrone.styles'

const AddDrone = ({ onAdd }) => {
  const [showForm, setShowForm] = useState(false)
  const [droneName, setDroneName] = useState('')

  if (showForm) {
    return (
      <form onSubmit={() => onAdd(droneName)}>
        <Input placeholder="Drone name" value={droneName} onChange={(e) => setDroneName(e.target.value)} />
        <S.ButtonsWrapper>
          <Button onClick={() => setShowForm(false)}>Cancel</Button>
          <Button htmlType='submit' type='primary'>
            Create
          </Button>
        </S.ButtonsWrapper>
      </form>
    )
  }

  return <S.AddButton onClick={() => setShowForm(true)}>+ add drone</S.AddButton>
}

export default AddDrone
