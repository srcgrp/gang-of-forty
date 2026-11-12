export default function LogoFrame() {
  return (
    <>
        <path d="
                    M 48 108
                    H 116
                    Q 130 108 135 122
                    L 176 260
                    Q 181 277 199 277
                    H 395
                    Q 407 277 412 265
                    L 445 181
                " fill="none" stroke="url(#white-gradient)" strokeWidth="27" strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow)" />
        <path d="
                    M 49 103
                    H 115
                    Q 131 103 137 120
                    L 177 258
                " fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.4" />
        <path d="
                    M 188 336
                    H 397
                " fill="none" stroke="url(#white-gradient)" strokeWidth="27" strokeLinecap="round" filter="url(#shadow)" />
        <path d="
                    M 190 331
                    H 397
                " fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
        <rect x="70" y="187" width="66" height="21" rx="10.5" fill="url(#green-gradient)" filter="url(#soft-shadow)" />
        <rect x="41" y="225" width="112" height="21" rx="10.5" fill="url(#green-gradient)" filter="url(#soft-shadow)" />
        <rect x="76" y="263" width="91" height="21" rx="10.5" fill="url(#green-gradient)" filter="url(#soft-shadow)" />
        <circle cx="225" cy="390" r="29" fill="url(#gold-gradient)" filter="url(#shadow)" />
        <circle cx="377" cy="390" r="29" fill="url(#gold-gradient)" filter="url(#shadow)" />
        <circle cx="217" cy="382" r="8" fill="#FFF0A7" opacity="0.55" />
        <circle cx="369" cy="382" r="8" fill="#FFF0A7" opacity="0.55" />
    </>
  );
}