// A small badge: visible text + a hidden text for screen readers.
type BadgeProps = {
  text: string,
  readerText: string,
  className: string
}
export default function Badge({ text, readerText, className} : BadgeProps) {
    return (
        <span className= {className}>
            {text}
            <span className="visually-hidden">
                {readerText}
            </span>
        </span>
    )
}