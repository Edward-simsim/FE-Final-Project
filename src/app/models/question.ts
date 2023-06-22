export class Question {
    static id(id: any) {
        throw new Error('Method not implemented.');
      }
      questionId?:number;
      title:string='';
      description:string='';
      creationDate:string='';
    email:string='';
    category: number[]=[];
}