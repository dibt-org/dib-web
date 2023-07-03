/*
 "data": [
    {
      "id": 0,
      "content": "string",
      "createdDate": "string",
      "username": "string",
      "userImage": "string",
      "userId": 0,
      "likes": 0
    }
 */
export interface GetCommentsDto {
  id: number;
  content: string;
  createdDate: string;
  username: string;
  userImage: string;
  userId: number;
  likes: number;
}
