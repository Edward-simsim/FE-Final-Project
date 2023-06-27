export class Comment {
  static id(id: any) {
    throw new Error("Method not implemented.");
  }
  commentId?: number;
  questionId: number=0;
  userEmail:string='';
  text: string = "";
  isCorrect:boolean=false;
  // nrLikes: number = 0;
  creationDate:String = "";
}
