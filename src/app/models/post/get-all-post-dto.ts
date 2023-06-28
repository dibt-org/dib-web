// {
//       "id": 1,
//       "title": "TEST",
//       "content": "Spring Boot ile bir istekten gelen cevabı tarayıcının çerezine kaydetmek için şu adımları izleyebilirsiniz:  İstek işlemi sırasında gelen cevabı kontrol eden bir HTTP filtresi veya interceptor oluşturun. Bunun için genellikle HandlerInterceptor arabirimini uygulayan bir sınıf kullanılır.",
//       "username": "<string>",
//       "mediaUrls": null,
//       "mentions": [],
//       "createdAtMessage": "7 gün önce"
//     }
export interface GetAllPostDto {
  id: number;
  title: string;
  content: string;
  username: string;
  mediaUrls: string[] | null;
  mentions: string[];
  createdAtMessage: string;
}

