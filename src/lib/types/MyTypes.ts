export interface Ids {
    user: string, ticket: Object
}

export interface CreateOrderInitials{ 
    ticketId:string;
    userId:string[]
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
    airlineName: string;  
    departure: string;
    destination: String;
    arrivalTime: Date;
    departureTime: Date
    numberOfTransfers:number; 
    flightNumber:number; 
    costPrice: {
        price: number;
        currency:string
    };
    ticketStatus: {
        canclellation:  {
            canclellationDate: Date;
            cancellationState: boolean;
            reasons: string
        };
        isTicketBooked:false  
    },
    user: string[];   
    expiresAt:Date
    createdAt:Date 
}

export interface CancelTicket {
    cancel:boolean;
    user:string;
    ticketsDetails:TicketInitials;
 }

export interface BookingOrderInitials{
    _id: string;
    transactions: {
        paymentConfirmation: boolean;
        paymentMethods: {
            methodType:string;
            electronicCard: boolean;
            paypal: boolean;
            otherMethods: boolean;
       },
       transactionMessage: string;
       transactionConfirmationDate: Date;
       currency: string;
     },
     ticket: string[];
     user: string[]; 
     createdAt: Date;
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















