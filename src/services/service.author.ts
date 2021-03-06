import { StatusCodes as status } from 'http-status-codes'

import { ModelAuthor } from '@models/model.author'
import { ModelBook } from '@models/model.book'
import { IServiceAuthor, IAuthor } from '@interfaces/interface.author'
import { Request } from '@helpers/helper.generic'
import { Redis } from '@libs/lib.redis'

export class ServiceAuthor extends ModelAuthor implements IServiceAuthor {
  /**
   * @method POST
   * @description function for created new author
   */

  public async createServiceAuthor(req: Request<IAuthor>): Promise<Record<string, any>> {
    try {
      const checkAuthor = await super.model().query().where({ first_name: req.body.first_name }).first()

      if (checkAuthor) {
        throw { code: status.CONFLICT, message: 'Author name already exist' }
      }

      const checkTableColumn = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const addAuthor = await super.model().query().insert(req.body).first()

      if (!addAuthor) {
        throw { code: status.FORBIDDEN, message: 'Created new author failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Created new author success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for get all authors
   */

  public async resultsServiceAuthor(): Promise<Record<string, any>> {
    try {
      const ioredis = new Redis(0)
      const getAuthors = await super.model().query().select('*').orderBy('created_at', 'desc')

      if (!getAuthors.length) {
        throw { code: status.NOT_FOUND, message: 'Authors data not found' }
      }

      const authors = getAuthors.map(async (val: Record<string, any>) => {
        const getBooks = await ModelBook.query().select('*').where('author_id', val.id).orderBy('created_at', 'desc')
        return {
          id: val.id,
          first_name: val.first_name,
          last_name: val.last_name,
          place_of_birth: val.place_of_birth,
          date_of_birth: new Date(val.date_of_birth).toLocaleDateString(),
          books: getBooks
        }
      })

      const newAuthors: Record<string, any>[] = []

      for (const i in authors) {
        const data = await authors[i]
        newAuthors.push(data)
      }

      const cacheDataKeys = await ioredis.keyCacheDataExist('authors')

      if (cacheDataKeys > 0) {
        const countCacheAuthors = await ioredis.countCacheData('authors')
        const countDbAuthors = await super.model().query().select('*')

        if (countCacheAuthors === countDbAuthors.length) {
          const getCacheAuthors = await ioredis.getCacheData('authors')
          return Promise.resolve({
            code: status.OK,
            message: 'Authors data already to use, with caching',
            authors: getCacheAuthors
          })
        } else {
          ioredis.delCacheData('authors')
          await ioredis.setCacheData('authors', newAuthors)
          return Promise.resolve({ code: status.OK, message: 'Authors data already to use, not caching', authors: newAuthors })
        }
      } else {
        await ioredis.setCacheData('authors', newAuthors)
        return Promise.resolve({ code: status.OK, message: 'Authors data already to use, not caching', authors: newAuthors })
      }
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method GET
   * @description function for get author by specific id
   */

  public async resultServiceAuthor(req: Request<IAuthor>): Promise<Record<string, any>> {
    try {
      const getAuthor = await super.model().query().findById(req.params.id)

      if (!getAuthor) {
        throw { code: status.NOT_FOUND, message: `Author data not found, for this id ${req.params.id}` }
      }

      const getBooks = await ModelBook.query().select('*').where('author_id', getAuthor.id).orderBy('created_at', 'desc')

      const newAuthor: Record<string, any> = {
        id: getAuthor.id,
        first_name: getAuthor.first_name,
        last_name: getAuthor.last_name,
        place_of_birth: getAuthor.place_of_birth,
        date_of_birth: getAuthor.date_of_birth,
        books: getBooks
      }

      return Promise.resolve({ code: status.OK, message: 'Author data already to use', author: newAuthor })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method DELETE
   * @description function for deleted author by specific id
   */

  public async deleteServiceAuthor(req: Request<IAuthor>): Promise<Record<string, any>> {
    try {
      const getAuthor = await super.model().query().findById(req.params.id)

      if (!getAuthor) {
        throw { code: status.NOT_FOUND, message: `Author data not found, for this id ${req.params.id}` }
      }

      const deleteAuthor = await super.model().query().deleteById(req.params.id)

      if (!deleteAuthor) {
        throw { code: status.FORBIDDEN, message: 'Deleted author data failed' }
      }

      return Promise.resolve({ code: status.OK, message: 'Deleted author data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method PUT
   * @description function for updated author by specific id
   */

  public async updateServiceAuthor(req: Request<IAuthor>): Promise<Record<string, any>> {
    try {
      const checkAuthor = await super.model().query().findById(req.params.id)

      if (!checkAuthor) {
        throw { code: status.NOT_FOUND, message: `Author data not found, for this id ${req.params.id}` }
      }

      const checkTableColumn = await super.model().query().column(Object.keys(req.body))

      if (checkTableColumn.length) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      const updateAuthor = await super.model().query().updateAndFetchById(req.params.id, req.body)

      if (!updateAuthor) {
        throw { code: status.FORBIDDEN, message: 'Updated author data failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Updated author data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }
}
