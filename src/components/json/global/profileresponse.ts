export interface profileresponse {
    user: User;
}

export interface User {
    id:     number;
    name:   string;
    nim:    null;
    major:  null;
    email:  string;
    status: string;
    photo:  null;
}
