import { PhotoDto } from "./PhotoDto.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdatePhotoDto extends PartialType(PhotoDto) {}

