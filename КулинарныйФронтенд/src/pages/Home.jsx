// Вместо импорта SearchBar измените:
// <SearchBar />
// На:

<div style={{ 
  position: 'relative',
  maxWidth: '500px',
  margin: '0 auto'
}}>
  <input 
    type="text" 
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="🔍 Поиск рецептов, ингредиентов, категорий..."
    style={{
      padding: '15px 20px 15px 50px',
      width: '100%',
      border: '2px solid var(--border)',
      borderRadius: '50px',
      fontSize: '16px',
      backgroundColor: 'var(--bg-card)',
      transition: 'all 0.3s',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    }}
  />
</div>