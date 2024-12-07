export interface MovieCardType {
    title: string;
    description: string;
    portraitImgUrl: string;
    landscapeImgUrl: string;
    _id: string;
    rating: number;
    language: string[];
    genre: string[];
    duration: number;
    releaseDate: string;
    cast: CelebrityCardType[];
    crew: CelebrityCardType[];
}

export interface CelebrityCardType {
    celebType: string;
    celebName: string;
    celebImage: string;
}

export interface UserType {
    email: string;
    name: string;
    password: string;
    bookings: string[];
    city: string;
}