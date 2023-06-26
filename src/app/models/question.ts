export class Question {
    static id(id: any) {
        throw new Error('Method not implemented.');
      }
      id?:number;
      title:string='';
      description:string='';
      creationDate:string='';
    email:string='';
    categoryIds: number[]=[];
}