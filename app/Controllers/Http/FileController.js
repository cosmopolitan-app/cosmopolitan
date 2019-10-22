'use strict'

const File = use('App/Models/File')
const Drive = use('Drive')

class FileController {
  index({ request }) {
    const { page = 1, query = '' } = request.get()
    return File.query()
      .where('name', 'ilike', `%${query}%`)
      .orderBy('id', 'desc')
      .paginate(+page)
  }

  show({ request }) {
    const { id } = request.params
    return File.query()
      .where('id', id)
      .firstOrFail(id)
  }

  async render({ request, response }) {
    const { id } = request.params
    const file = await File.findOrFail(id)
    const stream = Drive.getStream(file.path)

    response.header('Content-type', file.mime)
    response.implicitEnd = false
    stream.pipe(response.response)
  }

  async store({ request, response }) {
    // TODO: verify all
    const data = request.only(['name'])

    let file

    const config = {
      types: ['image'],
      size: '2mb'
    }
    request.multipart.file('file', config, async (rawFile) => {
      const uniqueishNumber = new Date().valueOf()
      const path = `${uniqueishNumber}_${rawFile._clientName}`

      const name = data.name || path

      await Drive.put(path, rawFile.stream)
      file = await File.create({
        name,
        path,
        mime: `${rawFile._type}/${rawFile._subtype}`
      })
    })

    await request.multipart.process()

    if (!file) {
      return response.status(422).send({
        message: 'Unprocessable Entity'
      })
    }

    return File.query()
      .where('id', file.id)
      .firstOrFail(file.id)
  }

  async update({ request }) {
    // TODO: verify all
    const data = request.only(['name'])

    const { id } = request.params
    const file = await File.findOrFail(id)

    file.merge(data)
    await file.save()

    return File.query()
      .where('id', file.id)
      .firstOrFail(file.id)
  }

  async destroy({ request }) {
    const { id } = request.params
    const file = await File.findOrFail(id)

    await Drive.delete(file.path)
    await file.delete()
  }
}

module.exports = FileController
