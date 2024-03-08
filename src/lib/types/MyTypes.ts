export interface Ids {
    user: string, ticket: Object
  }

  export interface ResponseI {
    response:{
      status: number;
      data: object
    }
  }

export interface FlightsInitials {
    airline:string;
    departure_at:Date;
    destination: string;
    expires_at:Date;
    flight_number:number;
    origin:string;
    price:number;
    return_at:Date;
    transfers:number;
    }

export interface TicketInitials {
    _id: string
    airlineName: string,  
    departure: string,
    destination: String,
    arrivalTime: Date,
    departureTime: Date
    numberOfTransfers:number, 
    flightNumber:number, 
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

    user?: [],    // remove optional
    expiresAt:Date
    createdAt:Date 
}

export interface CancelTicket {
    cancel:boolean;
    user:string;
    ticketsDetails:TicketInitials;
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















