export interface Filters {
    lable: string;
    lableId: string;
    options: Array<{lable: string, id: string}>;
    selected: boolean;
}

export const defaultFilters : Array<Filters> = [
    {
        lable: 'Genre',
        lableId: 'genres',
        options: [
                {id:"Abenteu",lable: "Abenteuer"},
                {id:"Action",lable:"Action"},
                {id:"Animation",lable: "Animation"},
                {id:"Dokumentation",lable:"Dokumentation"},
                {id:"Drama",lable:"Drama"},
                {id:"Erotik",lable:"Erotik"},
                {id:"Familie",lable:"Familie"},
                {id:"Fantasy",lable:"Fantasy"},
                {id:"Filmkunst",lable:"Filmkunst"},
                {id:"Horror",lable:"Horror"},
                {id:"Kinder",lable:"Kinder & Jugend"},
                {id:"Komödie",lable:"Komödie"},
                {id:"Krimi",lable:"Krimi"},
                {id:"Musik",lable:"Musik"},
                {id:"Mystery",lable:"Mystery"},
                {id:"Reality & TV",lable:"Reality & TV"},
                {id:"Romantik",lable:"Romantik"},
                {id:"Science-Fiction",lable:"Science-Fiction"},
                {id:"Sonstige",lable:"Sonstige"},
                {id:"Thriller",lable:"Thriller"},
                {id:"Western",lable:"Western"}],
        selected: false
    },
    {
        lable: 'Anbieter',
        lableId: 'providers',
        options: [
            {id:"Netflix", lable:"Netflix"}, 
            {id:"Apple", lable:"Apple"},
            {id:"Disney", lable:"Disney"},
            {id:"RTL+", lable:"RTL+"},
        ],
        selected: false
    },
]