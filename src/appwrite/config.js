import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { Permission } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, capturedimg,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    capturedimg,
                    status,
                    userid: userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    
        async uploadFile(file, userId) {
  try {
    return await this.bucket.createFile(
      conf.appwriteBucketId,
      ID.unique(),
      file,
      [
        Permission.read(userId ? `user:${userId}` : 'role:any'),
        ...(userId ? [Permission.write(`user:${userId}`)] : []),
      ]
    );
  } catch (error) {
    console.log("Appwrite service :: uploadFile :: error", error);
    return false;
  }
    }

    async deletePost(slug){
  try {
    await this.databases.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug
    );
    return true;
  } catch (error) {
    console.log("Appwrite serive :: deletePost :: error", error);
    return false;
  }
}

    getFileDownload(fileId) {
  return this.bucket.getFileDownload(conf.appwriteBucketId, fileId);
}
}


const service = new Service()
export default service