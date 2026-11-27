type HeaderProps = {
  readonly totalCount: number
}

export default function Header({ totalCount }: HeaderProps) {
  return (
    <header 
      className="shop-header" 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem 0', 
        borderBottom: '2px solid #eee' 
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>سوپرمارکت Least Surprise</h1>
      <div 
        className="cart-badge" 
        style={{ 
          background: '#0070f3', 
          color: '#fff', 
          padding: '0.4rem 0.8rem', 
          borderRadius: '20px', 
          fontSize: '0.9rem' 
        }}
      >
        سبد خرید: {totalCount} کالا
      </div>
    </header>
  )
}
