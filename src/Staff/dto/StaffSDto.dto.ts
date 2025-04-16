import { Param } from "@nestjs/common"
import { IsNumber, IsString, IsInt , Length, IsPositive, IsBoolean} from "class-validator";
export class StaffDto{
    
    @IsInt()
 //   @IsPositive()
    id:number;

    @IsString()
    //@Length(1,10,{message:"Length must between 1 to 10 characters"})
    name:string;
    
    @IsString()
    role:string;
    
   // @IsString()
   // @Length(1,2,{groups:["create"]})
    //@Length(1,3,{groups:["update"]})
   // method:string
    
    @IsBoolean()
    isActive:boolean

    constructor(In_id:number, In_name:string, In_role:string){
        this.id = In_id
        this.name = In_name
        this.role = In_role
        
    }

}