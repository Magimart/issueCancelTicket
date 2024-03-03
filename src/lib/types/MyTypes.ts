export interface TicketInitials {
    _id: string
    airlineName: string,  
    departure: string,
    destination: String,
    arrivalTime: Date,
    departureTime: Date
    numberOfTravelers:number,
    seatNumber:string[],
    costPrice: {
        price: number,
        currency:string
    },
    ticketIssued: boolean,
    ticketStatus: {
        canclellation:  {
            canclellationDate: string,
            cancellationState: boolean,
            reasons: string
        },
        isTicketBooked:false  
    },
    user?: [], 
    createdAt:Date 
}

export interface Credentials{
    email:string,
    password: string
}

export interface AuthLoginInitials{
    loading: boolean,
    loginStatusMsg :{         
        loginError: null;
        loginOk:boolean;
        loginStatus:number;
    },
    tokenObj:{
        token : string;
        tokenStatus: number;
    },
    userSession: {
        userId: string;
        userName: string;
        userEmail: string;
        userRole: string;
     }
}















