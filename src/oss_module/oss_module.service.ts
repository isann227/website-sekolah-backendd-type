import { Injectable } from '@nestjs/common';
import path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import {v4 as uuid} from "uuid"
@Injectable()
export class OssModuleService {
    client: any;
    private region: string = "oss-ap-southeast-5";
    accessKey: string = ""
    accessSecret: string = ""
    private bucket: string;
    private dbService: PrismaService;
    private folder: string;
    private paramsObj = {
        region: "oss-ap-southeast-5",
        accessKey: "",
        accessSecret: "",
        bucket: "dev-visiku",
        files: "kyc/individu/"
    } 
    private headersObj = {
        'x-oss-storage-class': 'Standard',
        // Specify the ACL of the object. 
        'x-oss-object-acl': 'private',
        // When you access an object by using the URL of the object, specify that the object is downloaded as an attachment. The name of the downloaded object is example.jpg. 
        // 'Content-Disposition': 'attachment; filename="example.jpg"'
        // Specify tags for the object. You can specify multiple tags at a time. 
        // 'x-oss-tagging': 'Tag1=1&Tag2=2',
        
        // Specify whether the PutObject operation overwrites an object that has the same name. In this example, the x-oss-forbid-overwrite parameter is set to true, which specifies that an existing object that has the same name cannot be overwritten by the uploaded object. 
        'x-oss-forbid-overwrite': 'true',
    }
    constructor(){
        this.dbService = new PrismaService();
        
    }
    setOptions = async (obj: object = {}) => {
        this.paramsObj = {...this.paramsObj, ...obj};
    }
    setHeaders = async (obj: object = {}) => {
        this.headersObj = {...this.headersObj, ...obj};
    }
    // async GetOssInstances (): Promise<any> {
        
    //     return await  new Promise<any>(async (resolve, reject) => {
    //         const OSS = require("ali-oss");
    //         const apiKey = await this.dbService.api_keys.findFirstOrThrow({where: {provider: "OSS-ALIYUN"}})
    //         .then(res => {
                
    //             this.setOptions({accessKey: res.key, accessSecret: res.secret});
                

    //             this.client = new OSS({
    //                 region: this.paramsObj?.region,
    //                 accessKeyId: this.paramsObj?.accessKey,
    //                 accessKeySecret: this.paramsObj?.accessSecret,
    //                 bucket: this.paramsObj.bucket
    //             })
                
    //             resolve(this.client);
    //             return this;
    //         }).catch(err => {
    //             console.error(err);
    //         })
           
    //         return this;
    //     });
        
    // }
    async uploadFile(client: any,fileName: string, filePath: string): Promise<any> {
        return await new Promise(async (resolve, reject) => {
            const Path = require("path");
            console.warn(fileName);
            let res = await client.put(this.paramsObj.files + fileName, Path.normalize(filePath), this.headersObj).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err);
            })
           
        });
    }
    async streamFile(client: any, filePath: string){
        return await new Promise(async (resolve, reject) => {
            console.warn(this.paramsObj.files+filePath);
            
            let res = await client.get(this.paramsObj.files+filePath)
            resolve(res)
        }).catch(err => {
            console.error(err);
        })
    }
    async DecodeBase64File(base64File: string, prefix: string = "K"){
        return new Promise(async (resolve, reject) => {
            const fs = require("fs");
            const jimp = require("jimp");
            let id = uuid();
            let buffer = Buffer.from(base64File, "base64");
            let futu: any;
            let jimpFile = await jimp.read(buffer, (err,res) => {
                if(err) throw new Error(err);
                let path = "uploadedFiles/img_user/"+ prefix+"-"+id+".png";
                futu = res.write(path);
                
                resolve({name: prefix+"-"+id+".png", path: path,file: futu});
            })
            return futu
        })
    }
}
