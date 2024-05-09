import config from '../config/config'
import { Databases, Storage, Client, Query, ID} from 'appwrite'

export class Conf{
    client = new Client();
    database;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.appwrite_url)
            .setProject(config.appwrite_ProjectId)
        this.database = new Databases();
        this.bucket = new Storage();
    }

    async createPost({title,content,slug,userId, featuredImage, status}){
        try {
            return await this.database.createDocument(config.appwrite_DatabaseId, config.appwrite_CollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userId
            })
        } catch (error) {
            console.log("Appwrite :: createDocument :: error ",error);
        }
    }

    async updatePost(slug, {title,content, featuredImage, status}){
        try {
            return await this.database.createDocument(config.appwrite_DatabaseId, config.appwrite_CollectionId, slug, {
                title,
                content,
                featuredImage,
                status
            })
        } catch (error) {
            console.log("Appwrite :: updateDocument :: error ",error);
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(config.appwrite_DatabaseId, config.appwrite_CollectionId ,slug);
            return true;
        } catch (error) {
            console.log("Appwrite :: deleteDocument :: error ",error);
            return false;
        }
    }
    
    async getPost(slug){
        try {
            return await this.database.getDocument(config.appwrite_DatabaseId, config.appwrite_CollectionId, slug);
        } catch (error) {
            console.log("Appwrite :: getPost :: error ",error);
            return false;
        }
    }

    async getPosts(query = [Query.equal("status","active")]){
        try {
            return await this.database.listDocuments(
                config.appwrite_DatabaseId,
                config.appwrite_CollectionId,
                query
            )
        } catch (error) {
            console.log("Appwrite :: getPosts :: error ",error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwrite_BucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite :: uploadFile :: error ",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(config.appwrite_BucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite :: updateDocument :: error ",error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(config.appwrite_BucketId,fileId);
    }
};

const conf = new Conf();
export default conf;