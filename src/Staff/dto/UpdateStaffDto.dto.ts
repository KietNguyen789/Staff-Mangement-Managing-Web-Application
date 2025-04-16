import { PartialType } from "@nestjs/mapped-types";
import { StaffDto } from "./StaffSDto.dto";
import { Staff } from "src/Entities/Staff.entity";

export class UpdateStaffDto extends PartialType(StaffDto){}