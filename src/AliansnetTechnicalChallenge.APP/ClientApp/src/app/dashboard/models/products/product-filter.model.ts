export class ProductFilterModel {
  name: string;
  page: number;
  pageSize: number;

  /**
   *
   */
  constructor() {
    this.name = "";
    this.page = 1;
    this.pageSize = 10
  }
}
