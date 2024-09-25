
export interface Customer{
    title: string,
    email: string,
    region: string,
    country: string
}

export interface Pin{
    title: string,
    image: string
    collaboratory: Customer[],
    privacy: 'Private'|'Public'
}

