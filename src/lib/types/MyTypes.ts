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

export interface BookingInitials{
    bookingName: string;
    flightNumbers:string[];
    numberOfTravelers: number;
    seatNumber:string[];
    totalPerson: {
        price: number;
        currency: string;
    };
    Ticket: string[];
    user:string[]; 
    createdAt:Date
}

export interface Credentials{
    email:string,
    password: string
}

export interface NewUser{
    name:string;
    email: string;
    password: string;  
    role:string;
    registerStatus:number;
    createdAt: Date;
    // resetPasswordToken: String;
    // resetPasswordExpire: Date;
}
export interface UserTokenObj{
    token : string;
    tokenStatus: number;
}

export interface UserSession{  
    userId: string;
    userName: string;
    userEmail: string;
    userRole: string;   
}

export interface LoginStatusMsg {         
    loginError: null;
    loginOk:boolean;
    loginStatus:number;
}

export interface UserAuthInitials{
    loading: boolean;
    loginStatusMsg :LoginStatusMsg;
    tokenObj:UserTokenObj;
    userSession:UserSession;
    addNewUser:NewUser;
}















