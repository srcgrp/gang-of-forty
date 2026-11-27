type SearchBoxProps = {
    query: string;
    onQuery: (value: string) => void;
};

export default function SearchBox({query, onQuery}: SearchBoxProps) {
    return (
        <div className='product-search'>
            <input
                type='search'
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder='جستجوی نام محصول...'
                aria-label='جستجوی محصولات'
            />
        </div>
    );
}
