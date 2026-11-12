export default function Skeleton() {
  return (
    <li className="card skeleton" aria-hidden="true">
      <article>
        <div className="media sk"></div>
        <div className="sk sk-line w-80"></div>
        <div className="sk sk-line w-50"></div>
        <div className="buy">
          <div className="sk sk-line w-50"></div>
          <div className="sk sk-btn"></div>
        </div>
      </article>
    </li>
  )
}
