import { useEffect, useState, useRef, useMemo } from 'react'

import firebase from 'firebase/compat/app'
import { UserOutlined, GithubOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import dayjs from 'dayjs'
import { diffLines } from 'diff'
import { Analytics } from '@vercel/analytics/react'

import Auth from './components/auth/Auth'
import firebaseApp from './helpers/firebase'
import ListItem from './components/list-item/ListItem'

import * as S from './App.styles'

const useDb = (path, transform = (val) => val) => {
  const [data, setVal] = useState()
  const userId = firebase.auth().currentUser.uid
  const ref = firebase.database(firebaseApp).ref(`user/${userId}`).child(path)

  useEffect(() => {
    ref.on('value', (snapshot) => {
      setVal(transform(snapshot?.val()))
    })
  }, [path, userId])

  return { ref, data }
}

const usePersitantState = (key) => {
  const [val, _set] = useState(localStorage.getItem(key))

  const set = (_val) => {
    _set(_val)
    if (!_val) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, _val)
    }
  }

  return [val, set]
}

const App = () => {
  const noDataActionsRef = useRef()
  const [showDiff, setShowDiff] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showAuthActions, setShowAuthActions] = useState(false)
  const [selectedDrone, setSelectedDrone] = usePersitantState('selectedDrone')
  const [selectedVersionId, setSelectedVersion] = usePersitantState('selectedVersion')
  const user = firebase.auth().currentUser

  const { data: drones, ref: dronesRef } = useDb('drones', (data) =>
    Object.entries(data || {}).map(([id, val]) => ({ id, ...val })),
  )
  const { data: versions, ref: versionsRef } = useDb(`drones/${selectedDrone}/versions`, (data) =>
    Object.entries(data || {}).map(([id, val]) => ({ id, ...val })),
  )
  const { data: selectedVersion, ref: selectedVersionRef } = useDb(
    `drones/${selectedDrone}/versions/${selectedVersionId}`,
  )

  const diff = useMemo(() => {
    if (!versions || !selectedVersion?.data) return []

    const index = versions.findIndex(({ id }) => id === selectedVersionId)
    const prevVersion = versions[index - 1] || selectedVersion
    return diffLines(prevVersion.data, selectedVersion.data)
  }, [selectedVersion])

  const addDrone = (name) => {
    dronesRef.push().update({
      name,
    })
  }

  const addVersion = () => {
    const id = versionsRef.push().key
    const date = new Date()
    versionsRef.child(id).update({
      data: '',
      name: dayjs(date).format('DD.MM.YYYY HH:mm'),
      createdAt: date,
    })

    setSelectedVersion(id)
  }

  const deleteVersion = () => {
    selectedVersionRef.remove()
    setSelectedVersion(undefined)
  }

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText()
    if (!text) return
    selectedVersionRef.update({
      data: text,
    })
  }

  return (
    <S.App>
      <Analytics />
      <S.Header>
        <div>Betaflight version manager</div>

        <S.RightMenuWrapper>
          <S.GithubLink href='https://github.com/eneyfpv/Betaflight-version-manager' target='_blank'>
            <GithubOutlined /> View on Github
          </S.GithubLink>

          <S.User
            signedIn={!!user.email}
            onClick={() => (!user.email ? setShowAuthModal(true) : setShowAuthActions(!showAuthActions))}
          >
            <UserOutlined />

            {showAuthActions && (
              <S.UserActions>
                <S.UserActionsItem>{user.email}</S.UserActionsItem>
                <S.UserActionsItem onClick={() => firebase.auth().signOut()}>Logout</S.UserActionsItem>
              </S.UserActions>
            )}
          </S.User>
        </S.RightMenuWrapper>

        <Modal open={showAuthModal} onOk={() => setShowAuthModal(false)} onCancel={() => setShowAuthModal(false)}>
          <Auth onSignIn={() => setShowAuthModal(false)} />
        </Modal>
      </S.Header>

      <S.TableWrapper>
        <S.SmallSection>
          {drones?.map((drone) => (
            <ListItem
              value={drone.name}
              selected={drone.id === selectedDrone}
              onClick={() => setSelectedDrone(drone.id)}
              onUpdate={(val) => {
                dronesRef.child(drone.id).update({ name: val })
              }}
            />
          ))}
          <S.AddButton onClick={() => addDrone('New drone')}>+ add drone</S.AddButton>
        </S.SmallSection>
        {selectedDrone && (
          <S.SmallSection>
            {versions?.map((version) => (
              <ListItem
                value={version.name}
                selected={version.id === selectedVersionId}
                onClick={() => setSelectedVersion(version.id)}
                onUpdate={(val) => {
                  versionsRef.child(version.id).update({ name: val })
                }}
              />
            ))}
            <S.AddButton onClick={addVersion}>+ add version</S.AddButton>
          </S.SmallSection>
        )}
        <S.CodeWrapper>
          <S.CodeWrapperScroll>
            {selectedVersion && (
              <>
                {!selectedVersion.data && (
                  <S.NoDataActions
                    ref={noDataActionsRef}
                    onDrop={async (e) => {
                      e.preventDefault()
                      const text = await e.dataTransfer.files[0].text()
                      selectedVersionRef.update({
                        data: text,
                      })
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <Button type='primary' onClick={pasteFromClipboard}>
                      Paste from clipboard
                    </Button>
                    <div>or</div>
                    <div>drag & drop file</div>
                  </S.NoDataActions>
                )}

                <S.CodeActions>
                  <Button ghost danger onClick={deleteVersion}>
                    Delete
                  </Button>
                  {selectedVersion.data && (
                    <>
                      <Button ghost onClick={() => setShowDiff(!showDiff)}>
                        {showDiff ? 'Hide diff' : 'Show diff'}
                      </Button>
                      <Button ghost onClick={() => navigator.clipboard.writeText(selectedVersion.data)}>
                        Copy
                      </Button>
                    </>
                  )}
                </S.CodeActions>

                {!showDiff && (
                  <pre>
                    <code>{selectedVersion.data}</code>
                  </pre>
                )}

                {showDiff && (
                  <pre>
                    <code>
                      {diff.map((line) => {
                        // const edited = line.added || line.removed
                        // if (showDiff && !edited) return null

                        const getDiffColor = (line) => {
                          if (line.added) return '#3e7a3e75'
                          if (line.removed) return '#ff000066'
                        }

                        return (
                          <div>
                            <span style={{ backgroundColor: getDiffColor(line) }}>{line.value}</span>
                          </div>
                        )
                      })}
                    </code>
                  </pre>
                )}
              </>
            )}
          </S.CodeWrapperScroll>
        </S.CodeWrapper>
      </S.TableWrapper>
    </S.App>
    // <Auth />
  )
}

export default App
