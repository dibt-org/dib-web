/*
  "data": {
    "id": 0,
    "title": "string",
    "content": "string",
    "mediaUrls": [
      "string"
    ],
    "mentions": [
      "string"
    ]
  }
 */

export interface AddedPostDto {
  id: number;
  title: string;
  content: string;
  mediaUrls: string[];
  mentions: string[];
}
