import type { Shop } from "../types"

type FooterHoursProps = {
    schedule: Shop["schedule"]
}

export default function FooterHours({ schedule }: FooterHoursProps) {
    return (
        <section
            className="footer-column"
            aria-labelledby="footer-hours-title"
        >
            <h2 className="footer-column__title" id="footer-hours-title">
                ساعت کاری
            </h2>
            <ul className="footer-hours">
                {schedule.map(function (entry) {
                    return (
                        <li className="footer-hours__item" key={entry.days}>
                            <img
                                className="footer-icon"
                                src="svg/calendar-dots.svg"
                                alt=""
                                width={18}
                                height={18}
                                aria-hidden="true"
                            />
                            <span>
                                {entry.days + ":" + " " + entry.time}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}