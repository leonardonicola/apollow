import { Context } from '../context'

export class BookService {
  constructor(private readonly context: Context) {}

  async findById(id: string) {
    return this.context.prisma.book.findUnique({
      where: { id },
    })
  }
}
