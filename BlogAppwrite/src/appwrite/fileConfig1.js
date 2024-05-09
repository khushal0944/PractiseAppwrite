import { Client, Databases, Storage, ID, Query } from "appwrite";
import config from "../config/config";

export class fileSessions{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.appwrite_url)
            .setProject(config.appwrite_ProjectId);
        this.databases = new Databases();
        this.bucket = new Storage();
    }

    async createPost({title,content,slug,featuredImage,userId,status}){
        try {
            return await this.databases.createDocument(config.appwrite_DatabaseId, config.appwrite_CollectionId,slug,{
                title,
                content,
                featuredImage,
                userId,
                status
            })
        } catch (error) {
            console.log("Appwrite :: createPost :: error ",error);
        }
    }
    async updatePost({slug,title,content,featuredImage,userId,status,}){
        return await this.databases.updateDocument(config.appwrite_DatabaseId,config.appwrite_CollectionId,slug,{
            title,
            content,
            featuredImage,
            userId,
            status
        })
    }
    async getPost(){
        try {
            return await this.databases.getDocument(config.appwrite_DatabaseId,config.appwrite_CollectionId,slug);
        } catch (error) {
            console.log("Appwrite :: createPost :: error ",error);
        }
    }
    async getPosts(query = [Query.equal("status","active")]){
        try {
            return await this.databases.getDocument(config.appwrite_DatabaseId,config.appwrite_CollectionId,query);
        } catch (error) {
            console.log("Appwrite :: createPost :: error ",error);
        }
    }
    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(slug);
        } catch (error) {
            console.log("Appwrite :: createPost :: error ",error);
        }
    }
    async uploadFile(file){
        try {
            return await this.bucket.createFile(config.appwrite_BucketId,ID.unique(),file)
        } catch (error) {
            console.log("Appwrite :: createPost :: error ",error);
        }
    }
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(config.appwrite_BucketId,fileId);
        } catch (error) {
            
        }
    }
    async getFilePreview(fileId){
        try {
            return await this.databases.getFilePreview(config.appwrite_BucketId,fileId)
        } catch (error) {
            
        }
    }
};

const filesession = new fileSessions();
export default filesession;