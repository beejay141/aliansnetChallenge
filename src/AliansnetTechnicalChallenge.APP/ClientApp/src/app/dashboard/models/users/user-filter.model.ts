export class UserFilterModel {
  username: string;
  page: number;
  pageSize: number;

  /**
   *
   */
  constructor() {
    this.username = "";
    this.page = 1;
    this.pageSize = 10
  }
}
