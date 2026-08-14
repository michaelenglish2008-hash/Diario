import { useMemo, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import StatsCards from './components/StatsCards.jsx'
import Toolbar from './components/Toolbar.jsx'
import ObraList from './components/ObraList.jsx'
import ObraFormModal from './components/ObraFormModal.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import { useObras } from './hooks/useObras.js'
import { calculateStats } from './utils/stats.js'
import { exportObrasToFile, importObrasFromFile } from './utils/backup.js'
import { emptyObraForm } from './utils/constants.js'
import './App.css'

export default function App() {
  const { obras, addObra, updateObra, deleteObra, importObras } = useObras()

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('todos')
  const [statusFilter, setStatusFilter] = useState('todos')

  const [modalState, setModalState] = useState(null) // null | { editingId: string|null, data: {...} }
  const [deletingId, setDeletingId] = useState(null)
  const [importError, setImportError] = useState('')

  const fileInputRef = useRef(null)

  const stats = useMemo(() => calculateStats(obras), [obras])

  const obrasFiltradas = useMemo(() => {
    const termo = search.trim().toLowerCase()
    return obras.filter((obra) => {
      if (typeFilter !== 'todos' && obra.type !== typeFilter) return false
      if (statusFilter !== 'todos' && obra.status !== statusFilter) return false
      if (termo && !obra.title.toLowerCase().includes(termo)) return false
      return true
    })
  }, [obras, search, typeFilter, statusFilter])

  function openAddModal() {
    setModalState({ editingId: null, data: emptyObraForm })
  }

  function openEditModal(obra) {
    setModalState({
      editingId: obra.id,
      data: { ...obra, rating: obra.rating ?? '' },
    })
  }

  function closeModal() {
    setModalState(null)
  }

  function handleSaveObra(dados) {
    if (modalState?.editingId) {
      updateObra(modalState.editingId, dados)
    } else {
      addObra(dados)
    }
    closeModal()
  }

  function handleExport() {
    exportObrasToFile(obras)
  }

  function handleImportClick() {
    setImportError('')
    fileInputRef.current?.click()
  }

  async function handleFileSelected(e) {
    const file = e.target.files?.[0]
    e.target.value = '' // permite selecionar o mesmo arquivo de novo depois
    if (!file) return

    try {
      const dados = await importObrasFromFile(file)
      importObras(dados)
      setImportError('')
    } catch (error) {
      setImportError(error.message)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <Header onExport={handleExport} onImportClick={handleImportClick} />

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleFileSelected}
          style={{ display: 'none' }}
        />

        {importError && <div className="import-error">⚠️ {importError}</div>}

        <StatsCards stats={stats} />

        <Toolbar
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onAddClick={openAddModal}
        />

        <ObraList
          obras={obrasFiltradas}
          onStatusChange={(id, status) => updateObra(id, { status })}
          onRatingChange={(id, rating) => updateObra(id, { rating })}
          onEdit={openEditModal}
          onDelete={(id) => setDeletingId(id)}
        />
      </div>

      {modalState && (
        <ObraFormModal
          initialData={modalState.data}
          isEditing={Boolean(modalState.editingId)}
          onSave={handleSaveObra}
          onClose={closeModal}
        />
      )}

      {deletingId && (
        <ConfirmDialog
          message="Excluir esta obra do seu diário? Essa ação não pode ser desfeita."
          onConfirm={() => {
            deleteObra(deletingId)
            setDeletingId(null)
          }}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  )
}
