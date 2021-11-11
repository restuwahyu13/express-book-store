import { StatusCodes as status } from 'http-status-codes'
import { ModelBook } from '@models/model.book'
import { IServiceBook, IBook } from '@interfaces/interface.book'
import { Request } from '@helpers/helper.generic'
import { Redis } from '@libs/lib.redis'

export class ServiceBook extends ModelBook implements IServiceBook {
  /**
   * @method POST
   * @description function for add new book data
   */

  public async createServiceBook(req: Request<IBook>): Promise<Record<string, any>> {
    try {
      const checkBook: ModelBook = await super.model().query().where({ isbn: req.body.isbn }).first()

      if (checkBook) {
        throw { code: status.CONFLICT, message: 'Book isbn already exist' }
      }

      const checkTableColumn: ModelBook[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn.length) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const addBook: ModelBook = await super.model().query().insert(req.body).first()

      if (!addBook) {
        throw { code: status.FORBIDDEN, message: 'Created new book failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Created new book success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for get all book data
   */

  public async resultsServiceBook(): Promise<Record<string, any>> {
    try {
      const ioredis: InstanceType<typeof Redis> = new Redis(1)
      const getBooks: ModelBook[] = await super
        .model()
        .query()
        .select(
          'book.*',
          'book.id as bookId',
          'author.*',
          'author.id as authorId',
          'book_image.*',
          'book_image.id as bookImageId'
        )
        .leftJoin('author', 'author.id', 'book.author_id')
        .leftJoin('book_image', 'book_image.book_id', 'book.id')
        .orderBy('book.created_at', 'desc')

      if (!getBooks.length) {
        throw { code: status.NOT_FOUND, message: 'Books data not found' }
      }

      const newBooks: Record<string, any>[] = getBooks.map((val: Record<string, any>): Record<string, any> => {
        return {
          id: val.bookId,
          name: val.name,
          isbn: val.isbn,
          release: val.release,
          publisher: val.publisher,
          price: val.price,
          page: val.page,
          description: val.description,
          author: {
            first_name: val.first_name,
            last_name: val.last_name,
            place_of_birth: val.place_of_birth,
            date_of_birth: val.date_of_birth
          },
          book_image: {
            first_image: val.first_image,
            second_image: val.second_image,
            third_image: val.third_image,
            fourth_image: val.fourth_image,
            fifth_image: val.fifth_image
          },
          created_at: val.created_at,
          updated_at: val.updated_at
        }
      })

      const cacheDataKeys: number = await ioredis.keyCacheDataExist('books')

      if (cacheDataKeys > 0) {
        const countCacheBooks: number = await ioredis.countCacheData('books')
        const countDbBooks: ModelBook[] = await super.model().query().select('*')

        if (countCacheBooks === countDbBooks.length) {
          const getCacheBooks: Record<string, any>[] = await ioredis.getCacheData('books')
          return Promise.resolve({
            code: status.OK,
            message: 'Books data already to use, with caching',
            books: getCacheBooks
          })
        } else {
          ioredis.delCacheData('books')
          await ioredis.setCacheData('books', newBooks)
          return Promise.resolve({ code: status.OK, message: 'Books data already to use, not caching', books: newBooks })
        }
      } else {
        await ioredis.setCacheData('books', newBooks)
        return Promise.resolve({ code: status.OK, message: 'Books data already to use, not caching', books: newBooks })
      }
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for get book data by specific id
   */

  public async resultServiceBook(req: Request<IBook>): Promise<Record<string, any>> {
    try {
      const getBook: ModelBook = await super
        .model()
        .query()
        .select('book.*', 'book.id as bookId', 'author.*', 'book_image.*')
        .leftJoin('author', 'author.id', 'book.author_id')
        .leftJoin('book_image', 'book_image.book_id', 'book.id')
        .where('book.id', req.params.id)
        .first()

      if (!getBook) {
        throw { code: status.NOT_FOUND, message: `Book data not found, for this id ${req.params.id}` }
      }

      const newBook: Record<string, any> = {
        id: getBook['bookId'],
        name: getBook.name,
        isbn: getBook.isbn,
        release: getBook.release_date,
        publisher: getBook.publisher,
        author: {
          first_name: getBook['first_name'],
          last_name: getBook['last_name'],
          place_of_birth: getBook['place_of_birth'],
          date_of_birth: getBook['date_of_birth']
        },
        book_image: {
          first_image: getBook['first_image'],
          second_image: getBook['second_image'],
          third_image: getBook['third_image'],
          fourth_image: getBook['fourth_image'],
          fifth_image: getBook['fifth_image']
        },
        created_at: getBook.created_at,
        updated_at: getBook.updated_at
      }

      return Promise.resolve({ code: status.OK, message: 'Book data already to use', book: newBook })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method DELETE
   * @description function for delete book data by sepecific id
   */

  public async deleteServiceBook(req: Request<IBook>): Promise<Record<string, any>> {
    try {
      const getBook: ModelBook = await this.model().query().findById(req.params.id)

      if (!getBook) {
        throw { code: status.NOT_FOUND, message: `Book data not found, for this id ${req.params.id}` }
      }

      const deleteBook: number = await this.model().query().deleteById(req.params.id)

      if (!deleteBook) {
        throw { code: status.FORBIDDEN, message: 'Deleted book data failed' }
      }

      return Promise.resolve({ code: status.OK, message: 'Deleted book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method PUT
   * @description function for update book data by specific book id
   */

  public async updateServiceBook(req: Request<IBook>): Promise<Record<string, any>> {
    try {
      const checkBook: ModelBook = await this.model().query().findById(req.params.id)

      if (!checkBook) {
        throw { code: status.NOT_FOUND, message: `Book data not found, for this id ${req.params.id}` }
      }

      const checkTableColumn: ModelBook[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn.length) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const updateBook: ModelBook = await this.model().query().updateAndFetchById(req.params.id, req.body)

      if (!updateBook) {
        throw { code: status.FORBIDDEN, message: 'Updated book data failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }
}
