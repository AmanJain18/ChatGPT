interface Message {
    text: string;
    createdAt: admin.firestore.Timestamp;
    user: {
        _id: string; // user id
        name: string; // user name
        avatar: string; // user name
    };
    }