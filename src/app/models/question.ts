export class Question {
  static id(id: any) {
    throw new Error("Method not implemented.");
  }
  id?: number;
  title: string = "";
  description: string = "";
  localDateTime: string = "";
  email: string = "";
  solved: boolean = false;
  categoryIds: number[] = [];
  categoryNames?: string[];
  noOfComments?: number;
}
