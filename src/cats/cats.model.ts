export type CatType = {
    id: string;
    name: string;
    age: number;
    species: string;
    isCute: boolean;
    friends: string[];
}

// 테스트 용도로 data 를 미리 만들어준다.
export const Cat: CatType[] = [
    {
        id: '1',
        name: 'blue',
        age: 8,
        species: 'Russian Blue',
        isCute: true,
        friends: ['2,3']
    },{
        id: '2',
        name: 'some',
        age: 4,
        species: 'Sphynx cat',
        isCute: true,
        friends: ['1']
    },{
        id: '3',
        name: 'munch',
        age: 3,
        species: 'Munchkin',
        isCute: true,
        friends: []
    },{
        id: '4',
        name: '옆집고양이',
        age: 3,
        species: '옆집',
        isCute: false,
        friends: []
    }
]