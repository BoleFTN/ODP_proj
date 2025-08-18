export class UserAccountDTO{
    public constructor(
        public id : number = 0,
        public username : string = "",
        public userType : string = ""
    ){
    }
}