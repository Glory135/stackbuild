// models

export interface Post {
    id: string;
    text: string;
    image: string;
    likes: number;
    link: string;
    tags: string[];
    publishDate: string;
    owner: User;
}

export interface User {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
}

export interface Create {
    text: string;
    likes: number;
    owner: string;
    tags: string[];
    // content: string;
}

export interface Update {
    text: string;
    tags: string[];
}

export interface Comment {
    id: string;
    message: string;
    owner: User;
    post: string;
    publishDate: string;
}

export interface CommentCreate {
    message: string;
    owner: string;
    post: string;
}
export interface UserCreate {
    firstName: string;
    lastName: string;
    email: string;
}