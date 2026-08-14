import { STATUS_OPTIONS, TYPE_OPTIONS } from '../utils/constants.js'

export default function Toolbar({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  onAddClick,
}) {
  return (
    <div className="toolbar">
      <button className="btn-primary" onClick={onAddClick}>
        + Adicionar obra
      </button>

      <div className="search-box">
        <span aria-hidden="true">🔎</span>
        <input
          type="text"
          placeholder="Pesquisar pelo nome..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        className="filter-select"
        value={typeFilter}
        onChange={(e) => onTypeFilterChange(e.target.value)}
        aria-label="Filtrar por tipo"
      >
        <option value="todos">Todos os tipos</option>
        {TYPE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        aria-label="Filtrar por status"
      >
        <option value="todos">Todos os status</option>
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
