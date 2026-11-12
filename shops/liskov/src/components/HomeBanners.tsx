import type {Home} from '../types';

type HomeBannersProps = {
    home: Home;
};

export default function HomeBanners({home}: HomeBannersProps) {
    return (
        <>
            <section className='banners-container'>
                <article className='banner' id='banner-1'>
                    <span className='banner-emoji' aria-hidden='true'>
                        {home.hero.emoji}
                    </span>
                    <h1>{home.hero.title}</h1>
                    <p>{home.hero.text}</p>
                    <a
                        className='banner-button banner-button-right'
                        href={home.hero.cta.href}
                    >
                        {home.hero.cta.label}
                    </a>
                </article>

                <article className='banner' id='banner-2'>
                    <span className='banner-emoji' aria-hidden='true'>
                        {home.side.emoji}
                    </span>
                    <h2>{home.side.title}</h2>
                    <p>{home.side.text}</p>
                    <a
                        className='banner-button banner-button-left'
                        href={home.side.cta.href}
                    >
                        {home.side.cta.label}
                    </a>
                </article>
            </section>

            <section className='s-banners-container'>
                {home.promos.map((promo, index) => (
                    <a
                        key={promo.href}
                        className='s-banners'
                        id={index === 0 ? 's-banner-1' : 'fresh-bread'}
                        href={promo.href}
                        style={{backgroundColor: promo.color}}
                    >
                        <span className='promo-emoji' aria-hidden='true'>
                            {promo.emoji}
                        </span>
                        {promo.text}
                    </a>
                ))}
            </section>
        </>
    );
}
