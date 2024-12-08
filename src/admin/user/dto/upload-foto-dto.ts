import { IsEmail } from "class-validator";

export class UploadFotoDto {
    fileKtp: string = null;
    fileSelfie: string = null;
}