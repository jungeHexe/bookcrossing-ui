import {BaseListRepository} from "../../core/repositories/base-list-repository";
import {map, Observable} from "rxjs";
import {Book} from "../../books/domain/book.model";
import {RequestsService} from "../services/requests.service";
import {Request} from "./request.model";

export class RequestsListRepository extends BaseListRepository {

  constructor(
    private readonly requestsService: RequestsService,
    private readonly listFilterStoreService: any,
  ) {
    super();
  }

  getData(): Observable<Book[]> {
    const params = this.generateHttpParams({status: 'active'});

    return this.requestsService.search(params)
      .pipe(map(response => this.mapContent<Request>(response.data, response.mapper)));
  }
}
