interface FooterBottomProps { copyright: string }

export default function FooterBottom({ copyright }: FooterBottomProps) {
  return (
    <div className="footer-bottom">
      <p className="copyright">{copyright}</p>
      <a href="#top" className="back-to-top">
        <span>بازگشت به بالا</span>
        <svg aria-hidden="true"><use href="/sprite.svg#up" /></svg>
      </a>
    </div>
  );
}
