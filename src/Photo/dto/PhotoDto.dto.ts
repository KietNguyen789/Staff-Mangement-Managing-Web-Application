import { Param } from "@nestjs/common"
import { IsNumber, IsString, IsInt , Length, IsPositive, IsBoolean} from "class-validator";
export class PhotoDto{
    
    @IsInt()
    @IsPositive()
  photo_id: number;

  @IsString()
  file_name: string;

  @IsString()
  file_content: string;

  @IsBoolean()
  isActive: boolean;


}