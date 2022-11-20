export interface Filters {
    lable: string;
    options: Array<string>;
    selected: boolean;
}

export const defaultFilters : Array<Filters> = [
    {
        lable: 'genre',
        options: ['Abenteuer', 'Action', 'Animation', 'Dokumentation', 'Drama', 'Erotik', 'Familie', 'Fantasy', 'Filmkunst', 'Horror', 'Kinder & Jugend', 'Komödie', 'Krimi', 'Musik', 'Mystery', 'Reality & TV', 'Romantik', 'Science-Fiction', 'Sonstige', 'Thriller', 'Western'],
        selected: false
    },
    {
        lable: 'anbieter',
        options: ['Netflix', 'Amazon Prime Video', 'Disney+', 'Apple TV+', 'WOW', 'RTL+', 'Joyn', 'Joyn Plus', 'Freevee', 'discovery+', 'MagentaTV', 'Amazon Video', 'iTunes Store', 'Google Play', 'Maxdome'],
        selected: false
    },
    {
        lable: 'preis',
        options: ["Im Abo", "Kaufen/Leihen", "Kostenlos"],
        selected: false
    },
    {
        lable: 'type',
        options: ['Film', 'Serie'],
        selected: false
    },
    {
        lable: 'age',
        options: ['Ab 0', 'Ab 6', 'Ab 7', 'Ab 12', 'Ab 13', 'Ab 16', 'Ab 18'],
        selected: false
    }
]