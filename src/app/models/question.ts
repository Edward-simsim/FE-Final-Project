export class Question {
    static id(id: any) {
        throw new Error('Method not implemented.');
      }
      id?:number;
      title:string='';
      description:string='';
    date:string='';
    userEmail:string='';
    category: number=0;
}